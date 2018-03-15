import { combineReducers } from 'redux';
import { reducer as usersReducer } from './users/reducer';
import { reducer as leaderboardReducer } from './leaderboard/reducer';

export default combineReducers({
	users: usersReducer,
	leaderboard: leaderboardReducer
});
