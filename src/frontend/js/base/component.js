// gameView < MasterComponent < Component < EventEmitter
// questionView < SlaveComponent < Component

import EventEmitter from 'base/eventEmitter';

export default class Component extends EventEmitter {
  constructor() {
    super();
  }
}
