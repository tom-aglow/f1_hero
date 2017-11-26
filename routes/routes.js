module.exports = app => {
  app.get('/', (req, res) => {
    res.send('hi there');
  });

	app.get('/picks', (req, res) => {
		res.send('picks');
	});
};
