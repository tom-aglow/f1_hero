import usersSample from 'JestClient/samples/users';
import t from 'JestClient/actionTester';
import { getCurrentUser, updateCurrentUser } from './actions';
import { endPoints } from './api';

test('updateCurrentUser', () => {
	expect(updateCurrentUser(usersSample.current)).toMatchSnapshot();
});

test('getCurrentUser action', done => {
	const dispatchMock = jest.fn();

	const assertions = (dispatch, request) => {
		expect(request.url).toEqual(endPoints.getCurrentUser);
		done();
	};

	t({
		action: getCurrentUser,
		apiResponse: { user: usersSample.current },
		dispatch: dispatchMock,
		assertions
	});
});
