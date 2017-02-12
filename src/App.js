import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recalls: [],
      selectedRecall: null
    };
  }

  recallSearch(term) {
    if (!term) {
      return;
    }

    const escapedTerm = encodeURIComponent(term);
    const FDA_URL = `https://api.fda.gov/food/enforcement.json?search=reason_for_recall:${escapedTerm}&count=report_date`;
    
    fetch(FDA_URL)
      .then((response) => {
        console.log("FDA", response);//, response.blob());
        
        if(response.ok) {
          return response.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((recallData) => {
        console.log("Recall Data", recallData);

        this.props.router.push(`/recall/${escapedTerm}`);

        this.setState({
          recalls: recallData.results,
          selectedVideo: recallData.results[0]
        });
        
      }).catch(function(err) {
        console.log("Something went wrong", err);
      });

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {React.cloneElement(this.props.children, { ...this.props, onSearchTermChange: this.recallSearch })}
      </div>
    );
  }
}

export default App;
