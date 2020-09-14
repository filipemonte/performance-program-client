import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; 
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';

import './calendario-atleta.css';



class CalendarioAtleta extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentDidMount()
  {
    if (this.state.events.length === 0) {
      trackPromise(

        fetch(`${myConfig.apiUrl}/trainingDates/${authService.getCurrentUser().id}`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {
            this.setState({ events: data.map(p => ({ title: 'Treino', date: p.data, allDay: true, rendering: 'background' })) })
          })
          .catch(console.log)
      );
    }
  }

  render() {

    return (
      <div className="col-md-5">
        <div className="card card-chart">
          <div className="card-header">
          </div>
          <div className="card-body">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              dateClick={
                this.handleDateClick
              }
              eventClick={this.handleEventClick}
              initialView="dayGridMonth"
              showNonCurrentDates={false}
              events={
                this.state.events
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
    );

  }

  handleDateClick = (arg) => { // bind with an arrow function
    this.props.updateDate(arg.dateStr)
  }

  handleEventClick = (clickInfo) => {
    this.props.updateDate(clickInfo.el.closest("td.fc-day").getAttribute('data-date'))
  }
}


export default CalendarioAtleta;
