import r from 'Root/jest/utils/renderer';
import racesSample from 'JestClient/samples/races';
import { mapStateToProps, PicksContainer } from './container';

const initialState = {
	data: {
		races: racesSample
	}
};

const defaultProps = {
	races: mapStateToProps(initialState).races,
	updatePageHeading: jest.fn(),
	getRaceList: jest.fn(),
	getDriverList: jest.fn(),
	selectRace: jest.fn()
};

it('maps redux state to component props', () => {
	const { races } = mapStateToProps(initialState);

	expect(races).toMatchObject(racesSample.all);
});

it('triggers actions when it mounts and unmounts', () => {
	r.init(PicksContainer, defaultProps);
	const wrapper = r.render({}, true, { disableLifecycleMethods: false });

	expect(defaultProps.updatePageHeading).toHaveBeenCalledTimes(1);
	expect(defaultProps.getRaceList).toHaveBeenCalledTimes(1);
	expect(defaultProps.getDriverList).toHaveBeenCalledTimes(1);

	wrapper.unmount();
	expect(defaultProps.selectRace).toHaveBeenCalledTimes(1);
	expect(defaultProps.selectRace).toHaveBeenCalledWith(0);
});
