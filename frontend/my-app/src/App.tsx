import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from '@mui/material';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './screens/home';
import SignupScreen from './screens/signup'
import LoginScreen from './screens/login'
import UserTaskPage from './screens/userTasks'

function App() {
  return (
    <React.Fragment>
      <Router>
    <Container>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/signup" component={SignupScreen} />
    <Route exact path="/login" component={LoginScreen} />
    <Route exact path="/mytasks" component={UserTaskPage} />


    </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
