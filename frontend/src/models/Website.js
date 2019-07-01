import React from 'react'

import uuid from 'uuid/v4';
import FillableLayout from '../ui/FillableLayout.js'
import Game from './Game.js'

export const WebsiteStatus = Object.freeze({
  'IN_PROGRESS': 0,
  'WAITING_APPROVAL': 1,
  'REJECTED': 2,
  'COMPLETE': 3,
  'FAILED': 4
})

export class Website {
  constructor(timer, layout, name, preview, theme) {
    this.timer = timer
    this.layout = layout
    this.name = name
    this.preview = preview
    this.theme = theme
    this.status = WebsiteStatus.IN_PROGRESS
    this.uuid = uuid()
    this.score = 0

    this.sectionUuidToLayoutSection = {}

    this.layout.rows.forEach((row) => {
        this.sectionUuidToLayoutSection[row.section.uuid] = row
    })
  }

  hasSection (section) {
    return section.uuid in this.sectionUuidToLayoutSection
  }

  sectionIsComplete (section) {
    return this.sectionUuidToLayoutSection[section.uuid].isComplete
  }

  markCompleteSection (section) {
    this.sectionUuidToLayoutSection[section.uuid].isComplete = true
    Game.score += 10
  }

  markWrongSection (section) {
    section.isWrong = true
  }

  wrongHit () {
    this.timer -= 15
  }

  round() {
    // Game Over.
    if (this.timer <= 0) {
      this.status = WebsiteStatus.FAILED
      Game.over()
    }
    this.timer--
  }

  getLayout() {
    return <FillableLayout rows={this.layout.rows}/>
  }

  // TODO: implement scoring based on layouts etc
  computeScore() {
    this.score++
    return this.score
  }
}
