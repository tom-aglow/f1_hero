import r from 'Root/jest/utils/renderer';
import { sel } from 'Root/jest/utils/functions';
import SearchBar from './index';

const defaultProps = {
	searchTerm: '',
	onChange() {}
};

r.init(SearchBar, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render(null, true);
	expect(wrapper).toMatchSnapshot();
});

it('displays passed search term', () => {
	const searchTerm = 'foo';
	const wrapper = r.render({ searchTerm }, true);
	const { value } = wrapper.find(sel('searchInput')).props();

	expect(value).toBe(searchTerm);
});

it('calls provided callback when the value is changed', () => {
	const onChange = jest.fn();
	const wrapper = r.render({ onChange }, true);
	const input = wrapper.find(sel('searchInput'));

	input.simulate('change');
	expect(onChange).toHaveBeenCalledTimes(1);
});
