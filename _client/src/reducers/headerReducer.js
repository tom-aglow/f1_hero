import { SET_HEADER } from '../actions/types';

export default function(state = [], action) {
	if (action.type === SET_HEADER) {
		return action.payload;
	}

	return state;
}
