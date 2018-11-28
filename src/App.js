import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./containers/login";
import Create from "./containers/create";
import Camera from "./containers/camera";
import Pay from "./containers/pay";

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={Login} />
          <Route path="/create/" component={Create} />
          <Route path="/camera/" exact component={Camera} />
          <Route path="/pay/" component={Pay} />
        </div>
      </Router>
    );
  }
}

export default App;
