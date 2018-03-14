import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import dataReducer from './data/reducer';

const appReducer = combineReducers({
	data: dataReducer
});

const devTools = () =>
	typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
		? window.devToolsExtension()
		: f => f;

const enhancer = compose(applyMiddleware(reduxThunk), devTools());

const store = createStore(appReducer, enhancer);

export default store;
