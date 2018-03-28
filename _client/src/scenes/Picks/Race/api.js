/* eslint-disable import/prefer-default-export */
import fetchApi from '../../../services/api';

const endPoints = {
	getPick(round) {
		return `/api/picks/${round}`;
	}
};

export const getPick = round => fetchApi(endPoints.getPick(round));
