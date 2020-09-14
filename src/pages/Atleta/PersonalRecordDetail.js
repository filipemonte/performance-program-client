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

class PR extends React.Component {
  constructor(props) {
    super(props);

    console.log()

    this.state = {
      history: [],
      fetched: false
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
          this.setState({ history: data })
          this.setState({ fetched: true })
        })
        .catch(console.log)
    );
  }

  render() {
    return (
      <div>
        <Menu></Menu>
        <div className="main-panel">
          <Navbar></Navbar>
          <div className="content">
            <div className="row">
              <PersonalRecordForm updateHistory={this.getHistory} idExercicio={this.props.match.params.id}></PersonalRecordForm>
              <PersonalRecordHistory history={this.state.history} idExercicio={this.props.match.params.id}></PersonalRecordHistory>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default PR;

