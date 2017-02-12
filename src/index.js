import React from 'react';
import { render } from 'react-dom';
import { Redirect, hashHistory, Router, Route, IndexRoute } from "react-router";

import App from './App';
import Search from './components/Search';
import EmptySearch from './components/EmptySearch';
import RecallList from './components/RecallList';
import Recall from './components/Recall';
import './index.css';

const Root = () => {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={EmptySearch} />
        <Route path='/recalls/:recallType' component={RecallList} />
        <Route path='/recall/:recallNumber' component={Recall} />
        <Redirect from="/recalls/" to="/" />
      </Route>
    </Router>
  );
}

render(
  <Root />,
  document.getElementById('root')
);
