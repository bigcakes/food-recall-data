import React, { Component } from 'react';

class Recall extends Component {
  render() {
    return (
      <div>
        {this.props.params.recallType}
      </div>
    );
  }
}

export default Recall;