import React, { Component } from 'react';
import './menu.css';

import { userContext } from '../../userContext';
import MenuAtleta from '../menu-atleta';
import MenuTreinador from '../menu-treinador';
import authService from '../../auth/auth-service';



class Menu extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let user = this.context.user;
    let menu;
    if (authService.ehCoach()) {
      menu = <MenuTreinador onLogout={this.context.logoutUser} />;
    } else {
      menu = <MenuAtleta onLogout={this.context.logoutUser}/>;
    }

    return (
      <userContext.Consumer>
        {({ user, logoutUser }) => (
          <div className="sidebar" data-color="white" data-active-color="danger">
            <div className="logo">


              <a href="#" className="simple-text logo-mini">
                <div className="logo-image-small">
                  <img src={`${process.env.PUBLIC_URL}/images/logos-coachs/logo1.png`} />
                </div>
              </a>
              <a href="#" className="simple-text logo-normal">
                <span>{authService.getCurrentUser().name.split(" ")[0]}</span>
              </a>
            </div>
            <div className="sidebar-wrapper ps-container ps-theme-default" data-ps-id="5ac83d6d-adde-7fd6-fd0b-b0014959ef3b">
              {menu}
              <img className="logo-coach" src={`${process.env.PUBLIC_URL}/images/logos-coachs/logo1.png`} />
              <div className="ps-scrollbar-x-rail">
                <div className="ps-scrollbar-x" tabIndex="0" >
                </div>
              </div>
              <div className="ps-scrollbar-y-rail" >
                <div className="ps-scrollbar-y" tabIndex="0" ></div>
              </div>
            </div>
          </div>
        )}
      </userContext.Consumer>


    );
  }
}
Menu.contextType = userContext;

export default Menu;
