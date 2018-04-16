import r from 'Root/jest/utils/renderer';
import usersSample from 'JestClient/samples/users';
import pageSample from 'JestClient/samples/page';
import Header from './index';

const defaultProps = {
	user: usersSample.current,
	heading: pageSample.heading
};

r.init(Header, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render();
	expect(wrapper).toMatchSnapshot();
});
