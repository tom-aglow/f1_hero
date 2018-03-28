import r from 'Root/jest/utils/renderer';
import pickSample from 'JestClient/samples/pick';

import ForecastSubmitted from './index';
import Item from '../Item';

const defaultProps = {
	items: pickSample.forecast
};

r.init(ForecastSubmitted, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render(null, true);
	expect(wrapper).toMatchSnapshot();
});

it('renders correct amount of list items', () => {
	const wrapper = r.render(null, true);
	const items = wrapper.find(Item);

	expect(items).toHaveLength(defaultProps.items.length);
});
