/* eslint-disable import/prefer-default-export */
export const isObjectEmpty = obj =>
	Object.keys(obj).length === 0 && obj.constructor === Object;

export const getNodePaddings = node => {
	const nodeStyle = window.getComputedStyle(node);
	return (
		parseInt(nodeStyle.getPropertyValue('padding-right'), 10) +
		parseInt(nodeStyle.getPropertyValue('padding-left'), 10)
	);
};
