import axios from 'axios';
import { FETCH_RACES, SET_HEADER, SELECT_RACE, FETCH_DRIVERS } from './types';
import { store } from '../App';

export const fetchRaces = () => async dispatch => {
  const res = await axios.get('/api/races');
  dispatch({ type: FETCH_RACES, payload: res });
};

export const selectRace = round => dispatch => {
  dispatch({ type: SELECT_RACE, payload: round });
};

export const fetchDrivers = () => async dispatch => {
  const res = await axios.get('/api/drivers');
  dispatch({ type: FETCH_DRIVERS, payload: res });
};

export const setHeader = header => dispatch => {
  dispatch({ type: SET_HEADER, payload: header });
};

export const setPickStatus = (round, status) => dispatch => {
  const races = store.getState().races.map(race => {
    if (race.round === round) {
      race.hasPick = status;
    }
    return race;
  });

  dispatch({ type: FETCH_RACES, payload: { data: races } });
};
