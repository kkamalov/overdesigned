import React, { Component } from 'react';
import { times, forEach, find } from 'lodash';
import {TweenMax, Linear, TimelineMax} from 'gsap';
import Game from '../models/Game.js';
import {EVENT_WEBSITE_COMPLETE} from '../models/constants.js';
import uuid from 'uuid/v4';
import classnames from 'classnames'

const SPEED = 15
const STAGGER_DELAY = 2

class BlockComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isWrong: this.props.model.isWrong,
      isComplete: this.props.model.isComplete
    }
  }

  render () {
    return <div
      data-uuid={this.props.uuid}
      className={classnames({
        block: true,
        'block--wrong': this.state.isWrong,
        'block--complete': this.state.isComplete
      })}
      onClick={() => {
        const isComplete = Game.selectedWebsite.hasSection(this.props.model.section) && 
          !Game.selectedWebsite.sectionIsComplete(this.props.model.section)
        const isWrong = !isComplete
        this.setState({
          isComplete, isWrong
        })

        // Notify game engine
        this.props.model.clicked = true
      }}
    >
      {this.props.model.section.structure}
    </div>
  }
}

class BlocksBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blocks: Game.generateBlockSections().map((blockSection) => {
        return this.generateNewBlock(blockSection)
      })
    }
    this.animation = new TimelineMax({
      onComplete: this.handleOnAnimationComplete.bind(this)
    })
    this.waveCounter = 0
  }

  handleOnAnimationComplete () {
    if (this.gameStarted) {
      this.state = {
        blocks: Game.generateBlockSections().map( (blockSection) => {
          return this.generateNewBlock(blockSection)
        })
      }

      // Show next wave message
      console.log('Next wave is comming!!!')

      // Restart animation
      this.startAnimation()
    }
  }

  generateNewBlock (blockModel) {
    return (<BlockComponent
      key={blockModel.uuid}
      uuid={blockModel.uuid}
      model={blockModel}
    />)
  }

  startGame () {
    this.gameStarted = true
    this.waveCounter = 0

    this.setState({
      blocks: Game.generateBlockSections().map((blockSection) => {
        return this.generateNewBlock(blockSection)
      })
    }, () => {
      this.startAnimation()
    })
  }

  endAnimation () {
    this.animation.kill()
  }

  startAnimation () {
    this.animation.clear()
    const blockElements = document.getElementsByClassName('block')

    // Set initial position
    forEach(blockElements, block => {
      const pos = Math.floor((Math.random() * 150) + 1)
      TweenMax.set(block, {
        x: `${pos}%`,
        y: '-150%',
        opacity: 1
      })
    })
    const speed = !this.waveCounter
      ? SPEED
      : this.waveCounter === 3
        ? 5
        : SPEED - this.waveCounter
    this.animation.add(TweenMax.staggerTo(
      blockElements,
      speed,
      {
        y : this.boardWrap.offsetHeight + 300,
        yoyo: true,
        ease: Linear.easeNone,
        onComplete: () => {
          // Make visible false
          // console.log(arguments)
        },
      },
      STAGGER_DELAY
    ))
    this.waveCounter++
  }

  componentDidMount () {
    window.addEventListener(EVENT_WEBSITE_COMPLETE, this.startGame.bind(this))
  }

  render () {
    return (
      <div
        id="blocks-board"
        className="blocks-board"
        ref={elem => (this.boardWrap = elem)}
      >
        {this.state.blocks}
      </div>
    )
  }
}

export default BlocksBoard


