import usersSample from 'JestClient/samples/users';
import { reducer } from './reducer';
import { UPDATE_CURRENT_USER } from './actionTypes';

test('users/UPDATE_CURRENT_USER', () => {
	const state = reducer(
		{
			current: {
				username: 'default'
			}
		},
		{
			type: UPDATE_CURRENT_USER,
			payload: usersSample.current
		}
	);
	expect(state).toMatchObject({
		current: usersSample.current
	});
});
