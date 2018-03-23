import r from 'Root/jest/utils/renderer';

import StatusIcon from './index';

const defaultProps = {
	iconClass: 'fa-check',
	status: 'passed'
};

r.init(StatusIcon, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render();
	expect(wrapper).toMatchSnapshot();
});
