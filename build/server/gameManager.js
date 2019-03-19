const Game = require('../deprecated/backend/game/game');
const _active = {};

class GameManager {

  get(sessionId) {
    return _active[sessionId];
  }

  start(sessionId) {
    _active[sessionId] = Game.create();
  }

  end(sessionId) {
    delete _active[sessionId];
  }

}

module.exports = new GameManager();