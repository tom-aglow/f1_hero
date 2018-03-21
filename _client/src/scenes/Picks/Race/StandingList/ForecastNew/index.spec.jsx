import r from 'Root/jest/utils/renderer';
import pickSample from 'JestClient/samples/pick';
import { sel } from 'JestClient/functions';

import ForecastNew from './index';

const defaultProps = {
	items: pickSample.forecast
};

r.init(ForecastNew, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render(null, true);
	expect(wrapper).toMatchSnapshot();
});

it('renders correct amount of list items', () => {
	const wrapper = r.render(null, true);
	const items = wrapper
		.at(0)
		.dive()
		.find(sel('new-standing-item'));

	expect(items).toHaveLength(defaultProps.items.length);
});
