import { FETCH_DRIVERS } from '../actions/types';

export default function(state = [], action) {
	if (action.type === FETCH_DRIVERS) {
		const drivers = action.payload.data;

		//  format drivers array similar to picks forecast array structure
		let i = 0;
		return drivers.map(driver => {
			i += 1;
			return { position: i, _driver: driver };
		});
	}

	return state;
}
