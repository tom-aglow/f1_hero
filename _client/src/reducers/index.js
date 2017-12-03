import { combineReducers } from 'redux';
import auth from './authReducer';
import races from './racesReducer';
import selectedRace from './selectedRacesReducer';
import drivers from './driversReducer';

export default combineReducers({
  auth,
  races,
  selectedRace,
  drivers
});
