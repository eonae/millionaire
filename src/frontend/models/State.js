'use strict';

import BaseModel from 'base/BaseModel';

export default class State extends BaseModel {

  constructor(data) {
    super(data);
  }

  setPlayer(player) {
    debugger;
    this.request('/api/player', { player });
  }

  startNewGame() {
    debugger;
    this.request('/api/new');
  }

  tryAnswer(option) {
    this.request('/api/try', { option });
  }

  flee() {
    this.request('./api/flee');
  }
};