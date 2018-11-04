
import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import AuthService from './AuthService';
import auth0 from 'auth0-js';



class Auth0Login extends Component {

  constructor(){
      super();
      this.Auth = new AuthService();
  }
  // goTo(route) {
  //   this.props.history.replace(`/${route}`)
  // }

  auth0Login() {
    this.props.auth.auth0Login();
  }

  auth0Logout() {
    this.props.auth.auth0Logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="container">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <h3>Please login to get started</h3>
            </Navbar.Brand>
            {
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.auth0Login.bind(this)}
                  >
                    Log In
                  </Button>
            }
            {
              // isAuthenticated() && (
              //     <Button
              //       bsStyle="primary"
              //       className="btn-margin"
              //       onClick={this.logout.bind(this)}
              //     >
              //       Log Out
              //     </Button>
              //   )
            }
          </Navbar.Header>
        </Navbar>
        <div className="row">
          <h3>WELCOME TO THE IPO APP</h3>
        </div>
      </div>
    );
  }
}

export default Auth0Login;
