const f = require('../../jest/utils/factories');

exports.seed = async (req, res) => {
	const { num } = req.params;

	for (let i = 0; i < num; i += 1) {
		f.create('user', { twitterID: `fake-${Date.now()}${i}` });
	}

	res.status(200).send({ status: 'done' });
};
