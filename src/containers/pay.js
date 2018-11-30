import React, { Component } from 'react';
import linkState from 'linkstate';
import { Button, Row, Card, Col, Input } from 'antd';

import UserService from '../backend/services/users';
import { timingSafeEqual } from 'crypto';

class Pay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			friends: [],
			total: [],
			firstName: 'test',
			lastName: 'yes',
			isCompleted: false
    };
    this.clickForPayment = this.clickForPayment.bind(this);
    this.getName = this.getName.bind(this)
	}

  clickForPayment() {
		const { isCompleted } = this.state;
		this.setState({
			isCompleted: !isCompleted
		});
  }

  getName() {
    return this.state.firstName + " " + this.state.lastName;
  }

	render() {
    const { friends, total, firstname, lastname, isCompleted } = this.state;
		return (
			<Row style={{marginTop: '4rem'}}>
				<Col span={8} offset={8}>
					{isCompleted && (
						<p></p>
					)}
					{!isCompleted && (
						<Card title="Pay">
							<p style={{margin: '12px', textAlign: 'left'}}>
								Receipt: { this.getName }
							</p>
						</Card>
					)}
				</Col>
			</Row>
		);
	}
}

export default Pay;
