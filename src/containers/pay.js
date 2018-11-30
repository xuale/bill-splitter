import React, { Component } from 'react';
import linkState from 'linkstate';
import { Button, Row, Card, Col, Input } from 'antd';

import UserService from '../backend/services/users';
import { timingSafeEqual } from 'crypto';

class Pay extends Component {
  constructor(props) {
    super(props);
    const {
      location: {
        state: { friends }
      }
    } = this.props;
    this.state = {
      friends,
      total: [],
      firstName: 'Anshul',
      lastName: 'Aggarwal',
      isCompleted: false
    };
    this.clickForPayment = this.clickForPayment.bind(this);
    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    this.setState({
      firstName,
      lastName
    });
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
                <Button
                  type="primary"
                  onClick={this.clickForPayment}
                  style={{ margin: '8px' }}
                >
                  Send Payments
                </Button>
              </p>
            </Card>
          )}
          {!isCompleted && (
            <Card title="Pay">
              <p style={{ margin: '12px', textAlign: 'left' }}>
                Receipt: {this.getName()}
              </p>
              <Col>
                {friends.map(function(friend, i) {
                  const { firstName, lastName } = friend;
                  return (
                    <Row>
                      <Col span={12}>{`${firstName} ${lastName}`}</Col>{' '}
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
              <Row>
                <Col span={4} offset={4}>
                  <Button
                    type="primary"
                    onClick={this.clickForPayment}
                    style={{ margin: '8px' }}
                  >
                    Send Payments
                  </Button>
                </Col>
                <Col span={8} offset={4}>
                  <Button
                    onClick={() => {
                      this.props.history.push('/create');
                    }}
                    style={{ margin: '8px' }}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Card>
          )}
        </Col>
      </Row>
    );
  }
}

export default Pay;
