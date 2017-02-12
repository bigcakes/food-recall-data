import React, { Component } from 'react';
import { Link } from "react-router";
import logo from './logo.svg';
import './App.css';

import Search from './components/Search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recalls: [],
      selectedRecall: null
    };
  }

  recallSearch(term) {
    const escapedTerm = encodeURIComponent(term);

    this.props.router.push(`/recalls/${escapedTerm}`);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Link 
            to={{ pathname: `/` }} >
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <h2>Food Recalls</h2>
        </div>
        <Search onSearchTermChange={(term) => this.recallSearch(term)} term={this.props.params.recallType || ""} />
        {React.cloneElement(this.props.children, { ...this.props })}
      </div>
    );
  }
}

export default App;
