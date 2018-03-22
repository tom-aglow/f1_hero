/* eslint-disable import/prefer-default-export */
export const isObjectEmpty = obj =>
	Object.keys(obj).length === 0 && obj.constructor === Object;

const getNodePropValue = (node, propName) => {
	const nodeStyle = window.getComputedStyle(node);
	return parseInt(nodeStyle.getPropertyValue(propName), 10);
};

export const getNodePadding = node =>
	getNodePropValue(node, 'padding-right') +
	getNodePropValue(node, 'padding-left');

export const calculatePickAndStemLeftPosition = (
	{ picksNode, stemNode, raceNode, raceHolderNode },
	racesNum,
	round
) => {
	const picksWidth = getNodePropValue(picksNode, 'width');
	const stemWidth = getNodePropValue(stemNode, 'width');
	const raceWidth = getNodePropValue(raceNode, 'width');
	const holderWidth = getNodePropValue(raceHolderNode, 'width');

	const holderPadding = getNodePadding(raceHolderNode);

	const gutter = (holderWidth - raceWidth * racesNum) / (racesNum - 1);

	const offset =
		holderPadding / 2 +
		raceWidth * round -
		raceWidth / 2 +
		gutter * (round - 1) -
		picksWidth / 2;

	if (offset < 0) {
		return {
			pickPos: 0,
			stemPos: Math.round(
				holderPadding / 2 +
					raceWidth / 2 +
					(raceWidth + gutter) * (round - 1) -
					stemWidth / 2
			)
		};
	} else if (offset + picksWidth > holderWidth) {
		return {
			pickPos: Math.round(holderWidth + holderPadding - picksWidth),
			stemPos: Math.round(
				picksWidth -
					stemWidth / 2 -
					raceWidth / 2 -
					holderPadding / 2 -
					(raceWidth + gutter) * (racesNum - round)
			)
		};
	}
	return {
		pickPos: Math.round(offset),
		stemPos: Math.round(picksWidth / 2 - stemWidth / 2)
	};
};
