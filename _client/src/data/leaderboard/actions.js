/* eslint-disable import/prefer-default-export */
import * as api from './api';
import * as actionTypes from './actionTypes';

const getScores = scores => ({
	type: actionTypes.GET_SCORES,
	payload: scores
});

export const getUsersScores = () => async dispatch => {
	const response = await api.getUsersScores();
	dispatch(getScores(response.data.leaderboard));
};
