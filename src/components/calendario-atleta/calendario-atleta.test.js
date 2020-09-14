import React from 'react';
import { shallow } from 'enzyme';
import CalendarioAtleta from './calendario-atleta';

describe('CalendarioAtleta', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CalendarioAtleta />);
    expect(wrapper).toMatchSnapshot();
  });
});
