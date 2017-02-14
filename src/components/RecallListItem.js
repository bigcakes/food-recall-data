import React, { Component } from 'react';
import { Link } from "react-router";

import './RecallListItem.css';

class RecallListItem extends Component {
  getBadgeClass(classification) {
    switch(classification) {
      case "Class III":
        return "badge-danger";
      case "Class II":
        return "badge-warning";
      default:
        return "badge-info";
    }
  }

  render() {
    const recall = this.props.data;
    const badgeClass = this.getBadgeClass(recall.classification);
    const initiationDate = recall.recall_initiation_date.replace(
        /(\d\d\d\d)(\d\d)(\d\d)/, '$2/$3/$1'
    );

    return (
      <Link 
        to={{ pathname: `/recall/${recall.recall_number}` }} 
        className="list-group-item list-group-item-action">
        <div className="justify-content-between w-100 d-flex">
          <h3>{ recall.recalling_firm } <small className="recall-date">{ initiationDate }</small></h3>
          <h5><span className={`badge ${badgeClass}`}>{ recall.classification }</span></h5>
        </div>

        <small>{ recall.product_description }</small>
      </Link>
    );
  }
}

export default RecallListItem;