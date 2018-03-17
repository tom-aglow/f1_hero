import { combineReducers } from 'redux';
import { reducer as usersReducer } from './users/reducer';
import { reducer as leaderboardReducer } from './leaderboard/reducer';
import { reducer as racesReducer } from './races/reducer';
import { reducer as driverReducer } from './drivers/reducer';

export default combineReducers({
	users: usersReducer,
	leaderboard: leaderboardReducer,
	races: racesReducer,
	drivers: driverReducer
});
