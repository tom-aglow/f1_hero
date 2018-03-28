import r from 'Root/jest/utils/renderer';
import racesSample from 'JestClient/samples/races';
import pickSample from 'JestClient/samples/pick';
import { sel } from 'JestClient/functions';
import moxios from 'moxios';

import Loader from 'App/components/Loader';
import Picks from './index';
import Race from './Race/container';
import StandingList from './Race/StandingList/container';

const defaultProps = {
	races: racesSample.all
};

r.init(Picks, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render();
	expect(wrapper).toMatchSnapshot();
});

it('renders correct amount of races', () => {
	const wrapper = r.render();
	const races = wrapper.find(Race);

	expect(races).toHaveLength(defaultProps.races.length);
});

it('renders Loader if there are no races', () => {
	const wrapper = r.render({ races: [] });
	const loader = wrapper.find(Loader);
	const races = wrapper.find(Race);

	expect(loader).toHaveLength(1);
	expect(races).toHaveLength(0);
});

describe('renders standing list', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = r.render(null, false);
	});

	it('only if race is clicked', done => {
		let standingList = wrapper.find(StandingList);
		expect(standingList).toHaveLength(0);

		const race = wrapper.find(sel('race')).at(0);

		moxios.withMock(() => {
			race.simulate('click');

			moxios.wait(async () => {
				const request = moxios.requests.mostRecent();

				await request.respondWith({
					status: 200,
					response: { pick: pickSample }
				});

				standingList = wrapper.update().find(StandingList);
				expect(standingList).toHaveLength(1);
				done();
			});
		});
	});

	it("with status 'submitted' if user previously submitted the pick", done => {
		const race = wrapper.find(Race).at(0);
		expect(race.props().race.hasPick).toBe(true);
		expect(race.props().race.isPassed).toBe(true);

		moxios.withMock(() => {
			race.find(sel('race')).simulate('click');

			moxios.wait(async () => {
				const request = moxios.requests.mostRecent();

				await request.respondWith({
					status: 200,
					response: { pick: pickSample }
				});

				const standingList = wrapper.update().find(StandingList);
				expect(standingList.props().status).toBe('submitted');
				done();
			});
		});
	});

	it("with status 'missed' if user has submitted the pick and race has passed", done => {
		const race = wrapper.find(Race).at(1);
		expect(race.props().race.hasPick).toBe(false);
		expect(race.props().race.isPassed).toBe(true);

		moxios.withMock(() => {
			race.find(sel('race')).simulate('click');

			moxios.wait(async () => {
				const request = moxios.requests.mostRecent();

				await request.respondWith({
					status: 200,
					response: { pick: pickSample }
				});

				const standingList = wrapper.update().find(StandingList);
				expect(standingList.props().status).toBe('missed');
				done();
			});
		});
	});
});
