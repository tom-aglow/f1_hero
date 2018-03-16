/* eslint-disable import/prefer-default-export */
export const isObjectEmpty = obj =>
	Object.keys(obj).length === 0 && obj.constructor === Object;
