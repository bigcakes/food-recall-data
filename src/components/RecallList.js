import React, { Component } from 'react';

import RecallListItem from "./RecallListItem";
import { debounce } from "../utility";

import './RecallList.css';

class RecallList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recalls: [],
      selectedRecall: null
    };
  }

  refreshRecalls = (escapedTerm, sameTerm = false) => {
    //TODO: Allow changing to different filters, reason, company, product, etc
    //TODO: Maybe do total count with graph, then individual listings?
    //https://open.fda.gov/food/enforcement/
    //https://open.fda.gov/food/enforcement/reference/
    //const FDA_URL = `https://api.fda.gov/food/enforcement.json?search=reason_for_recall:${escapedTerm}&count=report_date`;
    const skip = sameTerm ? this.state.recalls.length : 0;
    const FDA_URL = `https://api.fda.gov/food/enforcement.json?search=product_description:${escapedTerm}&limit=10&skip=${skip}`;
    
    fetch(FDA_URL)
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
        else {
          this.setState({
            term: escapedTerm,
            totalRecalls: 0,
            recalls: [],
          });
        }
      })
      .then((recallData) => {
        console.log("Recall Data", recallData);

        if (sameTerm) {
          this.setState({
            term: escapedTerm,
            totalRecalls: recallData.meta.results.total,
            recalls: [...this.state.recalls, ...recallData.results],
          });
        }
        else {
          this.setState({
            term: escapedTerm,
            totalRecalls: recallData.meta.results.total,
            recalls: recallData.results,
          });
        }
      });
  }

  refreshRecallsDebounced = debounce(this.refreshRecalls, 500)

  loadMore = () => {
    this.refreshRecalls(this.state.term, true);
  }

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

    this.refreshRecallsDebounced(escapedTerm);
  }

  renderRecall(recall) {
    return (
      <RecallListItem key={recall.recall_number} data={recall} />
    );
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {this.state.totalRecalls !== 0 &&
          <div className="text-center">
            <span>{ `${this.state.recalls.length} of ${this.state.totalRecalls} recalls` }</span>
          </div>
          }
          <ul className="list-group recall-list">
            {this.state.recalls.map(this.renderRecall)}
            {this.state.totalRecalls === 0 &&
              <li className="list-group-item justify-content-center">
                <h3>No results found :(</h3>
              </li>
            }
          </ul>
          {this.state.recalls.length < this.state.totalRecalls &&
            <div className="row justify-content-center">
              <div className="col-sm-8">
                <button onClick={this.loadMore} className="btn btn-primary btn-outline-primary btn-block">More</button>            
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default RecallList;