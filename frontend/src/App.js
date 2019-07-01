import React, { Component } from 'react';

import './style/board.css';
import './style/sections.css';

import Game from './models/Game.js'
import {GameStatus} from './models/Game.js'

import Logo from './ui/Logo.js'
import Label from './ui/Label.js'
import GameOverModal from './ui/GameOverModal.js'
import BlocksBoard from './ui/BlocksBoard.js'
import Robot from './ui/Robot.js'
import HowToModal from './ui/HowToModal.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameStarted: false,
      gameStatus: null,
      instructionsOpen: true
    }
    this.handleStart = this.handleStart.bind(this)
    this.handleInstructionModal = this.handleInstructionModal.bind(this)
    this.handleInstructionModalClose = this.handleInstructionModalClose.bind(this)
  }

  componentDidUpdate () {
    if (Game.status === GameStatus.OVER && this.state.gameStarted) {
      this.setState({
        gameStatus: GameStatus.OVER,
        gameStarted: false
      })
      this.blocksBoard.endAnimation()
    }
  }

  handleInstructionModal () {
    this.setState({
      instructionsOpen: true
    })
  }

  handleInstructionModalClose () {
    this.setState({
      instructionsOpen: false
    })
  }

  handleStart () {
    Game.reset()
    Game.start(this, () => {
      this.blocksBoard.startGame()
      this.setState({
        gameStarted: true,
        gameStatus: GameStatus.NEW,
        instructionsOpen: false
      })
    })
  }

  render() {
    const { gameStarted } = this.state
    return (
      <div className="app">
        <div className="app__main">
          <Logo
            howToClick={this.handleInstructionModal}
          />
          <Label label="[ Websites To Build ]"/>
          {Game.getTasks()}
          <Label className="m-t-20" label="[Selected Website Layout ]"/>
          <div className="app__main-layout">
            {Game.selectedWebsite && Game.selectedWebsite.getLayout()}
            <div className="od-s-site">
            </div>
          </div>
          <div className="app__main-copy">
            <p>Made with &hearts; by <a href="http://b12.io/?utm_source=overdesigned&utm_campaign=virus_game">B12</a>. Want to build a real cool website? <a href="http://b12.io/?utm_source=overdesigned&utm_campaign=virus_game">Go here and create one</a>!</p>

            <p class="text-sm text-gray">Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a>, <a href="https://www.flaticon.com/authors/simpleicon" title="SimpleIcon">SimpleIcon</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
          </div>
        </div>
        <div className="app__screen">
          <div className="app__screen-robot">
            <Robot />
            {gameStarted
              ? (
                <div className="app__screen-robot-score">
                  <span>Your score</span>
                  <div>{Game.score}</div>
                </div>
              )
              : (
                <div
                  className="app__screen-action-btn"
                  onClick={this.handleStart}
                >Start</div>
              )
            }
          </div>
          <div className="app__screen-playgro0und">
            <BlocksBoard
              ref={elem => (this.blocksBoard = elem)}
              onBlockClick={blockIndex => console.log(blockIndex)}
            />
          </div>
        </div>
        <GameOverModal
          open={this.state.gameStatus === GameStatus.OVER && !this.state.gameStarted}
          score={Game.score}
          startOver={this.handleStart}
        />
        <HowToModal
          open={this.state.instructionsOpen}
          start={this.handleInstructionModalClose}
        />
      </div>
    );
  }
}

export default App;
