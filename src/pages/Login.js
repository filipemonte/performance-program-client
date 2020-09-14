import React from 'react';
import { userContext } from '../userContext';
import * as firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import { firebaseConfig } from "../config";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <userContext.Consumer>
        {({ user, loginUser, loginOAuth }) => (
          <div className="container">

            <div className="row d-flex justify-content-center">
              <div className="login-form col-md-5">
                <form onSubmit={loginUser} >
                  <h2 className="text-center titulo-login">Entrar</h2>
                  {
                    this.props.errorMessage.length > 0 ? <p className="alert alert-danger text-center">{this.props.errorMessage}</p> : <p></p>
                  }
        
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Email" name="email" senha="email" />
                  </div>
                  <div className="form-group">
                    <input type="password" name="senha" id="senha" className="form-control" placeholder="Senha" />
                  </div>
                  <div className="validation-summary-valid" data-valmsg-summary="true"><ul><li style={{ display: 'none' }} />
                  </ul>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
                      <div>
                        <button className="btn btn-primary btn-block" onClick={loginOAuth}>Entrar com Google</button>
                        {/* 
                        <button onClick={() => {
                            firebase.auth().signOut();
                          }}>
                          Sign Out</button> */}
                      </div>
                    </FirebaseAuthProvider>
                  </div>
                </form>
              </div>
            </div>

          </div>


        )}
      </userContext.Consumer>
    );
  }
}

export default Login;

