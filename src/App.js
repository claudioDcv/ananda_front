import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container, Row } from 'reactstrap';

import LoginForm from './component/LoginForm';
import Greenhouses from './component/Greenhouses';
import Greenhouse from './component/Greenhouse';
import Plant from './component/Plant';
import CreatePlant from './component/CreatePlant';

import Navbar from './component/Navbar';

import { storageEmail } from './common/utils';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: storageEmail(),
      greenhouses: [],
      greenhouse: null,
      greenhousePlant: [],
    }
    this.handlerChange = this.handlerChange.bind(this);
  }

  handlerChange(event, callback = () => ({})) {
    this.setState(event, callback);
  }

  render() {
    // const { email, greenhouses, greenhouse, greenhousePlant } = this.state;
    return (
      <Router>
        <div>
          <Navbar />
          <Container>
            <Row>
              <Route path="/" exact component={LoginForm} />
              <Route path="/greenhouses" exact component={Greenhouses} />
              <Route path="/greenhouses/:id" exact component={Greenhouse} />
              <Route path="/greenhouses/:greenhouseId/create-plant" exact component={CreatePlant} />
              <Route path="/greenhouses/:greenhouseId/plant/:id" exact component={Plant} />
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

// greenhouse={greenhouse} <div className="ananda-menu">{email}</div>

export default App;
