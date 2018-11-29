import React, { Component } from 'react';
import linkState from 'linkstate';

import UserService from '../backend/services/users';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      isNewAccount: false
    };
  }

  render() {
    const { username, password, isNewAccount } = this.state;
    return (
      <div>
        <h1>Split.io</h1>
        {isNewAccount && 
          <div>
            <h3>Register</h3>
            <input type="text" onInput={linkState(this, 'email')} placeholder="Email"/>
          </div>
        }
        {!isNewAccount &&
          <div></div>
        }
      </div>
    );
  }
}


export default Login;