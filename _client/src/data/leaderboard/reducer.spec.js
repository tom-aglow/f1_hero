import leaderboardSample from 'JestClient/samples/leaderboard';
import { reducer } from './reducer';
import { UPDATE_SCORES } from './actionTypes';

const currentState = {
	scores: [
		{
			user: 'John Doe',
			total: 1
		}
	]
};

const payload = leaderboardSample.scores;

it('returns default state for non-related action types', () => {
	const state = reducer(currentState, {
		type: 'foo',
		payload
	});

	expect(state).toMatchObject(currentState);
});

it('updates "scores" piece of state', () => {
	const state = reducer(currentState, {
		type: UPDATE_SCORES,
		payload
	});

	expect(state).toMatchObject({ scores: payload });
});
