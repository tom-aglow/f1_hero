const User = require('mongoose').model('user');
const Race = require('mongoose').model('race');
const Pick = require('mongoose').model('pick');
const Driver = require('mongoose').model('driver');

const getMaxFiveElements = arr => {
  return arr.sort((a, b) => a < b).slice(0, 5);
};

module.exports = app => {
  //	return list of all races
  app.get('/api/races', async (req, res) => {
    const races = await Race.find({})
      .sort({ round: 1 })
      .select('alpha3code flagUrl round isPassed');

    res.send(races);
  });

  //	return list of all drivers
  app.get('/api/drivers', async (req, res) => {
    const drivers = await Driver.find({})
      .sort({ number: 1 })
      .select('code name');

    res.send(drivers);
  });

  //	return user's picks for the particular race
  app.get('/api/pick/:round', async (req, res) => {
    const race = await Race.findOne({ round: req.params.round }).select();
    const pick = await Pick.findOne({ _race: race._id, _user: req.user._id })
      .populate('forecast._driver')
      .select();

    res.send(pick);
  });

  //	submit user's picks for the particular race
  app.post('/api/pick/:round', async (req, res) => {
    const { round, _user, forecast } = req.body;
    const _race = await Race.findOne({ round }).select('_id');

    try {
      await Pick.create({ _user, _race, forecast });
      const pick = await Pick.findOne({ _race, _user })
        .populate('forecast._driver')
        .select();
      res.status(200).send(pick);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  //  return leaderboard info
  app.get('/api/leaderboard', async (req, res) => {
    //  fetch all users
    const users = await User.find().select();

    Promise.all(
      //  for every user fetch all pick with 'calculated' status
      users.map(async user => {
        const picks = await Pick.find({
          _user: user._id,
          status: 'calculated'
        }).select('score');
        const scores = picks.map(pick => pick.score);
        return { user: user.username, scores };
      })
    ).then(results => {
      //  get top-5 element of scores array and calculate their sum
      results.map(result => {
        result.scores = getMaxFiveElements(result.scores).reduce(
          (sum, value) => sum + value,
          0
        );
        return result;
      });

      console.log(results);
      //  sort results array by score value
      results.sort((a, b) => b.scores - a.scores);
      results.map((result, index) => {
        result.index = index + 1;
        return result;
      });

      //  return result array
      res.status(200).send(results);
    });
  });
};
