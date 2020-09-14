import React from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import FormPlanilha from '../../components/form-planilha';

class DetalhePlanilha extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <Menu></Menu>
          <div className="main-panel">
            <Navbar></Navbar>
            <div className="content">
              <div className="row">
                <FormPlanilha idPlanilha={this.props.match.params.id}></FormPlanilha>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default DetalhePlanilha;

