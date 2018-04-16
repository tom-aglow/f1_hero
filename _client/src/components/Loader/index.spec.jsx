import r from 'Root/jest/utils/renderer';
import Loader from './index';

const defaultProps = {};

r.init(Loader, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render();
	expect(wrapper).toMatchSnapshot();
});
