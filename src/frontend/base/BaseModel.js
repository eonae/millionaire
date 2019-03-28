import EventEmitter from 'base/EventEmitter';
import ajax from 'vendor/ajax';

export default class BaseModel extends EventEmitter {
  constructor(data) {
    super();
    if (data) this.set(data);
  }

  set(entries) {
    
    const keys = Object.keys(entries);
    keys.forEach(key => {
      this[key] = entries[key];
    });
    this.emit('change', keys);
  }

  request(url, params) {
    ajax.get(url, params, (err, res) => {
      if (err) {
        this.emit('error', { model: this, err });
      } else {
        debugger;
        this.set(res);
      }
    });
  }
}