const mongoose = require('mongoose');

function clearCollection(model) {
	return mongoose.model(model).remove();
}

function clearAllCollections() {
	Promise.all([
		mongoose.model('race').remove(),
		mongoose.model('user').remove(),
		mongoose.model('pick').remove(),
		mongoose.model('driver').remove()
	]).then(() => null);
}

module.exports = {
	clearCollection,
	clearAllCollections
};
