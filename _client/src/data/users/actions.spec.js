import usersSample from 'JestClient/samples/users';
import t from 'JestClient/actionTester';
import { getCurrentUser, updateCurrentUser } from './actions';
import { UPDATE_CURRENT_USER } from './actionTypes';
import { endPoints } from './api';

it(`dispatches "${UPDATE_CURRENT_USER}" action with correct payload`, () => {
	expect(updateCurrentUser(usersSample.current)).toMatchSnapshot();
});

it('fetches data from api and create correct action creator', done => {
	const dispatchMock = jest.fn();

	const assertions = (dispatch, request) => {
		expect(request.url).toEqual(endPoints.getCurrentUser);
		expect(dispatch).toHaveBeenCalledTimes(1);
		expect(dispatch).toHaveBeenCalledWith(
			updateCurrentUser(usersSample.current)
		);
		done();
	};

	t({
		action: getCurrentUser,
		apiResponse: { user: usersSample.current },
		dispatch: dispatchMock,
		assertions
	});
});
