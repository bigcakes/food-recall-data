import React from 'react';
import { render } from 'react-dom';
import { browserHistory, hashHistory, Router, Route, IndexRoute } from "react-router";

import App from './App';
import Search from './components/Search';
import Recall from './components/Recall';
import './index.css';

const Root = () => {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Search} />
        <Route path='/recall/:recallType' component={Recall} />
      </Route>
    </Router>
  );
}

render(
  <Root />,
  document.getElementById('root')
);
