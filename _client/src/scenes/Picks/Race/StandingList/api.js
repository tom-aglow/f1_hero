/* eslint-disable import/prefer-default-export */
import fetchApi from '../../../../services/api';

const endPoints = {
	postPick(round) {
		return `/api/picks/${round}`;
	}
};

export const postPick = (round, payload) =>
	fetchApi(endPoints.postPick(round), 'post', payload);
