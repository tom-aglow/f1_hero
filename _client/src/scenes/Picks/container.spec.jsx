import racesSample from 'JestClient/samples/races';
import { mapStateToProps } from './container';

const initialState = {
	data: {
		races: racesSample
	}
};

it('maps redux state to component props', () => {
	const { races } = mapStateToProps(initialState);

	expect(races).toMatchObject(racesSample.all);
});
