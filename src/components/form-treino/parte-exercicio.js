import React, { Component } from 'react';

class ParteExercicio extends Component {
  constructor(props) {
    super(props);


    this.state = {
    };


  }

  handleExcluirExercicio(idParteTreino, idExercicio) {
    this.props.onExcluirExercicio(idParteTreino, idExercicio);
  }

  handleEditarExercicio(idParteTreino, idExercicio, e) {
    e.preventDefault();
    this.props.onEditarExercicio(idParteTreino, idExercicio);
  }

  render() {

    return (
      <li className="list-group-item">
        <span className="repeticoes-exercicio">{this.props.exercicio.repeticoes}</span>  -
        <span className="exercicio"> {this.props.exercicio.exercicio}</span>  -
        <span className="peso-exercicio"> {this.props.exercicio.peso}</span>  -
        <span className="descanso"> {this.props.exercicio.descanso}</span>
        <button onClick={() => { this.handleExcluirExercicio(this.props.idParteTreino, this.props.exercicio.id) }} className="btn btn-icon-remover pull-right"><span className="glyphicon glyphicon-remove" /></button>
        <button onClick={(e) => { this.handleEditarExercicio(this.props.idParteTreino, this.props.exercicio.id, e) }} className="btn btn-icon-editar pull-right"><span className="glyphicon glyphicon-edit" /></button>
      </li>
    );
  }
}

export default ParteExercicio;