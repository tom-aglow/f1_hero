import r from 'Root/jest/utils/renderer';
import pickSample from 'JestClient/samples/pick';
import driversSample from 'JestClient/samples/drivers';
import racesSample from 'JestClient/samples/races';
import { sel } from 'JestClient/functions';

import StandingList from './index';
import ForecastNew from './ForecastNew';
import ForecastMissed from './ForecastMissed';
import ForecastSubmitted from './ForecastSubmitted';

const defaultProps = {
	status: 'submitted',
	list: pickSample.forecast,
	drivers: driversSample.all,
	round: 1,
	races: racesSample.all,
	onSubmit() {},
	updateRace() {}
};

r.init(StandingList, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render(null, true);
	expect(wrapper).toMatchSnapshot();
});

describe('renders correct forecast component', () => {
	it('when provided status is new', () => {
		const wrapper = r.render({ status: 'new' }, true);

		expect(wrapper.find(ForecastNew)).toHaveLength(1);
		expect(wrapper.find(ForecastMissed)).toHaveLength(0);
		expect(wrapper.find(ForecastSubmitted)).toHaveLength(0);
	});

	it('when provided status is passed', () => {
		const wrapper = r.render({ status: 'passed' }, true);

		expect(wrapper.find(ForecastMissed)).toHaveLength(1);
		expect(wrapper.find(ForecastNew)).toHaveLength(0);
		expect(wrapper.find(ForecastSubmitted)).toHaveLength(0);
	});

	it('when provided status is submitted', () => {
		const wrapper = r.render({ status: 'submitted' }, true);

		expect(wrapper.find(ForecastSubmitted)).toHaveLength(1);
		expect(wrapper.find(ForecastNew)).toHaveLength(0);
		expect(wrapper.find(ForecastMissed)).toHaveLength(0);
	});
});

describe('submit button', () => {
	it('is shown when user is picking a new race forecast', () => {
		const wrapper = r.render({ status: 'new' }, true);
		const button = wrapper.find(sel('submit-pick-button'));

		expect(button).toHaveLength(1);
	});

	it('is hidden when user is checking previously submitted forecast', () => {
		const wrapper = r.render({ status: 'submitted' }, true);
		const button = wrapper.find(sel('submit-pick-button'));

		expect(button).toHaveLength(0);
	});

	it('is hidden when user is checking previously missed forecast', () => {
		const wrapper = r.render({ status: 'passed' }, true);
		const button = wrapper.find(sel('submit-pick-button'));

		expect(button).toHaveLength(0);
	});
});
