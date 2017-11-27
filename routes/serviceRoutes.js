const axios = require('axios');
const Race = require('mongoose').model('race');

module.exports = app => {
	//	populating races table
  app.get('/api/get-race-list', async (req, res) => {
  	
  	//	get list of races from API
    const races = (await axios.get('http://ergast.com/api/f1/2017.json')).data
      .MRData.RaceTable.Races;
    
    //	create races documents
    races.forEach(async ({ round, raceName, date, Circuit }) => {
      (await new Race({
        round,
        raceName,
        date,
        country: Circuit.Location.country
      })).save();
    });
    
    res.status(200);
  });
};
