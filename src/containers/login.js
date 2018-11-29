import React, { Component } from 'react';
import linkState from 'linkstate';
import { Button, Row, Card, Col, Input } from 'antd';

import UserService from '../backend/services/users';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			isNewAccount: false
		};

    this.switchLoginRegister = this.switchLoginRegister.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
	}

	switchLoginRegister() {
		const { isNewAccount } = this.state;
		this.setState({
			isNewAccount: !isNewAccount
		});
  }
  
  async register() {
		await UserService.register(this.state);
		this.login();
  }

  async login() {
		const user = await UserService.login(this.state);
		console.log(user);
    this.saveLoginLocally(user);
  }

  saveLoginLocally(user) {
		const { id, firstName, lastName } = user;

    localStorage.setItem("isLoggedIn", "true");
		localStorage.setItem("id", id);
		localStorage.setItem("firstName", firstName);
		localStorage.setItem("lastName", lastName);

    this.enterCreate();
  }

  enterCreate() {
    this.props.history.push('/create');
  }

	render() {
		const { isNewAccount } = this.state;
		return (
			<Row style={{marginTop: '4rem'}}>
				<Col span={8} offset={8}>
					{isNewAccount && (
						<Card title="Register">
							<Input placeholder="First Name" onInput={linkState(this, 'firstName')} style={{margin: '8px'}}/>
              <Input placeholder="Last Name" onInput={linkState(this, 'lastName')} style={{margin: '8px'}}/>
              <Input placeholder="Email" onInput={linkState(this, 'email')} style={{margin: '8px'}}/>
              <Input placeholder="Password" type="password" onInput={linkState(this, 'password')} style={{margin: '8px'}}/>
              <Input placeholder="Confirm Password" type="password" style={{margin: '8px'}}/>
              <Button type="primary" onClick={this.register} style={{margin: '8px'}}>Create Account</Button>

							<p style={{margin: '8px'}}>
								Already have an account? <a onClick={this.switchLoginRegister}>Click here to login. </a>
							</p>
						</Card>
					)}
					{!isNewAccount && (
						<Card title="Login">
							<Input placeholder="Email" onInput={linkState(this, 'email')} style={{margin: '8px'}}/>
              <Input placeholder="Password" type="password" onInput={linkState(this, 'password')} style={{margin: '8px'}}/>
              <Button type="primary" onClick={this.login} style={{margin: '8px'}}>Login</Button>
							<p style={{margin: '8px'}}>
								Don't have an account? <a onClick={this.switchLoginRegister}>Click here to register.</a>
							</p>
						</Card>
					)}
				</Col>
			</Row>
		);
	}
}

export default Login;
