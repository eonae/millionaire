'use strict';

import ajax from 'ajax.js';
import BaseModel from 'base/BaseModel';

export default class State extends BaseModel {

  constructor(initialState) {
    super(initialState);
  }

  setPlayer(player) {
    this.player = player; // C вызовом события.
    ajax.get('/api/player', { player }, (err, res) => {
      if (err) {
        this.emit('serverError', {
          model: this, message: 'startNewGame failed'
        });
      }
    });
  }

  startNewGame() {
    ajax.get('/api/new', {}, (err, res) => {
      if (err) {
        this.emit('serverError', {
          model: this, message: 'startNewGame failed'
        });
      } else {
        this.status = res.status;
        this.question = res.question;
        this.options = res.options;
        this.currentPosition = res.currentPosition;
        this.ladder = res.ladder;
      }
    });
  }

  tryAnswer(option) {
    ajax.get('/api/try', { option }, (err, res) => {
      if (err) {
        this.emit('serverError', {
          model: this, message: 'checking answer failed'
        });
      } else {
        if (res.correct) {
          if (res.status != 'win') {
            this.question = res.question;
            this.answers = res.answers;
            this.currentStage = this.currentStage++;
          } else {
            this.emit('win', { prize: res.prize });
          }
        } else {
          this.emit('loss', { correct: res.correct, option });
        }
      }
    });
  }

  flee() {
    ajax.get('/api/flee', {}, (err, res) => {
      if (err) {
        this.emit('serverError', {
          model: this, message: 'flee failed'
        });
      } else {
        this.emit('flee', { prize: res.prize });
      }
    });
  }
};