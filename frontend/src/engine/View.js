import uuid from 'uuid/v4';

class View {
  views = []
  parent = null
  uuid = null

  constructor () {
    this.uuid = uuid()
  }

  setParent (parent) {
    this.parent = parent
  }

  addView (view) {
    view.setParent(this)
    this.views.push(view)
  }

  update () {
    this.views.forEach(view => view.update())
  }

  getReactComponents () {
    return this.views.map(view => view.renderComponent(view.getReactComponents()))
  }

  renderComponent (children) {
    throw new Error('Method is not implemented.')
  }
}

export default View
