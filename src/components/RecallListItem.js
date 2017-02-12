import React, { Component } from 'react';
import { Link } from "react-router";

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

    return (
      <Link 
        to={{ pathname: `/recall/${recall.recall_number}` }} 
        className="list-group-item list-group-item-action">
        <div className="justify-content-between w-100 d-flex">
          <h3>{ recall.recalling_firm }</h3>
          <h5><span className={`badge ${badgeClass}`}>{ recall.classification }</span></h5>
        </div>

        <p>{ recall.product_description }</p>
      </Link>
    );
  }
      /*<li className="list-group-item">
        {this.props.data.product_description}
      </li>*/
}

export default RecallListItem;

// "country": "United States",
// "city": "Penn St Univ",
// "reason_for_recall": "Erring on the side of caution and safety for the consuming public, the University Creamery at Penn State is voluntarily recalling all ice cream and frozen yogurt made between May 16, 2012 and August 11, 2012 because of isolated incidents involving reports of small plastic foreign objects in the product.  ",
// "address_1": "119 Food Science Bldg",
// "address_2": "",
// "code_info": " Best by dates falling on or between February 10, 2013 and August 11, 2013.",
// "product_quantity": "",
// "center_classification_date": "20121108",
// "distribution_pattern": "On site retail salesroom and internet customers",
// "state": "PA",
// "product_description": "Penn State Creamery/Berkey Creamery Ice Cream -- Keeny Beany Chocolate flavor; 3 gallon (paper), 1/2 gallon (paper) and pints (plastic)",
// "report_date": "20121114",
// "classification": "Class II",
// "openfda": {},
// "recall_number": "F-0642-2013",
// "recalling_firm": "Pennsylvania State University  Berkey Creamery",
// "initial_firm_notification": "Two or more of the following: Email, Fax, Letter, Press Release, Telephone, Visit",
// "event_id": "63447",
// "product_type": "Food",
// "termination_date": "20140131",
// "recall_initiation_date": "20120913",
// "postal_code": "16802-2604",
// "voluntary_mandated": "Voluntary: Firm Initiated",
// "status": "Terminated"