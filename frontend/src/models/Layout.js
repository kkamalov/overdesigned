import {sample, filter} from 'lodash'

import {SectionType, SectionStructure, Section} from './Section.js'
import Game from './Game.js'

import {VARIATIONS} from './constants.js'

export class LayoutSection {
  constructor(section) {
    this.section = section
    this.isComplete = false
  }

  // TODO: add logic for matching a section
}

export class Layout {

  _generateExtraLayoutSection() {
    const extraRows = sample([1, 2, 3, 4])
    const itemsPerRow = [1, 2, 3]
    const rows = []
    const sectionStructures = [SectionStructure.ABOUT,
                               SectionStructure.TESTIMONIAL]

    for (let i=0; i<extraRows; i++) {
      const numSections = sample(itemsPerRow)
      const variation = sample(VARIATIONS)
      const sectionStructure = sample(sectionStructures)
    }
  }

  getRandomSection() {
    return sample(this.rows).section
  }


  constructor(level, name) {

    var matches = name.match(/\b(\w)/g)
    const acronym = matches.join('')
    const color = 'light'

    const header = new Section(SectionStructure.HEADER(sample(VARIATIONS), color, acronym))
    const hero = new Section(SectionStructure.HERO(sample(VARIATIONS), color, acronym))
    const about = new Section(SectionStructure.ABOUT(sample(VARIATIONS), color, acronym))
    const testimonial = new Section(SectionStructure.TESTIMONIAL(sample(VARIATIONS), color, name))
    const services = new Section(SectionStructure.SERVICES(sample(VARIATIONS), color, name))
    const footer = new Section(SectionStructure.FOOTER(sample(VARIATIONS), color, acronym))

    if (level === 0) {
      this.rows = [
        new LayoutSection(header),
        new LayoutSection(about),
        new LayoutSection(footer)
        ]
    } else if (level === 1) {
      this.rows = [
        new LayoutSection(header),
        new LayoutSection(hero),
        new LayoutSection(about),
        new LayoutSection(footer)
      ]
    } else {
      this.rows = [
        new LayoutSection(header),
        new LayoutSection(hero),
        new LayoutSection(about),
        new LayoutSection(testimonial),
        new LayoutSection(services),
        new LayoutSection(footer)
      ]
    }
    // TODO: Generate layout based on level difficulty
  }

  isComplete() {
    const incompleteSections = filter(this.rows, (row) => {
      return !row.isComplete
    })
    return incompleteSections.length === 0
  }
}

export default Layout
