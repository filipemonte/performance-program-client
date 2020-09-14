import React, { Component } from 'react';
import moment from 'moment'
import { trackPromise } from 'react-promise-tracker';

import { userContext } from '../../userContext';
import TreinoAtletaExercicio from '../treino-atleta-exercicio';
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';

class TreinoAtleta extends Component {
  static contextType = userContext;

  constructor(props) {
    super(props);

    this.state = {
      training: [],
      selectedDate: this.props.selectedDate,
      fetched: false
    };
  }

  componentDidMount() {
    trackPromise(
      fetch(`${myConfig.apiUrl}/training/${authService.getCurrentUser().id}/${this.props.selectedDate}`, { headers: authHeader() })
        .then(res => res.json())
        .then((data) => {
          this.setState({ training: data.reverse() })
          this.setState({ selectedDate: this.props.selectedDate })
          this.setState({ fetched: false })

        })
        .catch(console.log)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedDate != this.props.selectedDate && !this.state.fetched) {
      this.setState({ fetched: true })

      trackPromise(
        fetch(`${myConfig.apiUrl}/training/${authService.getCurrentUser().id}/${this.props.selectedDate}`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {
            this.setState({ training: data.reverse() })
            this.setState({ selectedDate: this.props.selectedDate })
            this.setState({ fetched: false })

          })
          .catch(console.log)
      );
    }
  }

  handleDoneClick(e) {
    e.preventDefault();

    var postData = {
      "idTreino": this.state.training[0][1][0].idtreino,
      "idPlanilha": this.state.training[0][1][0].idplanilha,
      "comentario": e.currentTarget.elements.comentario.value
    }

    fetch(`${myConfig.apiUrl}/treinodone/${authService.getCurrentUser().id}`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(postData)
    })
      .then(function (data) {
        window.location.href = '/';
      });
  }

  render() {
    var formatedDate = moment(this.state.selectedDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
    var html = "";

    if (!this.state.training || !this.state.training.length) {
      html = <div className="card ">
        <div className="card-header ">
          <h5 className="card-title">Nenhum treino cadastrado (<span id="data-title">{formatedDate}</span>)</h5>
        </div>
        <div className="card-body ">
        </div>
      </div>

    }
    else {
      var formDone = "";
      if (this.state.training[0][1][0].done) {
        formDone = <p className="alert alert-success text-center">Muito bem, você já fez este treino!</p>
      }
      else {
        formDone = <form onSubmit={(e) => this.handleDoneClick(e)} >
          <textarea id="comentario" className="col-md-12 form-control" rows="4" placeholder="Comentários sobre o treino?" />
          <button className="btn btn-primary col-md-12" >
            Done!
          </button>
        </form>

      }

      html =
        <div className="card ">
          <div className="card-header ">
            <h5 className="card-title">Treino do Dia (<span id="data-title">{formatedDate}</span>)</h5>
          </div>
          <div className="card-body" >
            {this.state.training.map(item => (
              <TreinoAtletaExercicio item={item} key={item} />
            ))}
            {formDone}
          </div>
        </div>
    }



    return (
      <div className="col-md-7">
        {html}
      </div>
    );
  }
}

export default TreinoAtleta;
