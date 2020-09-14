import React from 'react';

import moment from 'moment'

import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import CalendarioAtleta from '../../components/calendario-atleta';
import TreinoAtleta from '../../components/treino-atleta';
import Footer from '../../components/footer';
import { userContext } from '../../userContext';


class HomeAtleta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format('YYYY-MM-DD'),
      count: 0
    };
  }

  componentDidMount() {
    this.context.toggleMenu();
  }

  updateDate = (date) => {
    this.setState(currentState => {
      return { date: date };
    });
  };
 

  render() {

    return (
      // Pass user state as value to context.Provider so it can be consumed by context.Consumer
          <div>
            <Menu></Menu>
            <div className="main-panel">
              <Navbar></Navbar>
              <div className="content">
                <div className="row">
                  <TreinoAtleta selectedDate={this.state.date}></TreinoAtleta>
                  <CalendarioAtleta updateDate={this.updateDate}  selectedDate={this.state.date.toString()}></CalendarioAtleta>
                </div>
              </div>
              <Footer></Footer>
            </div>
          </div>
    );
  }
}
HomeAtleta.contextType = userContext;

export default HomeAtleta;

