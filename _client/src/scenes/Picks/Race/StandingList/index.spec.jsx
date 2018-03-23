import r from 'Root/jest/utils/renderer';
import pickSample from 'JestClient/samples/pick';
import driversSample from 'JestClient/samples/drivers';
import racesSample from 'JestClient/samples/races';
import moxios from 'moxios';

import StandingList from './index';
import ForecastNew from './ForecastNew';
import ForecastMissed from './ForecastMissed';
import ForecastSubmitted from './ForecastSubmitted';
import Item from './Item';
import SubmitButton from './SubmitButton';
import { endPoints } from './api';

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
	const wrapper = r.render();
	expect(wrapper).toMatchSnapshot();
});

describe('renders correct forecast component', () => {
	it('when provided status is new', () => {
		const wrapper = r.render({ status: 'new' });

		expect(wrapper.find(ForecastNew)).toHaveLength(1);
		expect(wrapper.find(ForecastMissed)).toHaveLength(0);
		expect(wrapper.find(ForecastSubmitted)).toHaveLength(0);
	});

	it('when provided status is missed', () => {
		const wrapper = r.render({ status: 'missed' });

		expect(wrapper.find(ForecastMissed)).toHaveLength(1);
		expect(wrapper.find(ForecastNew)).toHaveLength(0);
		expect(wrapper.find(ForecastSubmitted)).toHaveLength(0);
	});

	it('when provided status is submitted', () => {
		const wrapper = r.render({ status: 'submitted' });

		expect(wrapper.find(ForecastSubmitted)).toHaveLength(1);
		expect(wrapper.find(ForecastNew)).toHaveLength(0);
		expect(wrapper.find(ForecastMissed)).toHaveLength(0);
	});
});

describe('submit button', () => {
	it('is shown when user is picking a new race forecast', () => {
		const wrapper = r.render({ status: 'new' });
		const button = wrapper.find(SubmitButton);

		expect(button).toHaveLength(1);
	});

	it('is hidden when user is checking previously submitted forecast', () => {
		const wrapper = r.render({ status: 'submitted' });
		const button = wrapper.find(SubmitButton);

		expect(button).toHaveLength(0);
	});

	it('is hidden when user is checking previously missed forecast', () => {
		const wrapper = r.render({ status: 'missed' });
		const button = wrapper.find(SubmitButton);

		expect(button).toHaveLength(0);
	});
});

it("submits user's forecast", done => {
	const onSubmit = jest.fn();
	const updateRace = jest.fn();
	const wrapper = r.render({ status: 'new', onSubmit, updateRace });
	const button = wrapper.find(SubmitButton);

	moxios.withMock(() => {
		button.simulate('click');

		moxios.wait(async () => {
			const request = moxios.requests.mostRecent();
			const response = { pick: pickSample };

			await request.respondWith({
				status: 200,
				response
			});

			expect(request.config.method).toBe('post');
			expect(request.url).toBe(endPoints.postPick(defaultProps.round));

			const standingsEl = wrapper.update().find(ForecastSubmitted);
			expect(standingsEl).toHaveLength(1);

			const firstListItem = standingsEl
				.dive()
				.find(Item)
				.at(0);
			expect(firstListItem.props()._driver.name).toBe(
				response.pick.forecast[0]._driver.name
			);

			expect(onSubmit).toHaveBeenCalledTimes(1);
			expect(onSubmit).toHaveBeenCalledWith(response.pick);

			expect(updateRace).toHaveBeenCalledTimes(1);
			expect(updateRace).toHaveBeenCalledWith({
				round: defaultProps.round,
				field: 'hasPick',
				value: true
			});

			done();
		});
	});
});

it('can sort new forecast list', () => {
	const oldIndex = 1;
	const newIndex = 0;
	const wrapper = r.render({ status: 'new' });
	const initialList = wrapper.state('list');

	const forecast = wrapper.find(ForecastNew);
	forecast.props().onSortEnd({ oldIndex, newIndex });

	const newList = wrapper.update().state('list');

	expect(newList[newIndex]._driver).toMatchObject(
		initialList[oldIndex]._driver
	);
	expect(newList[oldIndex]._driver).toMatchObject(
		initialList[newIndex]._driver
	);

	expect(newList[0].position).toBe(1);
	expect(newList[1].position).toBe(2);
});
