import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Row, Col, Layout, Menu } from 'antd';

import Login from './containers/login';
import Create from './containers/create';
import Camera from './containers/camera';
import Pay from './containers/pay';

import logo from './logo.svg';
import './App.css';

import UserService from './backend/services/users';

const { Header, Content, Footer } = Layout;

class App extends Component {
	constructor(props) {
		super(props);
		const loggedIn = localStorage.getItem('isLoggedIn') == 'true';

		this.state = {
			loggedIn
		};
	}

	logout() {
		const id = localStorage.getItem('id');
		UserService.logout(id);
    localStorage.clear();
    const loggedIn = localStorage.getItem('isLoggedIn') == 'true';
		this.setState({
			loggedIn
		});
	}

	render() {
		console.log(localStorage.getItem('isLoggedIn'));
		const { loggedIn } = this.state;
		return (
			<Router>
				<div className="App">
					<Layout className="layout">
						<Header>
							<Row>
								<Col span={8} offset={8}>
									<h1 className="App-logo">
										<Link to="/">Split.io</Link>
									</h1>
								</Col>
								<Col span={4} offset={4}>
									{loggedIn && (
										<Button type="danger" onClick={this.logout}>
											Logout
										</Button>
									)}
								</Col>
							</Row>
						</Header>
						<Content style={{ padding: '20px 50px', height: '85vh' }}>
							<Route path="/" exact component={Login} />
							<Route path="/create/" component={Create} />
							<Route path="/pay/" component={Pay} />
						</Content>
						<Footer style={{ textAlign: 'center' }}>Made with 💜at UCLA</Footer>
					</Layout>
				</div>
			</Router>
		);
	}
}

export default App;
