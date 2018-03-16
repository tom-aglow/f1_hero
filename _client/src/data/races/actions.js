/* eslint-disable import/prefer-default-export */
import * as api from './api';
import * as actionTypes from './actionTypes';

const updateRaceList = races => ({
	type: actionTypes.UPDATE_RACE_LIST,
	payload: races
});

export const getRaceList = () => async dispatch => {
	const response = await api.getRaceList();
	dispatch(updateRaceList(response.data.races));
};
