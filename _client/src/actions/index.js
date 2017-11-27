import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res });
};

export const setUser = user => dispatch => {
	dispatch({ type: FETCH_USER, payload: user });
};
