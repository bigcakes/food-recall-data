import React, { Component } from 'react';

import './Recall.css';

class Recall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRecall: null
    };
  }
  
  getRecall = (escapedRecallNumber) => {
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
  }

  componentDidMount() {
    const escapedTerm = encodeURIComponent(this.props.params.recallNumber);
    
    if (escapedTerm) {
      this.getRecall(escapedTerm);
    }
  }

  render() {
    const recall = this.state.selectedRecall;
    if (!recall) {
      return (
        <div className="text-center">Loading...</div>
      )
    }

    const initiationDate = recall.recall_initiation_date.replace(
        /(\d\d\d\d)(\d\d)(\d\d)/, '$2/$3/$1'
    );

    return (
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card card-outline-info recall-card">
            <div className="card-block">
              <h4 className="card-title">{ recall.recalling_firm }</h4>
              <div className="row">
                <dt className="col-sm-3">Recall Initiation Date</dt>
                <dd className="col-sm-9">{ initiationDate }</dd>
                <dt className="col-sm-3">Reason for Recall</dt>
                <dd className="col-sm-9">{ recall.reason_for_recall }</dd>
                <dt className="col-sm-3">Product Identification</dt>
                <dd className="col-sm-9">{ recall.code_info }</dd>
              </div>

              <dt>Product Description</dt>
              <dd><small>{ recall.product_description }</small></dd>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recall;

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