import React from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import FormPerfilAtleta from '../../components/form-perfil-atleta';
import { userContext } from '../../userContext';

class PerfilAtleta extends React.Component {

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
                <FormPerfilAtleta></FormPerfilAtleta>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
PerfilAtleta.contextType = userContext;

export default PerfilAtleta;

