const axios = require('axios');
const User = require('mongoose').model('user');
const Race = require('mongoose').model('race');
const Driver = require('mongoose').model('driver');
const Pick = require('mongoose').model('pick');
const { BASETRIP_SECRET } = require('../config/keys');
const isAdmin = require('../middlewares/isAdmin');

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

module.exports = app => {
	
  //	*** populating races table ***
  app.get('/api/get-race-list', isAdmin, async (req, res) => {
    //	get list of races from API
    const races = (await axios.get('http://ergast.com/api/f1/2017.json')).data
      .MRData.RaceTable.Races;

    //	create races documents
    races.forEach(async ({ round, raceName, date, Circuit }) => {
      const country = Circuit.Location.country;
      const {flagUrl, alpha3code} = await getCountryFlag(castCountry(country));
      
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
		const drivers = (await axios.get('http://ergast.com/api/f1/2017/drivers.json')).data
			.MRData.DriverTable.Drivers;

		//	create races documents
		drivers.forEach(async ({ permanentNumber, givenName, familyName, code }) => {
			(await new Driver({
				code,
				name: givenName.charAt(0) + '. ' + familyName,
				number: permanentNumber
			})).save();
		});

		res.status(200).send('');
	});
	
	//	*** user picks table seeder	//TODO add isAdmin middleware later
	app.get('/api/:username/seed/:round', async (req, res) => {
		const {username, round} = req.params;
		const _user = await User.findOne({username}).select('_id');
		const _race = await Race.findOne({round}).select('_id');
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

		const pick = await Pick.create({_user, _race, forecast});
		
		res.status(200).send(pick);
	})
};
