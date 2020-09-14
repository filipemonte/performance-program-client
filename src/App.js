import React, { useState, useEffect } from 'react';

import HomeAtleta from './pages/Atleta/HomeAtleta';
import PersonalRecord from './pages/Atleta/PersonalRecord';
import PersonalRecordDetail from './pages/Atleta/PersonalRecordDetail';
import Atletas from './pages/Treinador/Atletas';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { userContext } from './userContext';
import PerfilTreinador from './pages/Treinador/PerfilTreinador';
import PerfilAtleta from './pages/Atleta/PerfilAtleta';
import GerenciarPlanilhas from './pages/Treinador/GerenciarPlanilhas';
import IncluirPlanilha from './pages/Treinador/DetalhePlanilha';
import DetalhePlanilha from './pages/Treinador/DetalhePlanilha';
import PlanilhasAtleta from './pages/Treinador/PlanilhasAtleta';
import ProgramacaoPlanilha from './pages/Treinador/ProgramacaoPlanilha';
import ProgramacaoAtleta from './pages/Treinador/ProgramacaoAtleta';
import CadastrarTreino from './pages/Treinador/CadastrarTreino';
import Login from './pages/Login';
import authService from './auth/auth-service';
import * as firebase from "firebase/app";
import "firebase/auth";

import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser,
      loginOAuth: this.loginOAuth,
      toggleMenu: this.toggleMenu,
      errorMessage: '',
      classNav: '"nav-open"'
    };

    this.logoutUser = this.logoutUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.loginOAuth = this.loginOAuth.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  loginOAuth = (event) => {
    event.preventDefault();
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      // var user = result.user;
      authService.loginOAuth(result.user)
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
    });;
  };

  loginUser = async(event) => {
    event.preventDefault();
    let responseLogin = await authService.login(event.currentTarget.elements.email.value, event.currentTarget.elements.senha.value)
    this.setState({errorMessage: responseLogin})
  };

  logoutUser = () => {
    authService.logout();
    firebase.auth().signOut();
    this.setState({ user: authService.getCurrentUser() });

    window.location.href = '/';
  };

  toggleMenu = () =>  {
    if (this.state.classNav == "")
    {
      this.setState({classNav: "nav-open"})    
    }
    else
    {
      this.setState({classNav: ""})    
    }
  }

  render() {
    let routes;
    if (!authService.isAuthenticated()) {
      routes = <Route exact path="/">
        <Login errorMessage={this.state.errorMessage}/>
        <Redirect to="/" />
      </Route>

    }
    else if (authService.ehCoach()) {
      routes = <Switch>
        <Route exact path="/" component={PlanilhasAtleta} />
        <Route exact path="/atletas" component={Atletas} />
        <Route exact path="/perfiltreinador" component={PerfilTreinador} />
        <Route exact path="/gerenciarplanilhas" component={GerenciarPlanilhas} />
        <Route exact path="/incluirplanilha" component={DetalhePlanilha} />
        <Route exact path="/editarplanilha/:id" component={DetalhePlanilha} />
        <Route exact path="/programacao/" component={PlanilhasAtleta} />
        <Route exact path="/programacaoplanilha/:id" component={ProgramacaoPlanilha} />
        <Route exact path="/programacaoatleta/:id" component={ProgramacaoAtleta} />
        <Route exact path="/cadastrartreino/:idPlanilha/:idPlanilhaAtleta" component={CadastrarTreino} />
        <Route exact path="/cadastrartreino/:idPlanilha/:idPlanilhaAtleta/:data" component={CadastrarTreino} />
        <Redirect to="/" />
      </Switch>
    }
    else {
      routes = <Switch>
        <Route exact path="/" component={HomeAtleta} />
        <Route exact path="/pr" component={PersonalRecord} />
        <Route exact path="/prdetail/:id" component={PersonalRecordDetail} />
        <Route exact path="/perfil" component={PerfilAtleta} />
        <Redirect to="/" />
      </Switch>
    }

    return (
      
      <div className={this.state.classNav}>
      <BrowserRouter>
        <userContext.Provider value={this.state}>
          {routes}
        </userContext.Provider>
      </BrowserRouter>
      </div>

    );
  }
}

export default App;

