import leaderboardSample from 'JestClient/samples/leaderboard';
import t from 'JestClient/actionTester';
import { getUsersScores, updateScores } from './actions';
import { endPoints } from './api';

const { scores } = leaderboardSample;

it('dispatches "leaderboard/UPDATE_SCORES" action with correct drivers', () => {
	expect(updateScores(scores)).toMatchSnapshot();
});

it('fetches data from api and create correct action creator', done => {
	const dispatchMock = jest.fn();

	const assertions = (dispatch, request) => {
		expect(request.url).toEqual(endPoints.getUsersScores);
		expect(dispatch).toHaveBeenCalledTimes(1);
		expect(dispatch).toHaveBeenCalledWith(updateScores(scores));
		done();
	};

	t({
		action: getUsersScores,
		apiResponse: { leaderboard: scores },
		dispatch: dispatchMock,
		assertions
	});
});
