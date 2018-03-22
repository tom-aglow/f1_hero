import r from 'Root/jest/utils/renderer';
import leaderboardSample from 'JestClient/samples/leaderboard';
import { mapStateToProps, LeaderboardContainer } from './container';

const initialState = {
	data: {
		leaderboard: leaderboardSample
	}
};

const defaultProps = {
	scores: mapStateToProps(initialState),
	updatePageHeading: jest.fn(),
	getUsersScores: jest.fn()
};

it('maps redux state to component props', () => {
	const scores = mapStateToProps(initialState);

	expect(scores).toMatchObject(leaderboardSample);
});

it('triggers actions when it mounts', () => {
	r.init(LeaderboardContainer, defaultProps);
	r.render({}, true, { disableLifecycleMethods: false });

	expect(defaultProps.updatePageHeading).toHaveBeenCalledTimes(1);
	expect(defaultProps.getUsersScores).toHaveBeenCalledTimes(1);
});
