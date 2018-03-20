import racesSample from 'JestClient/samples/races';
import t from 'JestClient/actionTester';
import { updateRace, updateRaceList, selectRace, getRaceList } from './actions';
import { UPDATE_RACE_LIST, SELECT_RACE, UPDATE_RACE } from './actionTypes';
import { endPoints } from './api';

const races = racesSample.all;
const { round } = racesSample.selected;

it(`dispatches "${UPDATE_RACE_LIST}" action with correct payload`, () => {
	expect(updateRaceList(races)).toMatchSnapshot();
});

it(`dispatches "${SELECT_RACE}" action with correct payload`, () => {
	expect(selectRace(round)).toMatchSnapshot();
});

it(`dispatches "${UPDATE_RACE}" action with correct payload`, () => {
	const [field, value] = ['alpha3code', 'BAR'];
	expect(updateRace({ round, field, value })).toMatchSnapshot();
});

it('fetches race list from api and call correct action creator', done => {
	const dispatchMock = jest.fn();

	const assertions = (dispatch, request) => {
		expect(request.url).toEqual(endPoints.getRaceList);
		expect(dispatch).toHaveBeenCalledTimes(1);
		expect(dispatch).toHaveBeenCalledWith(updateRaceList(races));
		done();
	};

	t({
		action: getRaceList,
		apiResponse: { races },
		dispatch: dispatchMock,
		assertions
	});
});
