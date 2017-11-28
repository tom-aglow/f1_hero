import { combineReducers } from 'redux';
import authReducer from './authReducer';
import racesReducer from "./racesReducer";

export default combineReducers({
	auth: authReducer,
	races: racesReducer
});

