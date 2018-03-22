import r from 'Root/jest/utils/renderer';
import racesSample from 'JestClient/samples/races';
import { sel } from 'JestClient/functions';

import Race from './index';

const defaultProps = {
	race: racesSample.all[0],
	selectedRace: racesSample.selected,
	selectRace() {}
};

r.init(Race, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render();
	expect(wrapper).toMatchSnapshot();
});

describe('renders correct race status icon', () => {
	it('when race has passed', () => {
		const wrapper = r.render({
			race: { ...defaultProps.race, hasPick: false, isPassed: true }
		});
		const status = wrapper.find(sel('race-status-passed'));

		expect(status).toHaveLength(1);
	});

	it('when pick is submitted and race is not passed', () => {
		const wrapper = r.render({
			race: { ...defaultProps.race, hasPick: true, isPassed: false }
		});
		const status = wrapper.find(sel('race-status-submitted'));

		expect(status).toHaveLength(1);
	});

	it('when pick is not submitted and race is not passed', () => {
		const wrapper = r.render({
			race: { ...defaultProps.race, hasPick: false, isPassed: false }
		});
		const status = wrapper.find(sel('race-status-new'));

		expect(status).toHaveLength(1);
	});
});
