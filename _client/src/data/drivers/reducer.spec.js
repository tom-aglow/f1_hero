import driversSample from 'JestClient/samples/drivers';
import { reducer } from './reducer';
import { UPDATE_DRIVER_LIST } from './actionTypes';

const currentState = {
	all: [
		{
			position: 10,
			_driver: {
				code: 'JOD',
				name: 'John Doe'
			}
		}
	]
};

const payload = [driversSample.all[0]._driver, driversSample.all[1]._driver];

it('returns default state for non-related action types', () => {
	const state = reducer(currentState, {
		type: 'foo',
		payload
	});

	expect(state).toMatchObject(currentState);
});

it('updates "all" piece of state', () => {
	const state = reducer(currentState, {
		type: UPDATE_DRIVER_LIST,
		payload
	});

	expect(state).toMatchObject({
		all: [
			{
				position: 1,
				_driver: payload[0]
			},
			{
				position: 2,
				_driver: payload[1]
			}
		]
	});
});
