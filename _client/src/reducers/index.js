import { combineReducers } from 'redux';
import races from './racesReducer';
import selectedRace from './selectedRacesReducer';
import drivers from './driversReducer';
import header from './headerReducer';

export default combineReducers({
	races,
	selectedRace,
	drivers,
	header
});
