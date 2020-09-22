import React, { Component } from 'react';
import { userContext } from '../../userContext';
import ModalVideo from 'react-modal-video'

import '../../../node_modules/react-modal-video/css/modal-video.min.css';


class ModalAjuda extends Component {
  static contextType = userContext;

  constructor() {
    super()
    this.state = {
      isOpen: false
    }
    this.openModal = this.openModal.bind(this)
  }

  openModal(e) {
    e.preventDefault()
    this.setState({ isOpen: true })
  }

  render() {

    var modal = ""

    if (!this.props.linkAjuda) {
      modal = ""
    }
    else {
      var idVideo = this.props.linkAjuda.split("v=")[1];

      modal =
        <span><a href="!#" onClick={this.openModal}>Ver Detalhes</a>
          <div>
            <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={idVideo} onClose={() => this.setState({ isOpen: false })} />
          </div>
        </span>
    }

    return (
    <span>{modal}</span>
    );
  }
}


export default ModalAjuda;
