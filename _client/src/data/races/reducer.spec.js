import racesSample from 'JestClient/samples/races';
import { reducer } from './reducer';
import { UPDATE_RACE_LIST, SELECT_RACE, UPDATE_RACE } from './actionTypes';

const currentState = {
	all: [
		{
			round: 1,
			alpha3code: 'FOO'
		},
		{
			round: 2,
			alpha3code: 'BAR'
		}
	],
	selected: {
		round: 2
	}
};

it('returns default state for non-related action types', () => {
	const state = reducer(currentState, {
		type: 'foo',
		payload: racesSample.all
	});

	expect(state).toMatchObject(currentState);
});

it('updates "all" piece of state', () => {
	const state = reducer(currentState, {
		type: UPDATE_RACE_LIST,
		payload: racesSample.all
	});

	expect(state).toMatchObject({
		all: racesSample.all,
		selected: currentState.selected
	});
});

it('selects provided race', () => {
	const round = 3;

	const state = reducer(currentState, {
		type: SELECT_RACE,
		payload: round
	});

	expect(state).toMatchObject({
		all: currentState.all,
		selected: { round }
	});
});

it('updates field of specified race with provided value', () => {
	const [round, field, value] = [2, 'alpha3code', 'BAR'];

	const state = reducer(currentState, {
		type: UPDATE_RACE,
		payload: { round, field, value }
	});

	expect(state).toMatchObject({
		all: [currentState.all[0], { round, [field]: value }],
		selected: currentState.selected
	});
});
