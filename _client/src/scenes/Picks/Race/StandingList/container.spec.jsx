import racesSample from 'JestClient/samples/races';
import driversSample from 'JestClient/samples/drivers';
import { mapStateToProps } from './container';

const initialState = {
	data: {
		races: racesSample,
		drivers: driversSample
	}
};

it('maps redux state to component props', () => {
	const { races, drivers } = mapStateToProps(initialState);

	expect(races).toMatchObject(racesSample.all);
	expect(drivers).toMatchObject(driversSample.all);
});
