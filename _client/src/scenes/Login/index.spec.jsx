import r from 'Root/jest/utils/renderer';
import Login from './index';

const defaultProps = {};

r.init(Login, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render(null, true);
	expect(wrapper).toMatchSnapshot();
});
