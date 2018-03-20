/* eslint-disable import/prefer-default-export */
import fetchApi from '../../services/api';

export const endPoints = {
	getRaceList: '/api/races'
};

export const getRaceList = () => fetchApi(endPoints.getRaceList);
