import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';

import Headlines from './components/News Page/Headlines'

const App = () => {
  return (
    <div>
      <Router history = {history}>
          <Route path = "/" component = {Headlines} />
      </Router> 
    </div>
  );
}

export default App;
