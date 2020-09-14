import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import moment from 'moment'
import { myConfig } from '../../config';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';

class PeronalRecordForm extends Component {


  constructor(props) {
    super(props);

    this.state = {
      dataPR: '',
      dataPRTela: '',
    };
  }

  dataChangeHandler = date => {
    this.setState({
      dataPRTela: date,
      dataPR: moment(date).format('YYYY-MM-DD')
    });
  };

  handleSubmit(idExercicio, e) {
    e.preventDefault();
    var body = JSON.stringify(Object.fromEntries(new FormData(e.target)));

    body = JSON.parse(body);
    body.DataPR = this.state.dataPR;

    body = JSON.stringify(body);
    trackPromise(
      fetch(`${myConfig.apiUrl}/prhistory/${authService.getCurrentUser().id}/${idExercicio}`, { method: 'post', headers: authHeader(), body })
        .then(function (response) {
          if(response.ok) {
            window.location.reload(false);
          }
        })
        .catch(console.log)
    );
  }

  render() {
    return (
      <div className="col-md-7">
        <div className="card ">
          <div className="card-header ">
            <h5 className="card-title">Incluir</h5>
          </div>
          <div className="card-body ">
            <form onSubmit={(e) => this.handleSubmit(this.props.idExercicio, e)}>
              <div className="form-group form-inline">
                <label htmlFor="data-pr" className="col-md-2">Data:</label>
                {/* <input type="text" autoComplete="false" className="datepicker form-control col-md-10 hasDatepicker" id="DataPR" name="DataPR" placeholder="Data do PR" /> */}
                <DatePicker dateFormat="dd/MM/yyyy"  className="form-control" id="DataPR" name="DataPR" selected={this.state.dataPRTela} onChange={this.dataChangeHandler} placeholder="Data do Treino"/>
              </div>
              <div className="form-group form-inline">
                <label htmlFor="resultado-pr" className="col-md-2">Resultado:</label>
                <input type="text" className="form-control col-md-10" placeholder="Resultado" id="ResultadoPR" name="ResultadoPR" />
              </div>
              <div id="msg-erro" className="alert alert-danger hide" />
              <button id="btn-salvar-pr" type="submit" className="btn btn-primary pull-right">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PeronalRecordForm;
