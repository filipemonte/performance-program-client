import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import './form-perfil-treinador.css';
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';
import { userContext } from '../../userContext';

class FormPerfilTreinador extends Component {
  constructor(props) {
    super(props);

    this.state = {
      perfil: {},
      nomecoach: "",
      logo: "",
      nomeprograma: "",
      descricaotrabalho: "",
      selectedFile: null,
      labelArquivo: "Escolha o arquivo",
      updated: false
    };
  }

  componentDidMount() {
    this.setState({ updated: false })
  }

  componentDidUpdate(prevState) {
    if (!this.state.updated) {
      trackPromise(
        fetch(`${myConfig.apiUrl}/coach/${authService.getCurrentUser().id}`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {
            if (data.auth !== undefined && data.auth === false)
            {
              this.context.logoutUser()
            }
            
            if (data.nomecoach) {
              this.setState({ nomecoach: data.nomecoach })
            }
            if (data.nomeprograma) {
              this.setState({ nomeprograma: data.nomeprograma })
            }
            if (data.descricaotrabalho) {
              this.setState({ descricaotrabalho: data.descricaotrabalho })
            }

            this.setState({ updated: true })
          })
          .catch(console.log)
      );
    }
  }

  handleSubmit(e) {

    // if(e.target.file.files.length)
    // {
    e.preventDefault();


    let body = Object.fromEntries(new FormData(e.target));
    delete body.file;
    body = JSON.stringify(body);

    // var formData = new FormData(e.target)

    // formData.append('file', e.target.file.files[0])
    // formData.append('body', body)


    //const body = JSON.stringify(Object.fromEntries(new FormData(e.target)));

    trackPromise(
      fetch(`${myConfig.apiUrl}/coach/${authService.getCurrentUser().id}`, { method: 'PUT', headers: authHeader(), body })
        .then(function (response) {
          if(response.ok) {
            window.location.reload(false);
          }
        })
        .catch(console.log)
    );

    // }


  }

  nomeChangeHandler = (event) => {
    this.setState({ nomecoach: event.target.value });
  }
  nomeProgramaChangeHandler = (event) => {
    this.setState({ nomeprograma: event.target.value });
  }
  descricaoTrabalhoChangeHandler = (event) => {
    this.setState({ descricaotrabalho: event.target.value });
  }
  logoChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      labelArquivo: event.target.files[0].name
    })

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
            <form onSubmit={this.handleSubmit}>
              <input data-val="true" data-val-number="The field Id must be a number." data-val-required="The Id field is required." id="Id" name="Id" type="hidden" defaultValue={2} />
              <div className=" col-md-10">
                <div className="form-group form-inline">
                  <label htmlFor="Nome" className="col-md-4">Nome:</label>
                  <input className="form-control col-md-8" id="nomecoach" name="nomecoach" placeholder="Nome" required="required" type="text" value={this.state.nomecoach} onChange={this.nomeChangeHandler} />
                  <div className="invalid-feedback offset-2">
                    O campo nome é obrigatório
                  </div>
                </div>
                {/* <div className="form-group form-inline ">
                  <label htmlFor="file" className="col-md-4">Logo:</label>
                  <label className="form-control col-md-8" htmlFor="file">{this.state.labelArquivo}</label>
                  <input type="file" name="file" onChange={this.logoChangeHandler} />
                  <div className="invalid-feedback offset-2">
                    A logo é obrigatória
                  </div>
                </div> */}
                <div className="form-group form-inline">
                  <label htmlFor="Senha" className="col-md-4">Nome Programa:</label>
                  <input className="form-control col-md-8" id="nomeprograma" name="nomeprograma" placeholder="Nome Programa" required="required" type="text" value={this.state.nomeprograma} onChange={this.nomeProgramaChangeHandler} />
                  <div className="invalid-feedback offset-2">
                    O campo senha é obrigatório
                  </div>
                </div>
                <div className="form-group form-inline">
                  <label htmlFor="Endereco" className="col-md-4">Descrição Trabalho:</label>
                  <input className="form-control col-md-8" id="descricaotrabalho" name="descricaotrabalho" placeholder="Descrição Trabalho" type="text" value={this.state.descricaotrabalho} onChange={this.descricaoTrabalhoChangeHandler} />
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

FormPerfilTreinador.contextType = userContext;
export default FormPerfilTreinador;
