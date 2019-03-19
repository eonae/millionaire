import templates from 'views/templates/templates.js'
import EventEmitter from 'base/EventEmitter.js';

export default class ModalWindow extends EventEmitter {

  constructor(template) {
    super();
    this.template = template;
    this.wrapper = document.createElement('div');
    this.output = {};
  }
  
  open(data) {

    const render = templates[`render_${this.template}`];
    if (render) {
      this.wrapper.innerHTML = render(data);
      document.body.appendChild(this.wrapper);
      this.emit('open', {}); // ....
    }
    else {
      throw new Error(`Template ${this.template} not found!`);
    }
  }

  close() {
    document.body.removeChild(this.wrapper);
    this.emit('close', this.output);
  }

}