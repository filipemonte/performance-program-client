import React from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import { trackPromise } from 'react-promise-tracker';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';

class ProgramacaoAtleta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      datasTreino: [],
      nomeAtleta: '',
      idPlanilhaAtleta: 0,
      idPlanilha:0,
      fetched: false
    };
  }
  componentDidMount() {
    this.setState({ fetched: false })
  }

  componentDidUpdate(prevState) {
    if (!this.state.fetched) {
      trackPromise(
        fetch(`${myConfig.apiUrl}/trainingdates/${this.props.match.params.id}`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {
            this.setState({ datasTreino: data.map(p => ({ title: 'Treino', date: p.data, allDay: true, rendering: 'background' })) })
            this.setState({ nomeAtleta: data[0].nome })
            this.setState({ idPlanilhaAtleta: data[0].idplanilhaatleta })
            this.setState({ idPlanilha: data[0].idplanilha })
            this.setState({ fetched: true })
          })
          .catch(console.log)
      );
    }
  }

  handleDateClick = (arg) => { // bind with an arrow function
    //this.props.updateDate(arg.dateStr)
    window.location.href = `/cadastrartreino/${this.state.idPlanilha}/${this.state.idPlanilhaAtleta}/${arg.dateStr}`;
  }

  handleEventClick = (clickInfo) => {
    let data = clickInfo.el.closest("td.fc-day").getAttribute('data-date');
    window.location.href = `/cadastrartreino/${this.state.idPlanilha}/${this.state.idPlanilhaAtleta}/${data}`;
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
                    <h5 className="card-title">Calendário do Atleta {this.state.nomeAtleta} </h5>
                  </div>
                  <div className="card-body ">
                    <FullCalendar
                      plugins={[dayGridPlugin, interactionPlugin]}
                      dateClick={
                        this.handleDateClick
                      }
                      eventClick={this.handleEventClick}
                      initialView="dayGridMonth"
                      showNonCurrentDates={false}
                     events={
                       this.state.datasTreino
                     }
                     headerToolbar={{
                      left: 'title',
                      center: '',
                      right: 'prev,next'
                  }}
                    />
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

export default ProgramacaoAtleta;

