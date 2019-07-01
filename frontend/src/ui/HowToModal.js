import React from 'react';
import Modal from './Modal.js'

import howToScreenshot from '../style/over_designed.png'
import iconRobot from '../style/icon-robot.svg'

export default function HowToModal(props) {
  return (
    <Modal open={props.open}>
      <div className="how-to-modal">
        <div className="how-to-modal__header">
          <div className="modal-score__robot app__screen-robot-self">
            <img src={iconRobot} alt="Robot" /> <span>Welcome, recruit!</span>
          </div>
          <div>
            <p>This is “over_designed”, a simulation of real world struggles that expert designers face everyday.  Build as many websites as you can in limited time and get the highest score!</p>
          </div>
        </div>
        <div>
          <ol>
            <li>On the left you will find websites to build</li>
            <li>Switch between websites by clicking their names</li>
            <li>Selected website will show incomplete layout</li>
            <li>Complete layouts by matching falling sections on the right</li>
            <li>The bar below website name shows time left to complete it</li>
          </ol>
          <img className="screenshot" src={howToScreenshot} alt="How to play" />
        </div>
        <div className="text-center">
          <button className="btn btn--primary" onClick={props.start}>Get Started </button>
        </div>
      </div>
    </Modal>
  )
}
