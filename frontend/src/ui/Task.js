import React, { Component } from 'react';
import {WEBSITE_TIMER} from '../models/constants.js'
import Game from '../models/Game.js'

class Task extends Component {
  render () {
    const percentage = parseInt(this.props.timer*100/WEBSITE_TIMER, 10)
    let color

    if (percentage > 70) {
      color = 'lime'
    } else if (percentage > 40) {
      color = 'orange'
    } else {
      color = 'red'
    }

    const width = percentage + '%'
    const className = `counter ${this.props.selected ? 'selected' : ''}`
    return (
        <div className={className} onClick={this.props.onSelect}>
          <h4>{this.props.name}</h4>
          <div className="counter__time">
            <div className="counter__time-left" style={{width: width, background: color }}></div>
          </div>
        </div>
    )
  }
}

export default Task
