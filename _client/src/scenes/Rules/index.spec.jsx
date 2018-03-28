import r from 'Root/jest/utils/renderer';

import Rules from './index';

const defaultProps = {};

r.init(Rules, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render(null, true);
	expect(wrapper).toMatchSnapshot();
});
