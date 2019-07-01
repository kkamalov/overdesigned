import React, { Component } from 'react';
import View from '../engine/View.js';

class BlockComponent extends Component {

  render () {
      return <div className="board__block">{this.props.children}</div>
  }
}

class Block extends View {
  renderComponent (children) {
    return <BlockComponent view={this} children={children} />
  }
}

export default Block
