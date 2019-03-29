'use strict';

import BaseModel from 'base/BaseModel';

export default class State extends BaseModel {

  constructor(data) {
    super(data);
  }

  setPlayer(player) {
    this.request('/api/player', { player });
  }

  startNewGame() {
    this.request('/api/new');
  }

  tryAnswer(option) {
    this.request('/api/try', { option }, res => {
      if (res.result) {
        this.emit(res.result.toLowerCase(), res);
      } else {
        this.emit('correct', {});
      }
    });
  }

  flee() {
    this.request('./api/flee');
  }
};