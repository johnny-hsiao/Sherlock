import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';

import LoginPage from './Login';
import style from './style.css';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="row">
        <div className="text col-xs-12 col-md-6 col-md-offset-1">
          <h5 className="title">ARTICLE NOW</h5>
          <h5 className="slogan">Your personalized dashboard solution</h5>
          <p className="endorsement">"With Article Now I can finally get concise data on all of my favourite Twitter accounts in one place. Best of all I can keep them organized them by category!"</p>
          <p className="quote">- Noel</p>
        </div>
        <div className="text col-xs-12 col-md-1">
        </div>
        <div className="login-bar col-xs-12 col-md-4">
          <LoginPage/>
        </div>
      </div>
    );
  }
}
