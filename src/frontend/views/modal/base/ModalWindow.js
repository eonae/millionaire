import templates from 'views/templates/templates.js'

export default class ModalWindow {

  constructor(template, data, callback) {
    this.wrapper = document.createElement('div');
    this.template = template;

    this.data = data;
    this.callback = callback;
    this.output = null;
  }
  
  open() {

    const render = templates[`render_${this.template}`];
    if (render) {
      this.wrapper.innerHTML = render(this.data);
      document.body.appendChild(this.wrapper);
    }
    else {
      throw new Error(`Template ${this.template} not found!`);
    }
  }

  close() {
    document.body.removeChild(this.wrapper);
    this.callback(this.output);
  }
}