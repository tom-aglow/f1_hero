/* eslint-disable import/prefer-default-export */
import * as actionTypes from './actionTypes';

export const updatePageHeading = heading => ({
	type: actionTypes.UPDATE_PAGE_HEADING,
	payload: heading
});
