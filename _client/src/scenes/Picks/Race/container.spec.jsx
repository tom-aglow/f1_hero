import racesSample from 'JestClient/samples/races';
import { mapStateToProps } from './container';

const initialState = {
	data: {
		races: racesSample
	}
};

it('maps redux state to component props', () => {
	const { selectedRace } = mapStateToProps(initialState);

	expect(selectedRace).toMatchObject(racesSample.selected);
});
