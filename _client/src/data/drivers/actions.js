/* eslint-disable import/prefer-default-export */
import * as api from './api';
import * as actionTypes from './actionTypes';

const updateDriverList = drivers => ({
	type: actionTypes.UPDATE_DRIVER_LIST,
	payload: drivers
});

export const getDriverList = () => async dispatch => {
	const response = await api.getDriverList();
	dispatch(updateDriverList(response.data.drivers));
};
