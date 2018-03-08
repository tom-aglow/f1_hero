import React from 'react';
import toJson from 'enzyme-to-json';
import Login from '../components/Login';
import { shallow } from 'enzyme';

test('Login renders correctly', () => {
	const component = shallow(<Login />);
	expect(toJson(component)).toMatchSnapshot();
});
