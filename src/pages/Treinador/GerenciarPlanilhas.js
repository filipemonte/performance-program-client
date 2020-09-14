import React from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import { trackPromise } from 'react-promise-tracker';
import { Link } from 'react-router-dom'
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';
import { userContext } from '../../userContext';

class GerenciarPlanilhas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      planilhas: [],
      fetched: false
    };
  }
  componentDidMount() {
    this.setState({ fetched: false })
    this.context.toggleMenu();
  }

  componentDidUpdate(prevState) {
    if (!this.state.fetched) {
      trackPromise(
        fetch(`${myConfig.apiUrl}/planilhas/${authService.getCurrentUser().id}`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {
            this.setState({ planilhas: data })
            this.setState({ fetched: true })
          })
          .catch(console.log)
      );
    }
  }

  handleRemoveClick(id, e) {
    e.preventDefault()
    trackPromise(
      fetch(`${myConfig.apiUrl}/planilha/${authService.getCurrentUser().id}/${id}`, { method: 'delete', headers: authHeader() })
        .then(function (response) {
          if (response.ok) {
            window.location.reload(false);
          }
        })
        .catch(console.log)
    );
  }


  render() {
    return (
      <div>
        <Menu></Menu>
        <div className="main-panel">
          <Navbar></Navbar>
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="card ">
                  <div className="card-header ">
                    <Link className="btn btn-primary pull-right" to="/incluirplanilha" >
                      Incluir Planilha
                    </Link>
                    <h5 className="card-title">Planilhas</h5>
                  </div>
                  <div className="card-body ">
                    <ul id="list" className="list-group">

                      {this.state.planilhas.map(item => (
                        <li key={item.id} className="list-group-item">
                          {item.nome}
                          <Link className="btn btn-icon-adicionar pull-right" to={`/editarplanilha/${item.id}`}>
                            <span className="glyphicon glyphicon-edit" />
                          </Link>
                          <a href="#" className="btn btn-icon-remover pull-right" onClick={this.handleRemoveClick.bind(this, item.id)}><span className="glyphicon glyphicon-remove" /></a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
GerenciarPlanilhas.contextType = userContext;

export default GerenciarPlanilhas;

