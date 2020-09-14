import React, { Component } from 'react';
import { userContext } from '../../userContext';

class Navbar extends Component {
  render() {
    return (
      <userContext.Consumer>
        {({ user, toggleMenu }) => (
          <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
            <div className="container-fluid">

              <div className="navbar-wrapper">
                <div className="navbar-toggle">
                  <button type="button" className="navbar-toggler" onClick={toggleMenu}>
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}
      </userContext.Consumer>
    );
  }
}
Navbar.contextType = userContext;

export default Navbar;
