'use strict';
import util from 'util';
import BaseModel from 'base/BaseModel';

export default class State extends BaseModel {

  constructor(initialState) {
    super(initialState);
  }

  startNewGame() {
    util.ajax('/api/new', {}, (err, res) => {
      if (err) {
        this.emit('serverError', {
          model: this, message: 'startNewGame failed'
        });
      } else {
        this.status = res.status;
        this.question = res.question;
        this.answers = res.answers;
        this.ladderCurrentStage = res.ladderCurrentStage;
        this.ladderStages = res.ladderStages;
      }
    });
  }

  tryAnswer(option) {
    util.ajax('/api/try', { option }, (err, res) => {
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
    util.ajax('/api/flee', {}, (err, res) => {
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