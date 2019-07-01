import React from 'react'
import {forEach, filter, sample, shuffle} from 'lodash'

import {Layout} from './Layout.js'
import {Section, BlockSection} from '../models/Section.js'
import Theme from './Theme.js'
import {Website} from './Website.js'
import {
  WEBSITE_TIMER,
  NEW_WEBSITE_TIMER,
  EVENT_WEBSITE_COMPLETE,
  EVENT_BLOCK_COMPLETE,
  EVENT_BLOCK_WRONG,
  BLOCKS_SIZE
} from './constants.js'

import Tasks from '../ui/Tasks.js'

import {generateName} from '../utils/name.js'

const ROUND_SCORE_DENOMINATOR = 5

export const GameStatus = Object.freeze({
    'NEW': 0,
    'ACTIVE': 1,
    'OVER': 2
})

class Game {
  reset () {
    this.roundCounter = 0
    this.level = 0
    this.score = 0
    this.newWebsiteTimer = 0
    this.status = GameStatus.NEW
    this.config = {}

    // Probably needs to be put in redux
    this.themes = Theme.generateThemes()

    // Visible falling block sections mapping
    // uuid -> blockSection
    this.blockSections = []

    // TODO(maybe move to redux)
    this.websites = { active: [], completed: [] }
  }

  constructor() {
    this.reset()
  }

  getNotSelectedActiveWebsites () {
    if (!this.selectedWebsite) {
      return this.websites.active
    }
    return filter(this.websites.active, (website) => {
      return website.uuid !== this.selectedWebsite.uuid
    })
  }

  start (react, cb) {
    this.status = GameStatus.ACTIVE

    // Create new website and select it
    this.selectedWebsite = this.addWebsite()

    // Add two extra websites
    this.addWebsite(30)
    this.addWebsite(30)

    this.round()
    this.config.interval = setInterval(() => {
      // Round logic
      this.round()
      // Render logic
      react.forceUpdate()
    }, 500)
    cb()
  }

  generateWebsiteName(theme) {
    return `${generateName()} ${theme.name}`
  }

  // Game Over.
  over () {
    this.status = GameStatus.OVER
    clearInterval(this.config.interval)
  }

  /*
    Scoring:

    Amount of rounds / ROUND_SCORE_DENOMINATOR
    Go through each website and aggregate the score
   */
  computeScore() {
    if (this.roundCounter % ROUND_SCORE_DENOMINATOR === 0) {
      this.score++
    }
  }

  addWebsite (extraTime) {
    let add = extraTime ? extraTime : 0
    const theme = sample(this.themes)
    const name = this.generateWebsiteName(theme)
    const layout = new Layout(this.level, name)
    this.level++

    const website = new Website(
      WEBSITE_TIMER + add,
      layout,
      name,
      null,
      theme
    )

    let websiteTimer = 0
    if (this.level > 2) {
      websiteTimer = 20
    }
    this.newWebsiteTimer = NEW_WEBSITE_TIMER - websiteTimer
    this.websites.active.push(website)

    if (!this.selectedWebsite) {
      this.selectedWebsite = website
    }
    return website
  }

  getTasks () {
    return <Tasks websites={this.websites.active} selected={this.selectedWebsite}/>
  }

  selectWebsite (website) {
    this.selectedWebsite = website
  }

  generateBlockSections () {
    const completed = this.websites.completed.length

    // Probably logic should not leave here
    let threshold = 30
    if (completed === 3) {
      threshold = 78 // divided by 6
    } else if (completed < 6) {
      threshold = 48 // divided by 6
    }
    const sectionNums = this.selectedWebsite ? Object.keys(this.selectedWebsite.sectionUuidToLayoutSection).length : 1

    const itemCount = threshold/sectionNums

    this.blockSections = []
    if (!this.selectedWebsite) {
      return this.blockSections
    }

    forEach(this.selectedWebsite.sectionUuidToLayoutSection, (layoutSection, uuid) => {
      for (let i=0; i < itemCount; i++) {
        this.blockSections.push(new BlockSection(layoutSection.section))
      }
    })

    const websites = this.getNotSelectedActiveWebsites()

    // select random sections from other websites
    if (websites.length) {
      for (let i=this.blockSections.length; i<BLOCKS_SIZE; i++) {
        const website = sample(websites)
        this.blockSections.push(new BlockSection(website.layout.getRandomSection()))
      }
    } else {
      for (let i=this.blockSections.length; i<BLOCKS_SIZE; i++) {
        this.blockSections.push(new BlockSection(Section.getRandomSection()))
      }
    }

    this.blockSections = shuffle(this.blockSections)
    return this.blockSections
  }

  round () {
    this.newWebsiteTimer--
    this.websites.active.forEach((website) => {
      website.round()
    })

    forEach(this.blockSections, (blockSection, uuid) => {
      // make it invisible
      if (blockSection.clicked) {
        blockSection.visible = false

        if (this.selectedWebsite.hasSection(blockSection.section) &&
          !this.selectedWebsite.sectionIsComplete(blockSection.section)) {
          // Mark block as selected correctly
          this.selectedWebsite.markCompleteSection(blockSection.section)
          window.dispatchEvent(new Event(EVENT_BLOCK_COMPLETE))
        } else {
          // Decrease time left to build a website
          window.dispatchEvent(new Event(EVENT_BLOCK_WRONG))
          this.selectedWebsite.wrongHit()
          this.selectedWebsite.markWrongSection(blockSection.section)
        }
      }
      // TODO(kkamalov): write logic for scoring here.
    })

    // TODO(kkamalov): Check whether current website is complete
    if (this.selectedWebsite && this.selectedWebsite.layout.isComplete()) {
      const completedWebsite = this.selectedWebsite
      this.websites.completed.push(completedWebsite)

      // Add 50 points to the score
      this.score += 50

      this.websites.active = filter(this.websites.active, (website) => {
        return website.uuid !== completedWebsite.uuid
      })

      if (this.websites.active.length) {
        this.selectedWebsite = this.websites.active[0]
      } else {
        this.selectedWebsite = null
      }

      window.dispatchEvent(new Event(EVENT_WEBSITE_COMPLETE))
    }

    // Get rid off all the invisible blocks
    this.blockSections = filter(this.blockSections, (blockSection) => {
      return blockSection.visible
    })

    // Generate new website if needed
    if (this.newWebsiteTimer <= 0) {
      this.addWebsite()
    }

    //TODO: Update scoring logic
    this.computeScore()

    // Round is over
    this.roundCounter++
  }
}

const gameInstance = new Game()
export default gameInstance
