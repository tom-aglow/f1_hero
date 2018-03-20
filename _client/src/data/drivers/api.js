/* eslint-disable import/prefer-default-export */
import fetchApi from '../../services/api';

export const endPoints = {
	getDriverList: '/api/drivers'
};

export const getDriverList = () => fetchApi(endPoints.getDriverList);
