/* eslint-disable import/prefer-default-export */
import * as actionTypes from './actionTypes';

const initialState = {
	heading: ''
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_PAGE_HEADING:
			return {
				...state,
				heading: action.payload
			};
		default:
			return state;
	}
};
