import pageSample from 'JestClient/samples/page';
import { reducer } from './reducer';
import { UPDATE_PAGE_HEADING } from './actionTypes';

const currentState = {
	heading: 'Hello World'
};

const payload = pageSample.heading;

it('returns default state for non-related action types', () => {
	const state = reducer(currentState, {
		type: 'foo',
		payload
	});

	expect(state).toMatchObject(currentState);
});

it('updates "heading" piece of state', () => {
	const state = reducer(currentState, {
		type: UPDATE_PAGE_HEADING,
		payload
	});

	expect(state).toMatchObject({ heading: payload });
});
