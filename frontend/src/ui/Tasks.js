import React, { Component } from 'react';
import Task from './Task.js'
import Game from '../models/Game.js'

class Tasks extends Component {
  render () {
    return (
      <div className="app__main-counters">
        <div className="app__main-counters-wrp">
          <div className="counters">{this.props.websites.map(website => (
            <Task
              key={website.name}
              name={website.name}
              timer={website.timer}
              selected={this.props.selected && website.uuid===this.props.selected.uuid}
              onSelect={() => {
                Game.selectWebsite(website)
              }}
            />
          ))}</div>
        </div>
      </div>
    )
  }
}

export default Tasks
