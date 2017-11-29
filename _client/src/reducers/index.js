import { combineReducers } from 'redux';
import authReducer from './authReducer';
import racesReducer from "./racesReducer";
import selectedRaceReducer from "./selectedRacesReducer";

export default combineReducers({
	auth: authReducer,
	races: racesReducer,
	selectedRace: selectedRaceReducer
});

