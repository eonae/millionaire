import EventEmitter from 'base/EventEmitter';

export default class BaseModel extends EventEmitter {
  constructor(data) {
    super();
    if (data) this.set(data);
  }

  set(entries) {
    const changed = {};
    const keys = Object.keys(entries);
    keys.forEach(key => {
      if (this[key] !== entries[key]) {
        this[key] = entries[key];
        changed[key] = entries[key];
      }
    });
    this.emit('change', changed);
  }
}