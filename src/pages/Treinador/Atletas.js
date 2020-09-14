import React from 'react';

import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import ListaAtletas from '../../components/lista-atletas';
import Footer from '../../components/footer';
import { userContext } from '../../userContext';
import ReactToPrint from 'react-to-print';



class Atletas extends React.Component {


  render() {

    return (
      // Pass user state as value to context.Provider so it can be consumed by context.Consumer
      <div>
        <Menu></Menu>
        <div className="main-panel">
          <Navbar></Navbar>
          <div className="content">
            <div className="row">
              
              <div className="col-md-12">
                <div className="card ">
                  <div className="card-header ">
                    <h5 className="card-title">Atletas</h5>
                    <ReactToPrint
                trigger={() => {
                  // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                  // to the root node of the returned component as it will be overwritten.
                  return <a href="#">Exportar (PDF)</a>;
                }}
                content={() => this.componentRef}
              />
                  </div>
                  <ListaAtletas ref={el => (this.componentRef = el)}></ListaAtletas>
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
Atletas.contextType = userContext;

export default Atletas;

