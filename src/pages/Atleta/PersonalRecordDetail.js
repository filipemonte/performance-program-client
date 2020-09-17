import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import PersonalRecordForm from '../../components/personal-record-form';
import PersonalRecordHistory from '../../components/personal-record-history';
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';
import { userContext } from '../../userContext';


class PR extends React.Component {
  constructor(props) {
    super(props);

    this.editPr = this.editPr.bind(this)
    this.state = {
      history: [],
      fetched: false,
      prEdicao: { id: 0 }
    };
  }
  componentDidMount() {
    this.setState({ fetched: false })
  }

  componentDidUpdate(prevState) {
    if (!this.state.fetched) {
      this.getHistory();
    }
  }

  getHistory() {
    trackPromise(
      fetch(`${myConfig.apiUrl}/personalrecordhistory/${authService.getCurrentUser().id}/${this.props.match.params.id}`, { headers: authHeader() })
        .then(res => res.json())
        .then((data) => {
          if (data.auth !== undefined && data.auth === false)
          {
            this.context.logoutUser()
          }
          
          this.setState({ history: data })
          this.setState({ fetched: true })
        })
        .catch(console.log)
    );
  }

  editPr(id, data, resultado)
  {
    let prEdicao = { id: id, data: data, resultado: resultado}
    this.setState({prEdicao: prEdicao})
  }

  render() {
    return (
      <div>
        <Menu></Menu>
        <div className="main-panel">
          <Navbar></Navbar>
          <div className="content">
            <div className="row">
              <PersonalRecordForm updateHistory={this.getHistory} prEdicao={this.state.prEdicao} idExercicio={this.props.match.params.id}></PersonalRecordForm>
              <PersonalRecordHistory history={this.state.history} idExercicio={this.props.match.params.id} editPr={this.editPr}></PersonalRecordHistory>
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

