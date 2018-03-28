/* eslint-disable import/prefer-default-export */
import * as actionTypes from './actionTypes';

const initialState = {
	scores: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_SCORES:
			return {
				...state,
				scores: action.payload
			};
		default:
			return state;
	}
};
