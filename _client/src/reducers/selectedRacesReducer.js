import { SELECT_RACE } from '../actions/types';

export default function(state = 0, action) {
  if (action.type === SELECT_RACE) {
    return action.payload;
  }
  return state;
}
