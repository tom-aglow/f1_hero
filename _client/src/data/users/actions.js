/* eslint-disable import/prefer-default-export */
import * as api from './api';
import * as actionTypes from './actionTypes';

const updateCurrentUser = user => ({
	type: actionTypes.UPDATE_CURRENT_USER,
	payload: user
});

export const getCurrentUser = () => async dispatch => {
	const response = await api.getCurrentUser();
	dispatch(updateCurrentUser(response.data.user));
};
