/* eslint-disable import/prefer-default-export */
import * as actionTypes from './actionTypes';

const initialState = {
	all: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_RACE_LIST:
			return {
				...state,
				all: [...state.all, ...action.payload]
			};
		default:
			return state;
	}
};
