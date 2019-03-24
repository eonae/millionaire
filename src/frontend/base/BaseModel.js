import EventEmitter from 'base/EventEmitter';

export default class BaseModel extends EventEmitter {
  constructor(schema) {
    super();
    // schema представляет собой объект с необходимыми в модели свойствами и их начальными значениями.
    for (let prop of Object.keys(schema)) {
      const privateProp = '_' + prop
      this[privateProp] = schema[prop];
      Object.defineProperty(this, prop, {
        set: value => {

          const oldValue = this[privateProp];
          this[privateProp] = value;
          this.emit(prop + '_change', {
            model: this,
            changed: prop,
            oldValue,
            value
          });
        },
        get: () => {
          return this[privateProp];
        }
      });
    }
  }
  // Это будет работать только при изменении "корневых" свойств.
}