/* eslint-disable import/prefer-default-export */
import fetchApi from '../../services/api';

const endPoints = {
	getDriverList: '/api/drivers'
};

export const getDriverList = () => fetchApi(endPoints.getDriverList);
