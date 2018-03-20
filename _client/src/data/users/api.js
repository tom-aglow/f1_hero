/* eslint-disable import/prefer-default-export */
import fetchApi from '../../services/api';

export const endPoints = {
	getCurrentUser: '/auth/current-user'
};

export const getCurrentUser = () => fetchApi(endPoints.getCurrentUser);
