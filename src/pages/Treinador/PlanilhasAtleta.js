import React from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import ListaPlanilhas from '../../components/lista-planilhas';
import { userContext } from '../../userContext';


class PlanilhasAtleta extends React.Component {
  
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
            <ListaPlanilhas></ListaPlanilhas>
          </div>
        </div>
      </div>
    );
  }
}
PlanilhasAtleta.contextType = userContext;


export default PlanilhasAtleta;

