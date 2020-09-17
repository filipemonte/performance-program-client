import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Link } from 'react-router-dom'
import PersonalRecordChart from '../../components/personal-record-chart';

import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';
import { userContext } from '../../userContext';


import './personal-record.css';




class personalRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prs: [],
      fetched: false
    };
  }

  componentDidMount() {
    this.setState({ fetched: false })
  }

  componentDidUpdate(prevState) {
    if (!this.state.fetched) {
      trackPromise(
        fetch(`${myConfig.apiUrl}/personalrecord/${authService.getCurrentUser().id}`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {
            if (data.auth !== undefined && data.auth === false)
            {
              this.context.logoutUser()
            }
            
            this.setState({ prs: data })
            this.setState({ fetched: true })
          })
          .catch(console.log)
      );
    }
  }

  render() {
    return (
        <div className="card-body ">
          <ListaPR param={this.state.prs} ></ListaPR>
        </div>
    );
  }
}

function ListaPR(param) {
  if (!param.param || !param.param.length) {
    return (
      <h5 className="card-title">Nenhum movimento padrão cadastrado</h5>
    );
  }
  else {
    return (
      <ul id="list" className="list-group lista-pr">
        {param.param.map(item => (
          <li key={item.id} className="list-group-item">
            <span className="movimento ">{item.nome}</span>
            <Link to={`/prdetail/${item.id}`} className="btn btn-icon-adicionar pull-right" >
              <span className="glyphicon glyphicon-edit" />
            </Link>
            {item.resultado != null ? (
              <span className="resultado-pr pull-right ">{item.resultado} lb</span>
            ) : (
                <span className="resultado-pr pull-right "></span>
              )}

            {item.resultado != null ? (
              <div className="col-md-4 pull-right chart-pr">
                <PersonalRecordChart idExercicio={item.id}></PersonalRecordChart>
              </div>
            ) : (
                <div className="col-md-4 pull-right">
                </div>
              )}

          </li>

        ))}
      </ul>

    );


  }
}

personalRecord.contextType = userContext;
export default personalRecord;
