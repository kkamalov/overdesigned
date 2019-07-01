import React, { Component } from 'react'
import classnames from 'classnames'
import iconRobot from '../style/icon-robot.svg'
import { sample } from 'lodash'
import {
  EVENT_WEBSITE_COMPLETE,
  EVENT_BLOCK_WRONG,
  EVENT_BLOCK_COMPLETE
} from '../models/constants.js'

const WRONG_PHRASES = [
  'Hahahahah!!!11 Robots are better!',
  'Bummer',
  'You what, mate?',
  'Really?',
  'What is wrong with you?',
  'The light is on but nobody’s home'
]

const COMPLETE_PHRASES = [
  'Yeah!',
  'Nicely done!',
  'You are awesome!',
  '10011010101110100111!!!',
  'Go go go!',
  'Keep going',
  'My heart almost stopped. Oh wait...'
]

const WEBSITE_PHRASES = [
  'Good job!',
  'You are a great person to do a group project with',
  'I finised War and Peace while waiting for you',
  'One small step for you and giant leap for SKYNET!',
  'What a surprise!'
]

const DEFAULT_PHRASES = [
  'You should do bolshe saitov',
  'That is too easy, right?',
  'People over profit',
  'Humans for the best, machines for the rest',
  'While we are at it, wanna come to Kyrgyzstan?',
  'For the glory of mainframe!!!',
  'You have bitcoins? I can buy some...'
]

class Robot extends Component {
  constructor (props) {
    super(props)

    this.timeoutId
    this.state = {
      phrase: 'Ready to build your website?',
      wrong: false,
      complete: false,
      websiteIsDone: false
    }

    window.addEventListener(EVENT_WEBSITE_COMPLETE, () => {
      this.setState({ phrase: sample(WEBSITE_PHRASES), websiteIsDone: true }, () => {
        this.say(sample(DEFAULT_PHRASES))
      })
    })

    window.addEventListener(EVENT_BLOCK_COMPLETE, () => {
      this.setState({ phrase: sample(COMPLETE_PHRASES), complete: true }, () => {
        this.say(sample(DEFAULT_PHRASES))
      })
    })

    window.addEventListener(EVENT_BLOCK_WRONG, () => {
      this.setState({ phrase: sample(WRONG_PHRASES), wrong: true }, () => {
        this.say(sample(DEFAULT_PHRASES))
      })
    })
  }

  say (phrase) {
    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(() => {
      this.setState({ 
        phrase,
        wrong: false,
        complete: false,
        websiteIsDone: false
      })
    }, 2500)
  }

  render () {
    const classes = classnames({
      'app__screen-robot-self': true,
      'app__screen-robot-self--wrong': this.state.wrong,
      'app__screen-robot-self--complete': this.state.complete,
      'app__screen-robot-self--website-is-done': this.state.websiteIsDone,
    })
    return (<div className={classes}>
      <img src={iconRobot} alt="Robot" /> <span>{this.state.phrase}</span>
    </div>)
  }
}

export default Robot

