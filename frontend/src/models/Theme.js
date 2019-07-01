// Does not have to be a class
class Theme {
  constructor(name) {
    this.name = name
  }

  static generateThemes() {
    return [
      new Theme('Pet Care'),
      new Theme('Utilities'),
      new Theme('Animals'),
      new Theme('Services'),
      new Theme('Veterinary')
    ]
  }
}

export default Theme
