import r from 'Root/jest/utils/renderer';

import SubmitButton from './index';

const defaultProps = {
	onClick: jest.fn()
};

r.init(SubmitButton, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render();
	expect(wrapper).toMatchSnapshot();
});

it('triggers callback when clicked', () => {
	const button = r.render();

	button.simulate('click');

	expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
});
