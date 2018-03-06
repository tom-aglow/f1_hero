import React from 'react';
import {shallow} from 'enzyme';
import {Unwrapped as Leaderboard} from '../components/leaderboard/_Leaderboard';
import toJson from 'enzyme-to-json';

test('Leaderboard renders correctly', async () => {
  const component = shallow(<Leaderboard/>);
  expect(toJson(component)).toMatchSnapshot();
});
