import ModalWindow from 'views/modal/base/ModalWindow.js'

export default class ConfirmBox extends ModalWindow {

  constructor() {
    super('confirmBox');
  }

  show(message, options) {
    const defaults = {
      btnYesText: 'OK',
      btnNoText: 'Cancel'
    };
    Object.assign(defaults, options);
    this.open({ message, btnOkText: defaults.btnOkText });
    console.log(this);
    document.getElementById('msgBox-ok').addEventListener('click', (e) => {
      this.close();          
    });
  }

  showAsync(message, callback, options) {
    this.show(message, options);
    document.getElementById('msgBox-ok').addEventListener('click', callback);
  }
}