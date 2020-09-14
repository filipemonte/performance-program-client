import React, { Component } from 'react';

import { trackPromise } from 'react-promise-tracker';
import Switch from "react-switch";
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';
import { userContext } from '../../userContext';

class ListaAtletas extends Component {
  constructor(props) {
    super(props);

    console.log()

    this.state = {
      atletas: [],
      planilhas: [],
      fetched: false,
      checked: false
    };
  }

  componentDidMount() {
    this.setState({ fetched: false })
    this.context.toggleMenu();

    trackPromise(
      fetch(`${myConfig.apiUrl}/planilhas/${authService.getCurrentUser().id}`, { headers: authHeader() })
        .then(res => res.json())
        .then((data) => {
          this.setState({ planilhas: data })
        })
        .catch(console.log)
    );
  }

  componentDidUpdate(prevState) {
    if (!this.state.fetched) {
      trackPromise(
        fetch(`${myConfig.apiUrl}/atletas/${authService.getCurrentUser().id}`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {
            this.setState({ atletas: data })
            this.setState({ fetched: true })
          })
          .catch(console.log)
      );
    }
  }

  handlePlanilhaChange(idAtleta, event)
  {
    let idNovaPlanilha = event.target.value;

    trackPromise(
      fetch(`${myConfig.apiUrl}/planilhaAtleta/${idNovaPlanilha}/${idAtleta}`, { method: 'put', headers: authHeader() })
        .then(function (response) {
          if (response.ok) {

          }
        })
        .catch(console.log)
    );

    let temp = [...this.state.atletas];
    temp.find(x => x.id == idAtleta).idplanilha = idNovaPlanilha;
    this.setState({ atletas: temp })
  }

  handleChange(id, checked) {

    let status = 'ativo';

    if (!checked) {
      status = 'cancelado';
    }

    let body = {
      status: status
    };

    body = JSON.stringify(body)

    trackPromise(
      fetch(`${myConfig.apiUrl}/statusatleta/${id}`, { method: 'PUT', headers: authHeader(), body })
        .then((data) => {
          let temp = [...this.state.atletas];
          temp.find(x => x.id == id).status = status;
          this.setState({ atletas: temp })
        })
        .catch(console.log)
    );
  }

  render() {

    return (

      <div className="card-body ">
        <table className="table-striped table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Planilha</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.atletas.map(item => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>
                  <select name="cars" id="cars" className="form-control" value={item.idplanilha} onChange={this.handlePlanilhaChange.bind(this, item.id)}>
                    {this.state.planilhas.map(optionItem => (
                      <option key={optionItem.id} value={optionItem.id}>{optionItem.nome}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <Switch
                    checked={item.status == "ativo"}
                    onChange={this.handleChange.bind(this, item.id)}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                  />
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

    );
  }
}
ListaAtletas.contextType = userContext;
export default ListaAtletas;
