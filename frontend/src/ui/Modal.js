import React from 'react';
import classnames from 'classnames'

export default function Modal(props) {
  const classNames = classnames('modal', {
    hidden: !props.open
  })
  return (
    <div className={classNames}>
      <div className="modal__content">
        {props.children}
      </div>
    </div>
  )
}
