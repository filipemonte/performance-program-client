import React from 'react';
import { shallow } from 'enzyme';
import TreinoAtleta from './treino-atleta';

describe('TreinoAtleta', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<TreinoAtleta />);
    expect(wrapper).toMatchSnapshot();
  });
});
