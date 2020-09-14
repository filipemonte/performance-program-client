import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Link } from 'react-router-dom'
import moment from 'moment'
import PersonalRecordChart from '../../components/personal-record-chart';
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';

import './personal-record-history.css';

class PeronalRecordHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prs: [],
      fetched: false
    };
  }

  render() {
    return (
      <div className="col-md-5">
        <div className="card ">
          <div className="card-header ">
            <h5 className="card-title">Histórico</h5>
          </div>
          <div className="card-body ">
            <div className="col-md-12">

              <PersonalRecordChart idExercicio={this.props.idExercicio}></PersonalRecordChart>
            </div>

            <ListaPRHistory history={this.props.history} idExercicio={this.props.idExercicio} ></ListaPRHistory>
          </div>
        </div>
      </div>
    );
  }
}


class ListaPRHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prs: [],
      fetched: false
    };
  }

  handleClick(idexercicio) {
    trackPromise(
      fetch(`${myConfig.apiUrl}/prhistory/${authService.getCurrentUser().id}/${idexercicio}`, { method: 'delete', headers: authHeader() })
        .then(function (response) {
          if (response.ok) {
            window.location.reload(false);
          }
        })
        .catch(console.log)
    );
  }

  render() {
    if (!this.props.history || !this.props.history.length) {
      return (
        <ul id="list" className="list-group lista-pr">
          <li key="0" className="list-group-item">
            Nenhum PR cadastrado
          </li>
        </ul>
      );
    }
    else {
      return (
        <div>

          <ul id="list" className="list-group lista-pr">
            {this.props.history.map(item => (
              <li key={item.id} className="list-group-item">
                <span className="movimento">{moment(item.data, 'YYYY-MM-DD').format('DD/MM/YYYY')}</span>

                <button onClick={() => this.handleClick(item.id)} className="btn btn-icon-remover pull-right" >
                  <span className="glyphicon glyphicon-remove" />
                </button>
                <span className="resultado-pr pull-right">{item.resultado} lb</span>
              </li>

            ))}
          </ul>
        </div>

      );


    }
  }
}


export default PeronalRecordHistory;
