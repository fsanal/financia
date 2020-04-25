import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';

import Headlines from './components/News Page/Headlines'
import HeadlineDetail from './components/News Page/HeadlineDetail';
import Navbar from './components/Navbar';

const App = () => {
    return (<>
                <Router history = {history}>
                  <Route path = "/" component = {Navbar} />
                  <Route path = "/headlines" component = {Headlines}/>
                  <Route path = "/detail" component = {HeadlineDetail}/>
                </Router> 
            </>)
}

export default App;
