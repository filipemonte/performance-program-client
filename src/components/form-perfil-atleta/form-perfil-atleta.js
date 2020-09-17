import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';
import { userContext } from '../../userContext';


class FormPerfilAtleta extends Component {
  constructor(props) {
    super(props);

    this.state = {
      perfil: {},
      nome: "",
      email: "",
      endereco: "",
      bairro: "",
      estado: "",
      cep: "",
      senha: "",

      updated: false
    };
  }

  componentDidMount()
  {
    this.setState({ updated: false })
  }
  
  componentDidUpdate(prevState) {
    if (!this.state.updated) {
      trackPromise(
        fetch(`${myConfig.apiUrl}/atleta/${authService.getCurrentUser().id}`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {
            if (data.auth !== undefined && data.auth === false)
            {
              this.context.logoutUser()
            }
            
            if (data.nome)
            {
              this.setState({ nome: data.nome })
            }
            if (data.email)
            {
              this.setState({ email: data.email })
            }
            if (data.endereco)
            {
              this.setState({ endereco: data.endereco })
            }
            if(data.bairro)
            {
              this.setState({ bairro: data.bairro })
            }
            if(data.estado)
            {
              this.setState({ estado: data.estado })
            }
            if(data.cep)
            {
              this.setState({ cep: data.cep })
            }
            this.setState({ updated: true })
          })
          .catch(console.log)
      );
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const body = JSON.stringify(Object.fromEntries(new FormData(e.target)));
    
    trackPromise(
      fetch(`${myConfig.apiUrl}/atleta/${authService.getCurrentUser().id}`, {method: 'PUT', headers: authHeader(), body})
        .then(res => res.json())
        .then((data) => {
          if (data.auth !== undefined && data.auth === false)
          {
            this.context.logoutUser()
          }
        })
        .catch(console.log)
    );
  }

  nomeChangeHandler = (event) => {
    this.setState({ nome: event.target.value });
  }
  emailChangeHandler = (event) => {
    this.setState({ email: event.target.value });
  }
  senhaChangeHandler = (event) => {
    this.setState({ senha: event.target.value });
  }
  enderecoChangeHandler = (event) => {
    this.setState({ endereco: event.target.value });
  }
  bairroChangeHandler = (event) => {
    this.setState({ bairro: event.target.value });
  }
  estadoChangeHandler = (event) => {
    this.setState({ estado: event.target.value });
  }
  cepChangeHandler = (event) => {
    this.setState({ cep: event.target.value });
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card" id="card-cadastrar-treino">
          <div className="card-header ">
            <h5 className="card-title">Perfil</h5>
          </div>
          <div className="card-body ">
            <h6 style={{ marginTop: '10px' }} className="card-title" />
            <form  onSubmit={this.handleSubmit}>
              <input data-val="true" data-val-number="The field Id must be a number." data-val-required="The Id field is required." id="Id" name="Id" type="hidden" defaultValue={2} />                        <div className=" col-md-10">
              <div className="form-group form-inline">
                <label htmlFor="Nome" className="col-md-4">Nome:</label>
                <input className="form-control col-md-8" id="Nome" name="Nome" placeholder="Nome" required="required" type="text" value={this.state.nome} onChange={this.nomeChangeHandler} />
                <div className="invalid-feedback offset-2">
                  O campo nome é obrigatório
                  </div>
              </div>
              <div className="form-group form-inline">
                <label htmlFor="Email" className="col-md-4">Email:</label>
                <input className="form-control col-md-8" id="Email" name="Email" placeholder="Email" required="required" type="text" value={this.state.email} onChange={this.emailChangeHandler} />
                <div className="invalid-feedback offset-2">
                  O campo email é obrigatório
                  </div>
              </div>
              <div className="form-group form-inline">
                <label htmlFor="Senha" className="col-md-4">Senha:</label>
                <input className="form-control col-md-8" id="Senha" name="Senha" placeholder="Senha" required="required" type="password" onChange={this.senhaChangeHandler} />
                <div className="invalid-feedback offset-2">
                  O campo senha é obrigatório
                  </div>
              </div>
              <div className="form-group form-inline">
                <label htmlFor="Endereco" className="col-md-4">Endereço:</label>
                <input className="form-control col-md-8" id="Endereco" name="Endereco" placeholder="Endereço" type="text" value={this.state.endereco} onChange={this.enderecoChangeHandler} />
              </div>
              <div className="form-group form-inline">
                <label htmlFor="Bairro" className="col-md-4">Bairro:</label>
                <input className="form-control col-md-8" id="Bairro" name="Bairro" placeholder="Bairro" type="text" value={this.state.bairro} onChange={this.bairroChangeHandler} />
              </div>
              <div className="form-group form-inline">
                <label htmlFor="Estado" className="col-md-4">Estado:</label>
                <input className="form-control col-md-8" id="Estado" name="Estado" placeholder="Estado" type="text" value={this.state.estado} onChange={this.estadoChangeHandler} />
              </div>
              <div className="form-group form-inline">
                <label htmlFor="Cep" className="col-md-4">Cep:</label>
                <input className="form-control col-md-8" id="Cep" name="Cep" placeholder="Cep" type="text" value={this.state.cep} onChange={this.cepChangeHandler} />
              </div>
              <button id="btn-salvar-treino" type="submit" className="btn btn-primary pull-right">Salvar</button>
              <a href="/" className="btn btn-secondary pull-right">Cancelar</a>
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

FormPerfilAtleta.contextType = userContext;
export default FormPerfilAtleta;
