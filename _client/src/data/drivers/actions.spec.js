import driversSample from 'JestClient/samples/drivers';
import t from 'JestClient/actionTester';
import { getDriverList, updateDriverList } from './actions';
import { endPoints } from './api';

const drivers = [driversSample.all[0]._driver, driversSample.all[1]._driver];

it('dispatches "drivers/UPDATE_DRIVER_LIST" action with correct payload', () => {
	expect(updateDriverList(drivers)).toMatchSnapshot();
});

it('fetches data from api and create correct action creator', done => {
	const dispatchMock = jest.fn();

	const assertions = (dispatch, request) => {
		expect(request.url).toEqual(endPoints.getDriverList);
		expect(dispatch).toHaveBeenCalledTimes(1);
		expect(dispatch).toHaveBeenCalledWith(updateDriverList(drivers));
		done();
	};

	t({
		action: getDriverList,
		apiResponse: { drivers },
		dispatch: dispatchMock,
		assertions
	});
});
