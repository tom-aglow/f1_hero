/* eslint-disable import/prefer-default-export */
import * as actionTypes from './actionTypes';

const initialState = {
	all: [],
	selected: {
		round: 0
	}
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_RACE_LIST:
			return {
				...state,
				all: [...state.all, ...action.payload]
			};
		case actionTypes.SELECT_RACE:
			return {
				...state,
				selected: {
					...state.selected,
					round: action.payload
				}
			};
		default:
			return state;
	}
};
