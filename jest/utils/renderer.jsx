/* eslint-disable no-use-before-define */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import dataReducer from 'App/data/reducer';
import servicesReducer from 'App/services/reducer';

const appReducer = combineReducers({
	data: dataReducer,
	services: servicesReducer
});
const enhancer = compose(applyMiddleware(reduxThunk));
const store = createStore(appReducer, enhancer);

let component;
let defaultProps;

function init(_component, _defaultProps) {
	component = _component;
	defaultProps = _defaultProps;
}

function render(props = {}, isShallow = false) {
	const propsToUse = {
		...defaultProps,
		...props
	};

	if (isShallow) {
		return shallow(React.createElement(component, propsToUse), {
			disableLifecycleMethods: true
		});
	}

	return mount(
		<Provider store={store}>
			<StaticRouter context={{}}>
				{React.createElement(component, propsToUse)}
			</StaticRouter>
		</Provider>
	);
}

const renderer = {
	init,
	render
};

module.exports = renderer;
