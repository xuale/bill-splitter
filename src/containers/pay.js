import React, { Component } from 'react';
import linkState from 'linkstate';
import { Button, Row, Card, Col, Input } from 'antd';

import UserService from '../backend/services/users';

class Pay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			friends: [],
			total: [],
			firstName: '',
			lastName: '',
			isCompleted: false
		};
	}

	render() {
		const { isCompleted } = this.state;
		return (
			<Row style={{marginTop: '4rem'}}>
				<Col span={8} offset={8}>
					{isCompleted && (
						<p></p>
					)}
					{!isCompleted && (
						<Card title="Pay">
							<p style={{margin: '12px', textAlign: 'left'}}>
								Receipt:
							</p>
						</Card>
					)}
				</Col>
			</Row>
		);
	}
}

export default Pay;
