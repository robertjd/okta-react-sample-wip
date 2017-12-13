import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Navbar from './Navbar';
import { Button, Container, Header } from 'semantic-ui-react'

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    const userinfo = await this.props.auth.getUser();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated, userinfo });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    return <div>
        <Navbar></Navbar>
        {this.state.authenticated !== null &&
        <Container text style={{ marginTop: '7em' }}>
            <Header as='h1'>Okta-React Sample Application (Implicit Flow)</Header>
            {this.state.authenticated &&
              <div>
                <p>Hello, {this.state.userinfo.name}!</p>
              </div>
            }
            {!this.state.authenticated &&
              <div>
                <p>If you're viewing this page then you have successfully started this React application.</p>
                <p>This example shows you how to use the <a href="https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react">Okta React Library</a> to add the <a href="https://developer.okta.com/authentication-guide/implementing-authentication/implicit.html">Implicit Flow</a> to your application.</p>
                <p>When you click the login button below, you will be redirected to the login page on your Okta org.  After you authenticate, you will be returned to this application with an ID Token and Access Token.  These tokens will be stored in local storage and can be retrieved at a later time.</p>
                <Button primary onClick={this.props.auth.login}>Login</Button>
              </div>
            }

        </Container>
        }
      </div>;
  }
});