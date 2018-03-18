/* eslint-disable import/prefer-default-export */
import * as actionTypes from './actionTypes';

const initialState = {
	all: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_DRIVER_LIST:
			//  format drivers array similar to picks forecast array structure
			let i = 0;
			const formattedDrivers = action.payload.map(driver => {
				i += 1;
				return { position: i, _driver: driver };
			});

			return {
				...state,
				all: formattedDrivers
			};
		default:
			return state;
	}
};
