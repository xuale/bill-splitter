import React, { Component } from 'react';
import { Col, Card, Row } from 'react-materialize';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <Col m={6} s={12}>
            <Link to="/create">Login</Link>
          </Col>

        </Row>
      </div>
    );
  }
}


export default Login;