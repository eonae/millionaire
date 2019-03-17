import templates from './templates/templates.js'

const _mw = document.createElement('div');

export default class ModalWindow {

  constructor() {
  }
  
  open(data) {
    debugger;
    _mw.innerHTML = templates.render_message(data);
    document.body.appendChild(_mw);
    setTimeout(this.close, 2000);
  }

  close() {
    document.body.removeChild(_mw);
  }
}