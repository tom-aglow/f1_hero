import r from 'Root/jest/utils/renderer';
import NavLink from './index';

const defaultProps = {
	path: '/foo',
	name: 'Foo'
};

r.init(NavLink, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render();
	expect(wrapper).toMatchSnapshot();
});
