import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import ParteTreino from './parte-treino';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';

class FormTreino extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataTreino: '',
      dataTreinoTela: '',
      partesTreino: [],
      fetched: false
    };

    this.handleExcluirParteClick = this.handleExcluirParteClick.bind(this);
    this.handleIncluirExercicio = this.handleIncluirExercicio.bind(this);
    this.handleEditarExercicio = this.handleEditarExercicio.bind(this);
    this.handleExcluirExercicio = this.handleExcluirExercicio.bind(this);
    this.handleAlterarDescricaoParteTreino = this.handleAlterarDescricaoParteTreino.bind(this);
    this.dataChangeHandler = this.dataChangeHandler.bind(this);
    this.handleIncluirParteClick = this.handleIncluirParteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevState) {
    if (!this.state.fetched && this.props.dataTreino != undefined) {
      trackPromise(
        fetch(`${myConfig.apiUrl}/treinoplanilha/${this.props.idPlanilha}/${this.props.dataTreino}/`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {


            let temp = [];
            data.forEach((element, index) => {
              temp.push({
                id: index,
                titulo: element[0],
                descricao: element[1][0].descricaopartetreino,
                tipo: '',
                exercicios: element[1]
              });
            });

            this.setState({ dataTreino: this.props.dataTreino })

            var parts = this.props.dataTreino.match(/(\d+)/g);
            this.setState({ dataTreinoTela: new Date(parts[0], parts[1]-1, parts[2]) })
            this.setState({ partesTreino: temp })
            this.setState({ fetched: true })
          })
          .catch(console.log)
      );
    }

  }

  handleIncluirParteClick(e) {

    e.preventDefault();
    var maxid = 0;

    this.state.partesTreino.map(function (obj) {
      if (obj.id > maxid) maxid = obj.id;
    });

    let id = maxid + 1;


    let temp = [...this.state.partesTreino];
    temp.push({
      id: id,
      titulo: `Parte ${String.fromCharCode(64 + id)}`,
      descricao: '',
      tipo: '',
      exercicios: []
    });

    this.setState({ partesTreino: temp })
  }

  handleExcluirParteClick(idParte) {
    let temp = [...this.state.partesTreino];

    temp.splice(temp.findIndex(function (i) {
      return i.id === idParte;
    }), 1);

    this.setState({ partesTreino: temp })
  }

  handleChangeParteTreino() {
    console.log('')
  }

  handleIncluirExercicio(idParte, exercicio) {
    let temp = [...this.state.partesTreino];

    var maxid = 0;

    temp.find(x => x.id === idParte).exercicios.map(function (obj) {
      if (obj.id > maxid) maxid = obj.id;
    });

    exercicio.id = maxid + 1;
    temp.find(x => x.id === idParte).exercicios.push(exercicio)

    this.setState({ partesTreino: temp })
  }

  handleEditarExercicio(idParte, exercicio) {
    let temp = [...this.state.partesTreino];

    var indice = temp.find(x => x.id === idParte).exercicios.findIndex(function (i) {
      return i.id === exercicio.id;
    });

    temp.find(x => x.id === idParte).exercicios[indice] = exercicio;

    this.setState({ partesTreino: temp })
  }

  handleAlterarDescricaoParteTreino(idParte, descricao) {
    let temp = [...this.state.partesTreino];

    temp.find(x => x.id === idParte).descricao = descricao;

    this.setState({ partesTreino: temp })
  }

  handleExcluirExercicio(idParte, idExercicio) {
    let temp = [...this.state.partesTreino];

    temp.find(x => x.id === idParte).exercicios.splice(temp.find(x => x.id === idParte).exercicios.findIndex(function (i) {
      return i.id === idExercicio;
    }), 1);

    this.setState({ partesTreino: temp })
  }

  dataChangeHandler = date => {
    this.setState({
      dataTreinoTela: date,
      dataTreino: moment(date).format('YYYY-MM-DD')
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const body = JSON.stringify(this.state);

    trackPromise(
      fetch(`${myConfig.apiUrl}/treino/${authService.getCurrentUser().id}/${this.props.idPlanilha}/${this.props.idPlanilhaAtleta}`, { method: 'POST', headers: authHeader(), body })
        .then(function (response) {
          if (response.ok) {
            window.location.href = '/programacao';
          }
        })
        .catch(console.log)
    );
  }

  render() {
    return (
      <div className="col-md-12">
        <form onSubmit={this.handleSubmit}>
          <div className="card" id="card-cadastrar-treino">
            <div className="card-header ">
              <h5 className="card-title">Incluir Treino</h5>
            </div>
            <div className="card-body ">
              <h6 style={{ marginTop: '10px' }} className="card-title" />
              <div className="form-group form-inline">
                <label htmlFor="data-treino" className="col-md-2">Data do teino:</label>
                {/* <input type="text" autoComplete="false" className="datepicker form-control hasDatepicker" id="data-treino" name="data" placeholder="Data do Treino" value={this.state.dataTreino} onChange={this.dataChangeHandler} /> */}
                <DatePicker dateFormat="dd/MM/yyyy"  className="form-control" selected={this.state.dataTreinoTela} onChange={this.dataChangeHandler} placeholder="Data do Treino"/>
              </div>
              <div className="form-group">
                <button id="btn-incluir-parte" type="button" className="btn btn-primary" onClick={this.handleIncluirParteClick}>Incluir Seção</button>
              </div>
              <div id="partes-treino">
                {this.state.partesTreino.map(item => (
                  <ParteTreino key={item.id} partetreino={item}
                    onIncluirExercicio={this.handleIncluirExercicio}
                    onEditarExercicio={this.handleEditarExercicio}
                    onExcluirExercicio={this.handleExcluirExercicio}
                    onExcluirParteTreino={this.handleExcluirParteClick}
                    onAlterarDescricaoParteTreino={this.handleAlterarDescricaoParteTreino}
                  >

                  </ParteTreino>
                ))}
              </div>
              <button id="btn-salvar-treino" type="submit" className="btn btn-primary pull-right">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FormTreino;