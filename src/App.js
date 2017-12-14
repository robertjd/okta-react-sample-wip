import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
import Messages from './Messages';
import Profile from './Profile';

const config = {
  issuer: 'https://dev-431502.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oabnwhohxG2Yw5w80h7'
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security issuer={config.issuer}
          client_id={config.client_id}
          redirect_uri={config.redirect_uri}
        >
          <Route path='/' exact={true} component={Home}/>
          <Route path='/implicit/callback' component={ImplicitCallback}/>
          <SecureRoute path='/messages' component={Messages}/>
          <SecureRoute path='/profile' component={Profile}/>
        </Security>
      </Router>
    );
  }
}

export default App;