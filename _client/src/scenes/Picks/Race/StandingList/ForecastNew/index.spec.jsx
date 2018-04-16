import r from 'Root/jest/utils/renderer';
import pickSample from 'JestClient/samples/pick';
import { sel } from 'JestClient/functions';

import ForecastNew from './index';

const defaultProps = {
	items: pickSample.forecast
};

r.init(ForecastNew, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render();
	expect(wrapper.at(0).dive()).toMatchSnapshot();
});

it('renders correct amount of list items', () => {
	const wrapper = r.render();
	const items = wrapper
		.at(0)
		.dive()
		.find(sel('new-standing-item'));

	expect(items).toHaveLength(defaultProps.items.length);
});
