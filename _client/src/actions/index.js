import axios from 'axios';
import {FETCH_RACES, FETCH_USER, SELECT_RACE} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current-user');
  dispatch({ type: FETCH_USER, payload: res });
};

export const setUser = user => dispatch => {
	dispatch({ type: FETCH_USER, payload: user });
};

export const fetchRaces = () => async dispatch => {
	const res = await axios.get('/api/races');
	dispatch({ type: FETCH_RACES, payload: res });
};

export const selectRace = (round) => (dispatch, getState, payload) => {
	dispatch({ type: SELECT_RACE, payload: round });
};
