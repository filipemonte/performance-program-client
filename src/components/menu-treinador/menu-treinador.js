import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class MenuTreinador extends Component {
  render() {

    return (
      <ul className="nav">
        <li>
          <Link to="/programacao" >
            <i className="nc-icon nc-calendar-60"></i>
            <p>Programação</p>
          </Link>
        </li>
        <li>
          <Link to="/gerenciarplanilhas" >
            <i className="nc-icon nc-single-copy-04"></i>
            <p>Gerenciar Planilhas</p>
          </Link>
        </li>
        <li>
          <Link to="/atletas" >
            <i className="nc-icon nc-user-run"></i>
            <p>Atletas</p>
          </Link>
        </li>
        <li>
          <Link to="/perfiltreinador" >
            <i className="nc-icon nc-badge"></i>
            <p>Perfil</p>
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

export default MenuTreinador;
