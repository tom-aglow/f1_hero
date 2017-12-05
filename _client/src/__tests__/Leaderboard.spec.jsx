import React from 'react';
import {shallow} from 'enzyme';
import {Unwrapped as Leaderboard} from '../components/leaderboard/_Leaderboard';

test('Leaderboard renders correctly', async () => {
  const component = shallow(<Leaderboard/>);
  expect(component).toMatchSnapshot();
});