const getMaxFiveElements = arr => {
	return arr.sort((a, b) => a < b).slice(0, 5);
};

module.exports = {
	getMaxFiveElements
};
