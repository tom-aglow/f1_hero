import r from 'Root/jest/utils/renderer';
import { RulesContainer } from './container';

const defaultProps = {
	updatePageHeading: jest.fn()
};

it('triggers actions when it mounts and unmounts', () => {
	r.init(RulesContainer, defaultProps);
	r.render({}, true, { disableLifecycleMethods: false });

	expect(defaultProps.updatePageHeading).toHaveBeenCalledTimes(1);
});
