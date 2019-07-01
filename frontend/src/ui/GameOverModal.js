import React from 'react';
import Modal from './Modal.js'

import iconRobot from '../style/icon-robot.svg'

export default function GameOverModal(props) {
  return (
    <Modal open={props.open}>
      <div className="modal-score">
        <div className="modal-score__robot app__screen-robot-self">
          <img src={iconRobot} alt="Robot" /> <span>Congrats!</span>
        </div>
        <div className="modal-score__text">
          <h3>Your score is: <b>{props.score}</b></h3>
          <p>Want to see how professionals do it? We can help you build the website of your dreams!</p>
          <a className="btn btn--primary" href="http://b12.io/?utm_source=overdesigned&utm_campaign=virus_game" target="_blank">Build a real website</a> or <button className="btn" onClick={props.startOver}>Start over</button>
        </div>
      </div>
    </Modal>
  )
}
