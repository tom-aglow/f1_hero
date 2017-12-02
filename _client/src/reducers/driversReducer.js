import { FETCH_DRIVERS } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_DRIVERS:
      const drivers = action.payload.data;

      //  format drivers array similar to picks forecast array structure
      let i = 0;
      return drivers.map(driver => {
        i += 1;
        return { position: i, _driver: driver };
      });
		default:
			return state;
	}
}

