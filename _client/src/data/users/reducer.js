/* eslint-disable import/prefer-default-export */
import * as actionTypes from './actionTypes';

const initialState = {
	current: {}
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_CURRENT_USER:
			return {
				...state,
				current: {
					...state.current,
					...action.payload
				}
			};
		default:
			return state;
	}
};
