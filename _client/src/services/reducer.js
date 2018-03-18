import { combineReducers } from 'redux';
import { reducer as pageReducer } from './page/reducer';

export default combineReducers({
	page: pageReducer
});
