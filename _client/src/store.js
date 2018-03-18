/* eslint-disable no-underscore-dangle */
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import dataReducer from './data/reducer';
import servicesReducer from './services/reducer';

export const appReducer = combineReducers({
	data: dataReducer,
	services: servicesReducer
});

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;

const enhancer = composeEnhancers(applyMiddleware(reduxThunk));

const store = createStore(appReducer, enhancer);

export default store;
