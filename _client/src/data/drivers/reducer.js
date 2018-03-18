/* eslint-disable import/prefer-default-export */
import * as actionTypes from './actionTypes';

const initialState = {
	all: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_DRIVER_LIST:
			//  format drivers array similar to picks forecast array structure
			return {
				...state,
				all: action.payload.map((driver, index) => ({
					position: index + 1,
					_driver: driver
				}))
			};
		default:
			return state;
	}
};
