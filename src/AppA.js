import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LoginForm from './component/LoginForm';
import Greenhouses from './component/Greenhouses';
import Greenhouse from './component/Greenhouse';

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
    const { email, greenhouses, greenhouse, greenhousePlant } = this.state;
    return (
      <div>
        
        <Grid container spacing={24}>
          {email.length === 0 && <LoginForm saveParent={this.handlerChange} />}
          {email.length > 0 && greenhouse === null && (<Greenhouses greenhouses={greenhouses} saveParent={this.handlerChange} />)}
          {email.length > 0 && greenhouse !== null && <Greenhouse greenhousePlant={greenhousePlant} greenhouse={greenhouse} saveParent={this.handlerChange} />}
        </Grid>
      </div>
    );
  }
}

// greenhouse={greenhouse} <div className="ananda-menu">{email}</div>

export default App;
