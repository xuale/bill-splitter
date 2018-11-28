import React, { Component } from 'react';
import { Col, Card, Row, Button } from 'react-materialize';
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
            <Card className = 'blue-grey darken-1' textClassName='white-text' title='Card title'>
            <h1>Welcome To Bill-Splitter!</h1>  
            <h2> Create an Account</h2>            
            <form action="/action_page.php">
                <input type="text" name="fname" placeholder="Username" /><br />
                <input type="text" name="lname" placeholder="Password" /><br />
                <Button waves='light'>
                <Link to="/create">Login</Link>
              </Button>
              </form> 
            </Card>
          </Col>

        </Row>
      </div>
    );
  }
}


export default Login;