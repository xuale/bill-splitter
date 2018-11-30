import React, { Component } from 'react';
import linkState from 'linkstate';
import { Button, Row, Card, Col, Input } from 'antd';

import UserService from '../backend/services/users';
import { timingSafeEqual } from 'crypto';

class Pay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			friends: [ 'alice', 'bob', 'lit' ],
			total: [],
			firstName: 'Anshul',
			lastName: 'Aggarwal',
			isCompleted: false
		};
		this.clickForPayment = this.clickForPayment.bind(this);
		this.getName = this.getName.bind(this);
	}

	componentDidMount() {
		const firstName = localStorage.getItem("firstName");
		const lastName = localStorage.getItem("lastName");
		this.setState({
			firstName, lastName
		})
	}

	clickForPayment() {
		const { isCompleted } = this.state;
		this.setState({
			isCompleted: !isCompleted
		});
	}

	getName() {
		return this.state.firstName + ' ' + this.state.lastName;
	}

	render() {
		const { friends, total, firstName, lastName, isCompleted } = this.state;
		return (
			<Row style={{ marginTop: '4rem' }}>
				<Col span={8} offset={8}>
					{isCompleted && (
						<Card>
							<p>Success</p>
							<p>
								<Button type="primary" onClick={this.clickForPayment} style={{ margin: '8px' }}>
									Send Payments
								</Button>
							</p>
						</Card>
					)}
					{!isCompleted && (
						<Card title="Pay">
							<p style={{ margin: '12px', textAlign: 'left' }}>Receipt: {this.getName()}</p>
							<Col>
								{friends.map(function(friend, i) {
									return (
										<Row>
											<Col span={12}>{friend}</Col>{' '}
											<Col span={12}>
												<Input
													placeholder="Enter Value To Pay"
													style={{ margin: '12px', display: 'inline' }}
												/>
											</Col>
										</Row>
									);
								})}
							</Col>
							<p style={{ margin: '12px', textAlign: 'right' }}>
								<Button type="primary" onClick={this.clickForPayment} style={{ margin: '8px' }}>
									Send Payments
								</Button>
							</p>
						</Card>
					)}
				</Col>
			</Row>
		);
	}
}

export default Pay;
