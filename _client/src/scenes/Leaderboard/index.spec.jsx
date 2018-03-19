import r from 'Root/jest/utils/renderer';
import leaderboardSample from 'Root/jest/samples/leaderboard';
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
