import leaderboardSample from 'JestClient/samples/leaderboard';
import { mapStateToProps } from './container';

const initialState = {
	data: {
		leaderboard: leaderboardSample
	}
};

it('maps redux state to component props', () => {
	const scores = mapStateToProps(initialState);

	expect(scores).toMatchObject(leaderboardSample);
});
