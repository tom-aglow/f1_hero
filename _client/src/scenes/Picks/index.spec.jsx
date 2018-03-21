import r from 'Root/jest/utils/renderer';
import racesSample from 'JestClient/samples/races';

import Loader from 'App/components/Loader';
import Picks from './index';
import Race from './Race/container';

const defaultProps = {
	races: racesSample.all
};

r.init(Picks, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render(null, true);
	expect(wrapper).toMatchSnapshot();
});

it('renders correct amount of races', () => {
	const wrapper = r.render(null, true);
	const races = wrapper.find(Race);

	expect(races).toHaveLength(defaultProps.races.length);
});

it('renders Loader if there are no races', () => {
	const wrapper = r.render({ races: [] }, true);
	const loader = wrapper.find(Loader);
	const races = wrapper.find(Race);

	expect(loader).toHaveLength(1);
	expect(races).toHaveLength(0);
});
