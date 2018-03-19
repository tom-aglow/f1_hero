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

function sel(id) {
	return `[data-test="${id}"]`;
}

module.exports = {
	clearCollection,
	clearAllCollections,
	sel
};
