import r from 'Root/jest/utils/renderer';
import userSample from 'Root/jest/samples/user';
import pageSample from 'Root/jest/samples/page';
import Header from './index';

const defaultProps = {
	user: userSample,
	heading: pageSample.heading
};

r.init(Header, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render(null, true);
	expect(wrapper).toMatchSnapshot();
});
