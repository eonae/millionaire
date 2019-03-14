let _this;

export default class ModalWindow {

  constructor(templateId) {
    var source = document.getElementById(templateId).innerHTML;
    this.__template = Handlebars.compile(source);
    this.__mw = document.createElement('div');
    _this = this;
  }
  
  open(data) {
    debugger;
    this.__mw.innerHTML = this.__template(data);
    document.body.appendChild(this.__mw);
    setTimeout(this.close, 2000);
  }

  close() {
    document.body.removeChild(_this.__mw);
  }

}