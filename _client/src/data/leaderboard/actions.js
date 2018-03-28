/* eslint-disable import/prefer-default-export */
import * as api from './api';
import * as actionTypes from './actionTypes';

export const updateScores = scores => ({
	type: actionTypes.UPDATE_SCORES,
	payload: scores
});

export const getUsersScores = () => async dispatch => {
	const response = await api.getUsersScores();
	dispatch(updateScores(response.data.leaderboard));
};
