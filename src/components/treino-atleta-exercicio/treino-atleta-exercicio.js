import React, { Component } from 'react';
import { userContext } from '../../userContext';

class TreinoAtletaExercicio extends Component {
  static contextType = userContext;

  render() {

    var descricaoParteTreino = ""

    if (this.props.item[1][0].descricaopartetreino != null)
    {
      descricaoParteTreino = ` - ${this.props.item[1][0].descricaopartetreino}` 
    }

    return (
      <div className="parte-treino">
        <h6 className="card-title">{this.props.item[0]}{descricaoParteTreino}</h6>
        <Exercicio list={this.props.item[1]}></Exercicio>
      </div>
    );
  }
}


function Exercicio({ list }) {
  if (!list || !list.length) {
    return (
      <div className="">
        Nenhum exercício cadastrado
      </div>
    );
  }
  else {
    return (
      <ul>
        {list.map(item => (
          <li key={item.idexercicio} className="exercicio">
            <span>{item.repeticoes}</span>
            <span>{item.exercicio}
              <span className="ajuda-exercicio">{item.linkajuda}</span>
            </span>
            <span>Peso: {item.peso}</span>
            <span>{item.pesocalculado}</span>
            <span>Descanso: {item.descanso}</span>
          </li>
        ))}
      </ul>
    );


  }
}


export default TreinoAtletaExercicio;
