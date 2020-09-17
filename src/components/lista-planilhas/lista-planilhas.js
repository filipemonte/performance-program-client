import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Link } from 'react-router-dom'
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';
import { userContext } from '../../userContext';


class ListaPlanilhas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personalizadas: [],
      genericas: [],
      fetched: false
    };
  }
  componentDidMount() {
    this.setState({ fetched: false })
  }

  componentDidUpdate(prevState) {
    if (!this.state.fetched) {
      trackPromise(
        fetch(`${myConfig.apiUrl}/planilhasatleta/${authService.getCurrentUser().id}`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {
            if (data.auth !== undefined && data.auth === false)
            {
              this.context.logoutUser()
            }
            
            let personalizadas = data.filter((p) => {
              return p.tipo === 'personalizada';
            })

            this.setState({ personalizadas: personalizadas })

            let genericas = data.filter((p) => {
              return p.tipo === 'generica';
            })

            const genericasDistinct = [];
            const map = new Map();
            for (const item of genericas) {
              if (!map.has(item.idplanilha)) {
                map.set(item.idplanilha, true);    // set any value to Map
                genericasDistinct.push({
                  idplanilha: item.idplanilha,
                  idatleta: 0,
                  idplanilhaatleta: 0,
                  planilha: item.planilha,
                  tipo: item.tipo
                });
              }
            }


            this.setState({ genericas: genericasDistinct })
            this.setState({ fetched: true })
          })
          .catch(console.log)
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="card ">
            <div className="card-header ">
              <h5 className="card-title">Programas</h5>
            </div>
            <div className="card-body ">
              <ul id="list" className="list-group">
                {this.state.genericas.map(item => (
                  <li key={item.idplanilha} className="list-group-item">
                    {item.planilha}
                    <Link to={`/cadastrartreino/${item.idplanilha}/${item.idplanilhaatleta}`} className="btn btn-icon-adicionar pull-right">
                      <span className="glyphicon glyphicon-plus" />
                    </Link>
                    <Link to={`/programacaoplanilha/${item.idplanilha}`} className="btn btn-icon-adicionar pull-right">
                      <span className="glyphicon glyphicon-calendar" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card-chart">
            <div className="card-header">
              <h5 className="card-title">Planilhas Personalizadas</h5>
            </div>
            <div className="card-body">
              <ul id="list" className="list-group">
                {this.state.personalizadas.map(item => (
                  <li key={item.idatleta} className="list-group-item">
                    <span className="nome-atleta">{item.nome}</span>
                    <Link to={`/cadastrartreino/${item.idplanilha}/${item.idplanilhaatleta}`} className="btn btn-icon-adicionar pull-right">
                      <span className="glyphicon glyphicon-plus" />
                    </Link>
                    <Link to={`/programacaoatleta/${item.idatleta}`} className="btn btn-icon-adicionar pull-right">
                      <span className="glyphicon glyphicon-calendar" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ListaPlanilhas.contextType = userContext;
export default ListaPlanilhas;
