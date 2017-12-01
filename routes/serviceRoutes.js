const axios = require('axios');
const User = require('mongoose').model('user');
const Race = require('mongoose').model('race');
const Driver = require('mongoose').model('driver');
const Pick = require('mongoose').model('pick');
const { BASETRIP_SECRET } = require('../config/keys');
const isAdmin = require('../middlewares/isAdmin');

const scoreReglament = {
  0: 25,
  1: 18,
  2: 15,
  3: 12,
  4: 10,
  5: 8,
  6: 6,
  7: 4,
  8: 2,
  9: 1
};

const castCountry = country => {
  switch (country) {
    case 'UK':
      return 'united-kingdom';
    case 'USA':
      return 'united-states';
    case 'UAE':
      return 'united-arab-emirates';
    default:
      return country;
  }
};

const getCountryFlag = async country => {
  try {
    const res = await axios({
      url: `https://api.thebasetrip.com/v2/countries/${country}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'x-api-key': BASETRIP_SECRET
      }
    });
    return {
      flagUrl: res.data.basic.flag.svg,
      alpha3code: res.data.basic.code.alpha3
    };
  } catch (err) {
    console.log('no such country: ' + country);
    return {
      flagUrl: '-',
      alpha3code: '---'
    };
  }
};

const getForecastScore = (results, forecast) => {
  return forecast.map(standing => {
    const driverResult = results.filter(
      result => result.number === String(standing._driver.number)
    )[0];
    const posDifference = driverResult
      ? Math.abs(driverResult.position - standing.position)
      : 100;

    const score = scoreReglament.hasOwnProperty(posDifference)
      ? scoreReglament[posDifference]
      : 0;

    standing.score = score;
    return standing;
    // console.log(
    //   'forecast: ' + standing.position,
    //   'result: ' + (driverResult ? driverResult.position : 0),
    //   'score: ' + score
    // );
  });
};

module.exports = app => {
  //	*** populating races table ***
  app.get('/api/get-race-list', isAdmin, async (req, res) => {
    //	get list of races from API
    const races = (await axios.get('http://ergast.com/api/f1/2017.json')).data
      .MRData.RaceTable.Races;

    //	create races documents
    races.forEach(async ({ round, raceName, date, Circuit }) => {
      const country = Circuit.Location.country;
      const { flagUrl, alpha3code } = await getCountryFlag(
        castCountry(country)
      );

      (await new Race({
        round,
        raceName,
        date,
        country,
        flagUrl,
        alpha3code
      })).save();
    });

    res.status(200).send('');
  });

  //	*** populating drivers table ***
  app.get('/api/get-driver-list', isAdmin, async (req, res) => {
    //	get list of drivers from API
    const drivers = (await axios.get(
      'http://ergast.com/api/f1/2017/drivers.json'
    )).data.MRData.DriverTable.Drivers;

    //	create races documents
    drivers.forEach(
      async ({ permanentNumber, givenName, familyName, code }) => {
        (await new Driver({
          code,
          name: givenName.charAt(0) + '. ' + familyName,
          number: permanentNumber
        })).save();
      }
    );

    res.status(200).send('');
  });

  //	*** user picks table seeder	//TODO add isAdmin middleware later
  app.get('/api/:username/seed/:round', async (req, res) => {
    const { username, round } = req.params;
    const _user = await User.findOne({ username }).select('_id');
    const _race = await Race.findOne({ round }).select('_id');
    const drivers = await Driver.find({}).select('_id');
    let forecast = [];

    //	populate forecast array
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(Math.random() * drivers.length);

      forecast.push({
        position: i + 1,
        _driver: drivers[index]
      });

      drivers.splice(index, 1);
    }

    const pick = await Pick.create({ _user, _race, forecast });

    res.status(200).send(pick);
  });

  //	*** result calculation route	//TODO add isAdmin middleware later
  app.get('/api/calculate/round/:round', async (req, res) => {
    const { round } = req.params;

    //	fetch actual result from public API
    const results = (await axios.get(
      `http://ergast.com/api/f1/2017/${round}/results.json`
    )).data.MRData.RaceTable.Races[0].Results;

    //  change score property for every element of forecast array in every pick document
    const _race = await Race.findOne({ round }).select('_id');
    const picks = await Pick.find({ _race })
      .populate('forecast._driver')
      .select();

    picks.forEach(async pick => {
      const updatedForecast = getForecastScore(results, pick.forecast);
      const totalScore = updatedForecast.reduce(
        (sum, value) => sum + value.score,
        0
      );
      await pick
        .set({
          forecast: updatedForecast,
          score: totalScore,
          status: 'calculated'
        })
        .save();
    });

    res.status(200).send('');
  });
};
