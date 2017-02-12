import React, { Component } from 'react';

import Recall from "./Recall";

class RecallList extends Component {
  renderRecall(recall) {
    return (
      <Recall data={recall} />
    );
  }

  render() {
    return (
      <div>
        {this.state.recalls.map(renderRecall)}
      </div>
    );
  }
}

export default RecallList;