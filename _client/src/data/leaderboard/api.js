/* eslint-disable import/prefer-default-export */
import fetchApi from '../../services/api';

export const endPoints = {
	getUsersScores: '/api/leaderboard'
};

export const getUsersScores = () => fetchApi(endPoints.getUsersScores);
