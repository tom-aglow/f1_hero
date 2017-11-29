import { SELECT_RACE } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case SELECT_RACE:
			return action.payload;
		default:
			return state;
	}
}

