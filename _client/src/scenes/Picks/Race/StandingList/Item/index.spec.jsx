import r from 'Root/jest/utils/renderer';
import pickSample from 'JestClient/samples/pick';
import { sel } from 'JestClient/functions';

import Item from './index';

const defaultProps = { ...pickSample.forecast[0] };

r.init(Item, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render(null, true);
	expect(wrapper).toMatchSnapshot();
});

describe('displays correct element', () => {
	it('when forecast was submitted', () => {
		const wrapper = r.render({ score: 5 }, true);
		const scoreEl = wrapper.find(sel('standing-list-item-score'));
		const sortIcon = wrapper.find(sel('standing-list-item-sort'));

		expect(scoreEl).toHaveLength(1);
		expect(sortIcon).toHaveLength(0);
	});

	it('when user is picking a new forecast', () => {
		const wrapper = r.render({ score: null }, true);
		const scoreEl = wrapper.find(sel('standing-list-item-score'));
		const sortIcon = wrapper.find(sel('standing-list-item-sort'));

		expect(scoreEl).toHaveLength(0);
		expect(sortIcon).toHaveLength(1);
	});
});
