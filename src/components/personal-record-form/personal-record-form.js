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
      resultado: '',
      idEdicao: 0
    };

   
  }

  dataChangeHandler = date => {
    this.setState({
      dataPRTela: date,
      dataPR: moment(date).format('YYYY-MM-DD')
    });
  };

  resultadoChangeHandler = event => {
    this.setState({resultado: event.target.value});
  }

  handleSubmit(idExercicio, e) {
    e.preventDefault();
    var body = JSON.stringify(Object.fromEntries(new FormData(e.target)));

    body = JSON.parse(body);
    body.DataPR = this.state.dataPR;

    let submitMethod = "post";

    if (this.state.idEdicao > 0)
    {
      body.idEdicao = this.state.idEdicao;
      submitMethod = "put";  
    }

    body = JSON.stringify(body);

    trackPromise(
      fetch(`${myConfig.apiUrl}/prhistory/${authService.getCurrentUser().id}/${idExercicio}`, { method: submitMethod, headers: authHeader(), body })
        .then(function (response) {
          if(response.ok) {
            window.location.reload(false);
          }
        })
        .catch(console.log)
    );
  }

  componentDidUpdate(prevState)
  {
    if (prevState.prEdicao.id !== this.props.prEdicao.id && this.props.prEdicao.id > 0)
    {
      this.setState({
        dataPRTela: new Date(this.props.prEdicao.data),
        dataPR: moment(new Date(this.props.prEdicao.data)).format('YYYY-MM-DD'),
        resultado: this.props.prEdicao.resultado,
        idEdicao:this.props.prEdicao.id
      });
    }

  }

  handleCancelar(e)
  {
    e.preventDefault();
    this.setState({
      dataPR: '',
      dataPRTela: '',
      resultado: '',
      idEdicao: 0
    });
  }

  render() {

    let cancelButton = "";
    if (this.state.idEdicao > 0)
    {              
      cancelButton = <button id="btn-cancelar" className="btn btn-secondary pull-right" onClick={(e) => this.handleCancelar(e)}>Cancelar</button>
    }

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
                <input type="text" className="form-control col-md-10" placeholder="Resultado" id="ResultadoPR" name="ResultadoPR" value={this.state.resultado} onChange={this.resultadoChangeHandler} />
              </div>
              <div id="msg-erro" className="alert alert-danger hide" />

              <button id="btn-salvar-pr" type="submit" className="btn btn-primary pull-right" >Salvar</button>
              {cancelButton}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PeronalRecordForm;
