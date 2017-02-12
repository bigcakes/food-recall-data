import React, { Component } from 'react';

import RecallListItem from "./RecallListItem";
import { debounce } from "../utility";

class RecallList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recalls: [],
      selectedRecall: null
    };
  }

  refreshRecalls = debounce((escapedTerm) => {
    //TODO: Allow changing to different filters, reason, company, product, etc
    //TODO: Maybe do total count with graph, then individual listings?
    //const FDA_URL = `https://api.fda.gov/food/enforcement.json?search=reason_for_recall:${escapedTerm}&count=report_date`;
    const FDA_URL = `https://api.fda.gov/food/enforcement.json?search=product_description:${escapedTerm}&limit=10`;
    
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


        this.setState({
          recalls: recallData.results,
          selectedRecall: recallData.results[0]
        });
        
      }).catch(function(err) {
        //TODO: Handle a 404 (no results)
        console.log("Something went wrong", err);
      });
  }, 300)

  componentDidMount() {
    const escapedTerm = encodeURIComponent(this.props.params.recallType);
    
    if (escapedTerm) {
      this.refreshRecalls(escapedTerm);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const escapedTerm = this.props.params.recallType;

    if (prevProps.params.recallType === escapedTerm) {
      return;
    }

    this.refreshRecalls(escapedTerm);
  }

  renderRecall(recall) {
    return (
      <RecallListItem key={recall.recall_number} data={recall} />
    );
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.recalls.map(this.renderRecall)}
          </ul>
        </div>
      </div>
    );
  }
}

export default RecallList;