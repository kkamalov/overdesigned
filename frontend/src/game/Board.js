import View from '../engine/View.js';
import Block from './Block.js';

import React, { Component } from 'react';

class BoardComponent extends Component {
  render () {
    return <div className="board__container" children={this.props.children} />
  }
}

class Board extends View {

  created = false

  update () {
    super.update()

    if (!this.created) {
      this.addView(new Block())
      this.created = true
    }
  }

  renderComponent (children) {
    return <BoardComponent view={this} children={children} />
  }
}

export default Board
