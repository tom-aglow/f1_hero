const axios = require('axios');
const faker = require('faker');

const User = require('mongoose').model('user');
const Race = require('mongoose').model('race');
const Driver = require('mongoose').model('driver');
const Pick = require('mongoose').model('pick');
const isAdmin = require('../middlewares/isAdmin');
const {castCountry, getCountryFlag, getForecastScore} = require('../utils/serviceRoutesHelpers');

const seedPicksTable = async (username, round) => {
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

  return await Pick.create({ _user, _race, forecast });
};

module.exports = app => {
  //	*** populating races table ***
  app.get('/api/get-race-list', async (req, res) => {
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

    res.status(200).send(races);
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

  //	*** result calculation route
  app.get('/api/calculate/round/:round', isAdmin, async (req, res) => {
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

    await Race.findOneAndUpdate({ _id: _race }, { $set: { isPassed: true } });

    res.status(200).send('');
  });

  app.get('/api/seed',  async (req, res) => {
    const races = await Race.find().select('_id');

    for (let i = 0; i < 20; i += 1) {
      const fakeName = faker.internet.userName();
      const user = await User.create({
        twitterID: `0000${i}`,
        username: fakeName
      });

      for (let j = 1; j <= races.length(); j++) {
        await seedPicksTable(user.username, j);
      }
    }

    res.status(200).send('');
  });
};
