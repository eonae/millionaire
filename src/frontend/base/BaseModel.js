import EventEmitter from 'base/EventEmitter';
import ajax from 'vendor/ajax';

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

  request(url, params, callback, surpress) {
    ajax.get(url, params, (err, res) => {
      if (err) {
        this.emit('error', { model: this, err });
      } else {
        if (!surpress) this.set(res);
        if (callback) setTimeout(() => callback(res), 0); //Надо ли?

      }
    });
  }
}