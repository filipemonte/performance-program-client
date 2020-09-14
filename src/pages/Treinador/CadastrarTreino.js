import React from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import FormTreino from '../../components/form-treino';
import { trackPromise } from 'react-promise-tracker';


class CadastrarTreino extends React.Component {
  

  render() {



    return (
      <div>
        <Menu></Menu>
        <div className="main-panel">
          <Navbar></Navbar>
          <div className="content">
            <div className="row">
              <FormTreino idPlanilha={this.props.match.params.idPlanilha} idPlanilhaAtleta={this.props.match.params.idPlanilhaAtleta} dataTreino={this.props.match.params.data}></FormTreino>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CadastrarTreino;

