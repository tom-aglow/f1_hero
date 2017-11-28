const axios = require('axios');
const Race = require('mongoose').model('race');
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
};
