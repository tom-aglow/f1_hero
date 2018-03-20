import r from 'Root/jest/utils/renderer';
import leaderboardSample from 'JestClient/samples/leaderboard';
import { sel } from 'JestClient/functions';

import Leaderboard from './index';
import ScoreRow from './ScoreRow';

const defaultProps = {
	scores: leaderboardSample.scores
};

r.init(Leaderboard, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render(null, true);
	expect(wrapper).toMatchSnapshot();
});

it('renders correct amount of users scores', () => {
	const wrapper = r.render(null, true);
	const rows = wrapper.find(ScoreRow);

	expect(rows).toHaveLength(defaultProps.scores.length);
});

it('does not renders scores if array is empty', () => {
	const wrapper = r.render({ scores: [] }, true);
	const rows = wrapper.find(ScoreRow);

	expect(rows).toHaveLength(0);
});

it('filters score list according to provided search term', () => {
	const searchTerm = 'Jo';
	const wrapper = r.render(null, false);

	const input = wrapper.find(sel('searchInput'));
	input.simulate('change', { target: { value: searchTerm } });

	const rows = wrapper.update().find(ScoreRow);
	const newScores = defaultProps.scores.filter(
		({ user }) => user.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
	);

	expect(rows).toHaveLength(newScores.length);
});
