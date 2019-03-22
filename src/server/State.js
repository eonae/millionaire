module.exports = class State {
  constructor() {
    this._name = null;
    this._activeGame = null;
    this.status = 0; // Just came 1 --has session open 2 --has active game;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
    this.status = 1;
  }
}