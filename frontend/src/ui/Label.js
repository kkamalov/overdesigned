import React from 'react';
import classnames from 'classnames'

export default function Label(props) {
  const classNames = classnames('app__main-label', props.className)
  return (
    <div className={classNames}><span>{props.label}</span></div>
  )
}
