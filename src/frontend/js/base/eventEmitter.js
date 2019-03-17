export default class EventEmitter {

  constructor() {
    this.handlers = {};
  }
  
  on(eventName, handler) {
      if (eventName in this.handlers) {
          this.handlers[eventName].push(handler);
      } else {
          this.handlers[eventName] = [ handler ];
      }
  };

  off(eventName, handler) {
      //..
  };

  emit(eventName, args) {
      if (eventName in this.handlers) {
          for (var handler of this.handlers[eventName]) {
              setTimeout(() => { handler(args); }, 0);
          }
      }
  }
}