module.exports = app => {
  app.get('/', (req, res) => {
    res.send('hello');
  });

	app.get('/picks', (req, res) => {
		res.send('picks');
	});
};
