import React from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import PersonalRecord from '../../components/personal-record';

import Chart from 'react-apexcharts'
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';
import { trackPromise } from 'react-promise-tracker';
import { myConfig } from '../../config';
import { userContext } from '../../userContext';
import ReactToPrint from 'react-to-print';


class PR extends React.Component {
  constructor(props) {
    super(props);

    console.log('cons')
    this.state = {

      series: [{
        name: 'Treinos Programados',
        data: []
      }, {
        name: 'Treinos Realizados',
        data: []
      },],
      options: {
        chart: {
          id: 'teste',
          type: 'bar',
          stacked: false,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 0.4,
          colors: ['#fff']
        },
        xaxis: {
          categories: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          offsetX: 40
        }
      },


    };
  }

  async componentDidMount() {
    this.context.toggleMenu();
    console.log('componentDidMount')

    const newSeries = [];
    const categories = [];

    await fetch(`${myConfig.apiUrl}/chartTreinosRealizados/${authService.getCurrentUser().id}`, { headers: authHeader() })
      .then(res => res.json())
      .then((resultado) => {

        categories.push(resultado.meses)
        newSeries.push({ data: resultado.programados, name: "Treinos Programados" })
        newSeries.push({ data: resultado.realizados, name: "Treinos Realizados" })
      })
      .catch(console.log)


    var options = { ...this.state.options }
    options.xaxis.categories = categories;
    this.setState({ options: options })

    this.setState({
      series: newSeries
    })
  }


  render() {
    return (
      <div>
        <Menu></Menu>
        <div className="main-panel">
          <Navbar></Navbar>
          <div className="content">
            <div className="row">
              <div className="col-md-6">
              <ReactToPrint
                trigger={() => {
                  // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                  // to the root node of the returned component as it will be overwritten.
                  return <a href="#">Exportar (PDF)</a>;
                }}
                content={() => this.componentRef}
              />
                <PersonalRecord ref={el => (this.componentRef = el)}></PersonalRecord>
              </div>
              <div className="col-md-6">
                <div className="card ">
                  <div className="card-header ">
                    <h5 className="card-title">Treinos Realizados</h5>
                  </div>
                  <div className="card-body ">
                    <Chart options={this.state.options} series={this.state.series} type="bar"height="500px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
PR.contextType = userContext;

export default PR;

