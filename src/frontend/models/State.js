'use strict';

import BaseModel from 'base/BaseModel';

export default class State extends BaseModel {
  constructor() {
    super({
      status: 0,
      player: 'Incognito'
    });
  }
};