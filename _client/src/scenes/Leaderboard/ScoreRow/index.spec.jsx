import r from 'Root/jest/utils/renderer';
import leaderboardSample from 'JestClient/samples/leaderboard';
import ScoreRow from './index';

const defaultProps = {
	...leaderboardSample.scores[0],
	index: 0
};

r.init(ScoreRow, defaultProps);

it('renders correctly', () => {
	const wrapper = r.render(null, true);
	expect(wrapper).toMatchSnapshot();
});
