import React, { Component } from 'react';
import { userContext } from '../../userContext';
import ModalAjuda from './modal-ajuda';


class TreinoAtletaExercicio extends Component {
  static contextType = userContext;

  constructor() {
    super()
    this.state = {
      isOpen: false
    }
    this.openModal = this.openModal.bind(this)
  }

  openModal(e) {
    e.preventDefault()
    this.setState({ isOpen: true })
  }

  render() {

    var descricaoParteTreino = ""

    var exercicios = ""

    if (this.props.item[1][0].descricaopartetreino != null) {
      descricaoParteTreino = ` - ${this.props.item[1][0].descricaopartetreino}`
    }

    if (!this.props.item[1] || !this.props.item[1].length) {
      exercicios = <div className="">
        Nenhum exercício cadastrado
                    </div>
    }
    else {
      exercicios =
        <ul>
          {this.props.item[1].map(item => (
            <li key={item.idexercicio} className="exercicio">
              <span>{item.repeticoes}</span>
              <span>{item.exercicio}
              <ModalAjuda linkAjuda={item.linkajuda}></ModalAjuda>
              </span>
              <span>Peso: {item.peso}</span>
              <span>{item.pesocalculado}</span>
              <span>Descanso: {item.descanso}</span>
            </li>
          ))}
        </ul>
    }

    return (
      <div className="parte-treino">
        <h6 className="card-title">{this.props.item[0]}{descricaoParteTreino}</h6>
        {exercicios}
      </div>
    );
  }
}


export default TreinoAtletaExercicio;
