import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import './App.css';

const App = () => (
  <div className='app'>
    <Main />
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
  </Switch>
);

export default App;
