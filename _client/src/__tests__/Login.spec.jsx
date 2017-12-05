import React from 'react';
import Login from '../components/Login';
import {shallow} from 'enzyme';

test('Login renders correctly', () => {
  const component = shallow(<Login/>);
  expect(component).toMatchSnapshot();
});