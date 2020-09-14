import React from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import FormPerfilTreinador from '../../components/form-perfil-treinador';
import { userContext } from '../../userContext';


class PerfilTreinador extends React.Component {
  componentDidMount() {
    this.context.toggleMenu();
  }

  render() {
    return (
        <div>
          <Menu></Menu>
          <div className="main-panel">
            <Navbar></Navbar>
            <div className="content">
              <div className="row">
                <FormPerfilTreinador></FormPerfilTreinador>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

PerfilTreinador.contextType = userContext;


export default PerfilTreinador;

