import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';

class personalRecordChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prs: [],
      fetched: false
    };
  }

  componentDidMount() {
    this.setState({ fetched: false })
  }

  componentDidUpdate(prevState) {
    if (!this.state.fetched) {
      trackPromise(
        fetch(`${myConfig.apiUrl}/personalrecordhistory/${authService.getCurrentUser().id}/${this.props.idExercicio}`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {
            this.setState({ prs: [0, ...data.map(a=>a.resultado).reverse()] })
            this.setState({ fetched: true })

            console.log(this.state.prs)

          })
          .catch(console.log)
      );
    }
  }



  render() {
    return (
        <Sparklines data={this.state.prs} limit={8} width={100} height={20} margin={5}>
          <SparklinesLine color="blue" />
        </Sparklines>
    );
  }
}


export default personalRecordChart;
