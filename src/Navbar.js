import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Container,  Menu } from 'semantic-ui-react'

export default withAuth(class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
  }

  async componentDidMount() {
    const authenticated = await this.props.auth.isAuthenticated();
    console.log('authenticated', authenticated);
    this.setState({ authenticated });
  }

  render() {
    return <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header href="/">
          Okta-React Sample Project
        </Menu.Item>
        {this.state.authenticated && <Menu.Item as='a' href="/profile">Profile</Menu.Item>}
        {this.state.authenticated && <Menu.Item as='a' onClick={this.props.auth.logout}>Logout</Menu.Item>}
        {!this.state.authenticated && <Menu.Item as='a' onClick={this.props.auth.login}>Login</Menu.Item>}
      </Container>
    </Menu>

  </div>
  }
});