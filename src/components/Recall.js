import React, { Component } from 'react';
import { debounce } from "../utility";

class Recall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRecall: {}
    };
  }
  
  getRecall = debounce((escapedRecallNumber) => {
    //TODO: Allow changing to different filters, reason, company, product, etc
    //TODO: Maybe do total count with graph, then individual listings?
    const FDA_URL = `https://api.fda.gov/food/enforcement.json?search=recall_number.exact:${escapedRecallNumber}&limit=1`;
    
    fetch(FDA_URL)
      .then((response) => {
        console.log("FDA", response);//, response.blob());
        
        if(response.ok) {
          return response.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((recallData) => {
        console.log("Single Recall Data", recallData);

        this.setState({
          selectedRecall: recallData.results[0]
        });
        
      }).catch(function(err) {
        //TODO: Handle a 404 (no results)
        console.log("Something went wrong", err);
      });
  }, 300)

  componentDidMount() {
    const escapedTerm = encodeURIComponent(this.props.params.recallNumber);
    
    if (escapedTerm) {
      this.getRecall(escapedTerm);
    }
  }

  render() {
    const recall = this.state.selectedRecall;

    return (
      <div>
        I am a recall detail item { recall.recall_number }
      </div>
    );
  }
}

export default Recall;