import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Link } from 'react-router-dom'
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';

class FormPlanilha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      tipo: "",
      descricao: "",
      valor: "",
      fetched: false,
      edicao: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    this.setState({ fetched: false })
  }

  componentDidUpdate(prevState) {
    if (this.props.idPlanilha != undefined && !this.state.fetched) {
      trackPromise(
        fetch(`${myConfig.apiUrl}/planilha/${this.props.idPlanilha}`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {
            if (data.nome) {
              this.setState({ nome: data.nome })
            }
            if (data.tipo) {
              this.setState({ tipo: data.tipo })
            }
            if (data.descricao) {
              this.setState({ descricao: data.descricao })
            }
            if (data.valor) {
              this.setState({ valor: data.valor })
            }

            this.setState({ edicao: true })
            this.setState({ fetched: true })
          })
          .catch(console.log)
      );
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let body = Object.fromEntries(new FormData(e.target));
    body = JSON.stringify(body);

    if (this.state.edicao) {
      trackPromise(
        fetch(`${myConfig.apiUrl}/planilha/${e.target.elements.idPlanilha.value}`, { method: 'put', headers: authHeader(), body })
          .then(function (response) {
            if (response.ok) {
              window.location.href = '/gerenciarplanilhas';
            }
          })
          .catch(console.log)
      );

    }
    else {
      trackPromise(
        fetch(`${myConfig.apiUrl}/planilha/${authService.getCurrentUser().id}`, { method: 'post', headers: authHeader(), body })
          .then(function (response) {
            if (response.ok) {
              window.location.href = '/gerenciarplanilhas';
            }
          })
          .catch(console.log)
      );
    }

  }

  nomeChangeHandler = (event) => {
    this.setState({ nome: event.target.value });
  }
  tipoChangeHandler = (event) => {
    this.setState({ tipo: event.target.value });
  }
  descricaoChangeHandler = (event) => {
    this.setState({ descricao: event.target.value });
  }
  valorChangeHandler = (event) => {
    this.setState({ valor: event.target.value });
  }

  render() {

    let labelTitulo;
    let btnSalvar;
    let hiddenIdPlanilha;
    if (this.props.idPlanilha == undefined) {
      labelTitulo = <h5 className="card-title">Incluir Planilha</h5>
      btnSalvar = <button id="btn-salvar-treino" type="submit" className="btn btn-primary pull-right">Salvar</button>
    }
    else {
      labelTitulo = <h5 className="card-title">Editar Planilha</h5>
      hiddenIdPlanilha = <input type="hidden" id="idPlanilha" name="idPlanilha" value={this.props.idPlanilha}></input>
      btnSalvar = <button id="btn-salvar-treino" type="submit" className="btn btn-primary pull-right">Editar</button>
    }

    return (
      <div className="col-md-12">
        <div className="card" id="card-cadastrar-treino">
          <div className="card-header ">
            {labelTitulo}
          </div>
          <div className="card-body ">
            <h6 style={{ marginTop: '10px' }} className="card-title" />
            <form onSubmit={this.handleSubmit}>
              <div className=" col-md-10">
                <div className="form-group form-inline">
                  <label htmlFor="Nome" className="col-md-2">Nome:</label>
                  <input className="form-control col-md-10" id="nome" name="nome" placeholder="Nome" required="required" type="text" value={this.state.nome} onChange={this.nomeChangeHandler} />
                  <div className="invalid-feedback offset-2">
                    O campo nome é obrigatório
                  </div>
                </div>
                <div className="form-group form-inline ">
                  <label htmlFor="tipo" className="col-md-2">Tipo:</label>
                  <select className="form-control col-md-10" id="tipo" name="tipo" required="required" value={this.state.tipo} onChange={this.tipoChangeHandler}>
                    <option value />
                    <option value="personalizada">Personalizada</option>
                    <option value="generica">Generica</option>
                  </select>

                  <div className="invalid-feedback offset-2">
                    O campo tipo é obrigatório
                  </div>
                </div>
                <div className="form-group form-inline">
                  <label htmlFor="descricao" className="col-md-2">Descrição:</label>
                  <input className="form-control col-md-10" id="descricao" name="descricao" placeholder="Descrição da planilha" required="required" type="text" value={this.state.descricao} onChange={this.descricaoChangeHandler} />
                  <div className="invalid-feedback offset-2">
                    O campo descriçao é obrigatório
                  </div>
                </div>
                <div className="form-group form-inline">
                  <label htmlFor="valor" className="col-md-2">Valor:</label>
                  <input className="form-control col-md-10" id="valor" name="valor" placeholder="Valor da planilha" type="text" value={this.state.valor} onChange={this.valorChangeHandler} />
                  <div className="invalid-feedback offset-2">
                    O campo descriçao é obrigatório
                  </div>
                </div>

                {btnSalvar}
                {hiddenIdPlanilha}
                <Link to={`/gerenciarplanilhas`} className="btn btn-secondary pull-right" >
                  Cancelar
                </Link>

              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FormPlanilha;