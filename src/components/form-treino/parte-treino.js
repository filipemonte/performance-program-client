import React, { Component } from 'react';
import ParteExercicio from './parte-exercicio';


class ParteTreino extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      repeticoes: '',
      exercicio: '',
      peso: '',
      descanso: '',
      linkajuda: '',
      exercicioedicao: {}
    };
  }

  handleIncluirExercicio = (idParte, e) => {
    e.preventDefault();
    this.props.onIncluirExercicio(idParte, this.state);

    this.setState({ id: 0, repeticoes: '', exercicio: '', peso: '', descanso: '', linkajuda: '', exercicioedicao: {} })
  }

  handleExcluirExercicio = (idParte, idExercicio) => {
    this.props.onExcluirExercicio(idParte, idExercicio);
  }

  handleEditarExercicio = (idParte, idExercicio) => {
    let exercicio = this.props.partetreino.exercicios.find(x => x.id === idExercicio)
    this.setState({
      id: exercicio.id,
      repeticoes: exercicio.repeticoes,
      exercicio: exercicio.exercicio,
      peso: exercicio.peso,
      descanso: exercicio.descanso,
      linkajuda: exercicio.linkajuda,
      exercicioedicao: exercicio
    })
  }

  handleCancelarEdicao = () => {
    this.setState({ id: 0, repeticoes: '', exercicio: '', peso: '', descanso: '', linkajuda: '', exercicioedicao: {} })
  }

  handleSalvarEdicao = (idParte) => {
    this.props.onEditarExercicio(idParte, this.state);
    this.setState({ id: 0, repeticoes: '', exercicio: '', peso: '', descanso: '', linkajuda: '', exercicioedicao: {} })
  }

  handleExcluirParteTreino = (idParte) => {
    this.props.onExcluirParteTreino(idParte);
  }

  repeticoesChangeHandler = (event) => {
    this.setState({ repeticoes: event.target.value });
  }
  exercicioChangeHandler = (event) => {
    this.setState({ exercicio: event.target.value });
  }
  pesoChangeHandler = (event) => {
    this.setState({ peso: event.target.value });
  }
  descansoChangeHandler = (event) => {
    this.setState({ descanso: event.target.value });
  }
  linkajudaChangeHandler = (event) => {
    this.setState({ linkajuda: event.target.value });
  }
  descricaoParteChangeHandler = (idParte, event) => {
    this.props.onAlterarDescricaoParteTreino(idParte, event.target.value);
  }

  render() {

    let botoes;
    if (this.state.id > 0) {
      botoes = <div className="btns-edicao">
        <button onClick={() => { this.handleCancelarEdicao() }} className="btn btn-secondary">Cancelar</button>
        <button onClick={() => { this.handleSalvarEdicao(this.props.partetreino.id) }} className="btn btn-primary">Salvar</button>
      </div>
    }
    else {
      botoes = <button id="add-Btn" onClick={(e) => { this.handleIncluirExercicio(this.props.partetreino.id, e) }} className="btn btn-primary btn-add-exercicio">Adicionar</button>
    }

    let descricaoParteTreino = '';
    if (this.props.partetreino.descricao.length > 0) {
      descricaoParteTreino = ` - ${this.props.partetreino.descricao}`
    }

    return (
      <div  className="parte-treino" data-title="Parte A">
        <h6 style={{ marginTop: '10px' }} className="card-title">
          <span>{this.props.partetreino.titulo}{descricaoParteTreino}</span>
          <button onClick={() => { this.handleExcluirParteTreino(this.props.partetreino.id) }} className="btn btn-icon-remover pull-right"><span className="glyphicon glyphicon-remove" /></button>
        </h6>
        <div className="form-group form-inline container-exercicio-formatado">
          <input placeholder="Descrição Parte Treino" type="text" className="form-control mx-sm-9 col-md-9 descricao-parte" value={this.props.partetreino.descricao} onChange={(e) => this.descricaoParteChangeHandler(this.props.partetreino.id, e)} />
        </div>
        {/* <div>
          <label htmlFor="exercicio-formatado"><input type="radio" className="exercicio-formatado" id="exercicio-formatado" name="tipo-exercicio" defaultValue="exercicio-formatado" defaultChecked /> Formatado</label>
          <label htmlFor="exercicio-livre"><input type="radio" className="exercicio-livre" id="exercicio-livre" name="tipo-exercicio" defaultValue="exercicio-livre" /> Livre</label>
        </div> */}
        <div>
          <div className="form-group form-inline container-exercicio-formatado">
            <input placeholder="Repetições" type="text" className="form-control mx-sm-2 col-md-2 repeticoes" value={this.state.repeticoes} onChange={this.repeticoesChangeHandler} />
            <input placeholder="Exercício" type="text" className="form-control mx-sm-2 col-md-7 exercicio ui-autocomplete-input" value={this.state.exercicio} autoComplete="off" onChange={this.exercicioChangeHandler} />
            <input placeholder="Peso" type="text" className="form-control mx-sm-2 col-md-2 peso" value={this.state.peso} onChange={this.pesoChangeHandler} />
            <br /><br /><br />
            <input placeholder="Tempo Descanso" type="text" className="form-control mx-sm-2 col-md-2 descanso" value={this.state.descanso} onChange={this.descansoChangeHandler} />
            <input placeholder="Link Ajuda" type="text" className="form-control mx-sm-2 col-md-7 link-ajuda" value={this.state.linkajuda} onChange={this.linkajudaChangeHandler} />
          </div>
          {/* <div className="form-group form-inline container-exercicio-livre hide">
            <textarea className="exericio-campo-livre col-md-12 form-control" style={{ maxHeight: '150px' }} rows={6} defaultValue={""} />
          </div> */}
          <input type="hidden" className="idEdicao" />
          {botoes}
        </div>
        <ul className="list-group lista-exercicios">
          {this.props.partetreino.exercicios.map(item => (
            <ParteExercicio key={item.id}
              idParteTreino={this.props.partetreino.id}
              exercicio={item}
              exercicioedicao={this.state.exercicioedicao}
              onExcluirExercicio={this.handleExcluirExercicio}
              onEditarExercicio={this.handleEditarExercicio}>
            </ParteExercicio>
          ))}
        </ul>
      </div>
    );
  }
}

export default ParteTreino;