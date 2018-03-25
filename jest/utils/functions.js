const mongoose = require('mongoose');
const transformProps = require('transform-props');

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

function castToString(arg) {
	return String(arg);
}

function docToObj(docObj) {
	return transformProps(docObj, castToString, '_id');
}

module.exports = {
	clearCollection,
	clearAllCollections,
	docToObj
};
