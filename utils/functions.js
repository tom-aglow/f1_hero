function getMaxFiveElements(arr) {
	return arr.sort((a, b) => a < b).slice(0, 5);
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
	getMaxFiveElements,
	capitalizeFirstLetter
};
