import React, { Component } from 'react';

import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.searchDebounce = this.props.onSearchTermChange; //debounce(this.props.onSearchTermChange, 300);
  }

  onInputChange(term) {
    //this.setState({term});
    //TODO: Maybe change this to be debounced again and not directly tied to the 
    //URL param being passed in, and instead just set the initial state in here based on the starting param?
    this.searchDebounce(term);
  }

  render() {
    return (
      <div className="row justify-content-center form-group">
        <div className="col-lg-4 col-md-8">
          <input 
            type="text" 
            placeholder="What recall are you interested in?" 
            className="form-control search-bar"
            value={this.props.term}
            onChange={event => this.onInputChange(event.target.value)} />
        </div>
      </div>
    );
  }
}

export default Search;