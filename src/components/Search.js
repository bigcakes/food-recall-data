import React, { Component } from 'react';

const debounce = (fn, delay = 500) => {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.searchDebounce = debounce(this.props.onSearchTermChange, 300);
  }

  onInputChange(term) {
    this.setState({term});
    this.searchDebounce(term);
  }

  render() {
    return (
      <div className="row justify-content-center form-group">
        <div className="col-md-4">
          <input 
            type="text" 
            placeholder="What recall are you interested in?" 
            className="form-control"
            onChange={event => this.onInputChange(event.target.value)} />
        </div>
      </div>
    );
  }
}

export default Search;