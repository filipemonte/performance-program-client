import React from 'react';
import { shallow } from 'enzyme';
import TreinoAtleta from './treino-atleta-exercicio';
import TreinoAtletaExercicio from './treino-atleta-exercicio';

describe('TreinoAtletaExercicio', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<TreinoAtletaExercicio />);
    expect(wrapper).toMatchSnapshot();
  });
});
