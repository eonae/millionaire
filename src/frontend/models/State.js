'use strict';

import BaseModel from 'base/BaseModel';
import ajax from 'vendor/ajax';

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
    this.request('/api/try', { option });
  }

  flee() {
    this.request('./api/flee');
  }

  request(url, params) {
    ajax.get(url, params, (err, res) => {
      if (err) {
        this.emit('error', { model: this, err });
      } else {
        this.set(res);
      }
    });
  }
};