import usersSample from 'JestClient/samples/users';
import { reducer } from './reducer';
import { UPDATE_CURRENT_USER } from './actionTypes';

const currentState = {
	current: {
		username: 'default'
	}
};

it('returns default state for non-related action types', () => {
	const state = reducer(currentState, {
		type: 'foo',
		payload: usersSample.current
	});

	expect(state).toMatchObject(currentState);
});

it('updates "current" piece of state', () => {
	const state = reducer(currentState, {
		type: UPDATE_CURRENT_USER,
		payload: usersSample.current
	});
	expect(state).toMatchObject({
		current: usersSample.current
	});
});
