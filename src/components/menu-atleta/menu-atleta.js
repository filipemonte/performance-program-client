import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class MenuAtleta extends Component {
  render() {

    return (
      <ul className="nav">
        <li>
          <a href="/">
            <i className="nc-icon nc-tile-56"></i>
            <p>Treinos</p>
          </a>
        </li>
        <li>
          <Link to="/perfil" >
            <i className="nc-icon nc-badge"></i>
            <p>Perfil</p>
          </Link>
        </li>
        <li>
          <Link to="/pr" >
            <i className="nc-icon nc-trophy"></i>
            <p>PRs</p>
          </Link>
        </li>
        <li>
          <a onClick={this.props.onLogout}>
            <i className="nc-icon nc-single-02"></i>
            <p>Sair</p>
          </a>
        </li>
        

      </ul>
    );
  }
}

export default MenuAtleta;
