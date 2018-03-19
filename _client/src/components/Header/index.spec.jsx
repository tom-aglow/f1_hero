import r from 'Root/jest/utils/renderer';
import usersSample from 'Root/jest/samples/users';
import pageSample from 'Root/jest/samples/page';
import Header from './index';

const defaultProps = {
	user: usersSample.current,
	heading: pageSample.heading
};

r.init(Header, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render(null, true);
	expect(wrapper).toMatchSnapshot();
});
