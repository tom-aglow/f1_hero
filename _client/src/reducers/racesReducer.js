import { FETCH_RACES } from '../actions/types';

export default function(state = [], action) {
	if (action.type === FETCH_RACES) {
		return action.payload.data;
	}
	return state;
}
