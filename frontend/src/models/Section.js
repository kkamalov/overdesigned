import React from 'react';

import {sample} from 'lodash'
import iconPicture from '../style/icon-pic.svg'

import {VARIATIONS, COLOR_VARIATIONS} from './constants.js'
import uuid from 'uuid/v4';

import Game from './Game.js'

export class BlockSection {
  constructor(section) {
    this.section = section
    this.clicked = false
    this.uuid = uuid()

    // Once a block is not visible set it to false
    this.visible = true
  }
}

export const SectionStructure = {
  HEADER: (layoutOption, color, name) => {
    return (
      <div className={`od-s od-s--nav od-s--nav-${layoutOption} -${color}`}>
        <div className="od-s__logo">{name}</div>
        <ul className="od-s__nav-links">
          <li>Home</li>
          <li>About us</li>
          <li>Pricing</li>
        </ul>
        <div className="od-s__cta-wrp"><a className="od-s__cta" href="/">Get in touch</a></div>
        </div>)},
  HERO: (layoutOption, color) => {
    const random = Math.floor(Math.random() * 10)
    const hero = require(`../data/hero/${random}.jpeg`)
    return (
      <div className={`od-s od-s--hero od-s--hero-${layoutOption} -${color}`} style={{backgroundImage: `url(${hero})`}}>
        <h2>The Best Care for Your Best Friend</h2>
        <p>We’ve got a lot of experience in addressing most behavioral issues.</p>
        <a className="od-s__cta" href="/">Get in touch</a>
        </div>)},
  ABOUT: (layoutOption, color, name) => {
    const random = Math.floor(Math.random() * 10)
    const dog = require(`../data/dogs/${random}.jpeg`)
    return (
      <div className={`od-s od-s--about od-s--about-${layoutOption} -${color}`}>
        <div className={`od-s__about-image`}>
        <img src={dog} alt="Image" />
        </div>
        <div className={`od-s__about-text`}>
          <h2>Pet portrait services now available!</h2>
          <p>Stop by with your best friend to get a fully custom portrait</p>
        </div>
      </div>
    )},
  SERVICES: (layoutOption, color, name) => (
      <div className={`od-s od-s--services od-s--services-${layoutOption} -${color}`}>
        <div className={`od-s__head`}>Services for {name}</div>
        <div className={`od-s__services-wrp`}>
          <div className={`od-s__services`}>
            <h2>Dog walking</h2>
            <a href="/">Learn more</a>
          </div>
          <div className={`od-s__services`}>
            <h2>Dog running</h2>
            <a href="/">Learn more</a>
          </div>
          <div className={`od-s__services`}>
            <h2>Grooming</h2>
            <a href="/">Learn more</a>
          </div>
          <div className={`od-s__services`}>
            <h2>Daycare</h2>
            <a href="/">Learn more</a>
          </div>
          <div className={`od-s__services`}>
            <h2>Boarding!</h2>
            <a href="/">Learn more</a>
          </div>
          <div className={`od-s__services`}>
            <h2>Time with Kainar</h2>
            <a href="/">Learn more</a>
          </div>
          <div className={`od-s__services`}>
            <h2>Hugs</h2>
            <a href="/">Learn more</a>
          </div>
          <div className={`od-s__services`}>
            <h2>Fluffy candy</h2>
            <a href="/">Learn more</a>
          </div>
        </div>
      </div>
  ),
  TESTIMONIAL: (layoutOption, color, name) => {
    let random = Math.floor(Math.random() * 10)
    const testimonial1 = require(`../data/testimonials/${random}.jpg`)

    if (random > 7) {
      random = 0
    }
    const testimonial2 = require(`../data/testimonials/${random + 1}.jpg`)
    const testimonial3 = require(`../data/testimonials/${random + 2}.jpg`)

    return (
      <div className={`od-s od-s--testimonial od-s--testimonial-${layoutOption} -${color}`}>
        <div className={`od-s__head`}>Testimonials</div>
        <div className={`od-s__testimonial-wrp`}>
          <div className={`od-s__testimonial`}>
            <img src={testimonial1} alt="Image" />
            <h2>Patrick Star</h2>
          <p>I dont trust anyone else with my pets more than {name}.</p>
          </div>
          <div className={`od-s__testimonial`}>
            <img src={testimonial2} alt="Image" />
            <h2>Patrick Star</h2>
            <p>I dont trust anyone else with my pets more than {name}.</p>
          </div>
          <div className={`od-s__testimonial`}>
            <img src={testimonial3} alt="Image" />
            <h2>Patrick Star</h2>
        <p>I dont trust anyone else with my pets more than {name}.</p>
          </div>
        </div>
      </div>
    )},
  FOOTER: (layoutOption, color, name) => (
      <div className={`od-s od-s--footer od-s--footer-${layoutOption} -${color}`}>
        <div className="od-s__footer-col">
        <h2>{name}</h2>
        </div>
        <ul className="od-s__nav-links">
          <li>Home</li>
          <li>About us</li>
          <li>Pricing</li>
        </ul>
        <div className="od-s__footer-col">
          <h4>Reach out</h4>
          <p>gleb.surinov@gmail.com<br />
             +1234567890</p>
        </div>
        <div className="od-s__footer-col">
          <h4>Location</h4>
          <p>100 Lafayette Street<br />
          New York, NY 10013 US</p>
        </div>
      </div>
  )
}

export const SectionType = Object.freeze({
  'HEADER': 'HEADER',
  'HERO': 'HERO',
  'TEXT': 'TEXT',
  'ABOUT': 'ABOUT',
  'TESTIMONIAL': 'TESTIMONIAL',
  'SERVICES': 'SERVICES',
  'FOOTER': 'FOOTER'
})

// Generic section
export class Section {
  constructor(structure, name) {
    this.structure = structure
    this.name = name
    this.uuid = uuid()
  }

  static getRandomSection() {
    const theme = sample(Game.themes)
    const name = Game.generateWebsiteName(theme)

    const variation = sample(VARIATIONS)
    const color = sample(COLOR_VARIATIONS)

    const sectionStructure = sample(SectionStructure)
    return new Section(sectionStructure(variation, color, name), sectionStructure)
  }

  // TODO: actually do the logic
  static generateBaseSections() {
    return {
      HEADER: [new Section(SectionStructure.HEADER('one', 'Website'),
                           'Header 1')],
      HERO: [new Section(SectionStructure.HERO('one'),
                         'Hero')],
      ABOUT: [new Section(SectionStructure.ABOUT('one'),
                          'About Split')],
      TESTIMONIAL: [new Section(SectionStructure.TESTIMONIAL('one'),
                               'Testimonial')
                   ],
      SERVICES: [new Section(SectionStructure.SERVICES('one'),
                   'Services')
       ],
      FOOTER: [new Section(SectionStructure.FOOTER('one'),
                           'Footer')]
    }
  }
}
