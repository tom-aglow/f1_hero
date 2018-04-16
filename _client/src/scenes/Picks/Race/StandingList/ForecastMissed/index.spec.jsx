import r from 'Root/jest/utils/renderer';

import ForecastMissed from './index';

const defaultProps = {};

r.init(ForecastMissed, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render();
	expect(wrapper).toMatchSnapshot();
});
