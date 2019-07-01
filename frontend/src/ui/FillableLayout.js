import React, { Component } from 'react';

class FillableLayout extends Component {
  render () {
    const rows = []

    this.props.rows.forEach((row) => {
      rows.push(
        (<div className={`od-s-state -${row.isComplete}`}><div className="od-s-state__state"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.543 489.543" width="16" height="16"><g fill="#FFF"><path d="M270.024 0c-22.6 0-15 48.3-15 48.3s-48.3 133.2-94.5 168.7c-9.9 10.4-16.1 21.9-20 31.3-.9 2.3-1.7 4.5-2.4 6.5-3.1 6.3-9.7 16-23.8 24.5l46.2 200.9s71.5 9.3 143.2 7.8c28.7 2.3 59.1 2.5 83.3-2.7 82.2-17.5 61.6-74.8 61.6-74.8 44.3-33.3 19.1-74.9 19.1-74.9 39.4-41.1.7-75.6.7-75.6s21.3-33.2-6.2-58.3c-34.3-31.4-127.4-10.5-127.4-10.5-6.5 1.1-13.4 2.5-20.8 4.3 0 0-32.2 15 0-82.7 32.3-97.7-21.4-112.8-44-112.8zM127.324 465.7l-35-166.3c-2-9.5-11.6-17.3-21.3-17.3h-66.8l-.1 200.8h109.1c9.8.1 16.1-7.7 14.1-17.2z"/></g></svg></div>
         {row.section.structure}
         </div>))
    })
    return (
      <div className="wsl">
        {rows}
      </div>
    )
  }
}

export default FillableLayout
