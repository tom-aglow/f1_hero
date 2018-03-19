/* eslint-disable no-use-before-define */
const React = require('react');
const { mount, shallow } = require('enzyme');

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

	return mount(React.createElement(component, propsToUse));
}

const renderer = {
	init,
	render
};

module.exports = renderer;
