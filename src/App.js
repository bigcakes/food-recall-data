import React, { Component } from 'react';
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
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Food Recall Data</h2>
        </div>
        <Search onSearchTermChange={(term) => this.recallSearch(term)} term={this.props.params.recallType || ""} />
        {React.cloneElement(this.props.children, { ...this.props })}
      </div>
    );
  }
}

export default App;
