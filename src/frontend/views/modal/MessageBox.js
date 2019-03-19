import ModalWindow from 'views/modal/base/ModalWindow.js'

export default class MessageBox extends ModalWindow {

  constructor() {
    super('messageBox');
  }

  show(message, options) {
    const data = {
      btnOkText: 'OK',
      message
    };
    Object.assign(data, options);
    this.open(data);
    document.getElementById('msgBox-ok').addEventListener('click', () => {
      this.close();
    });
  }

  showAsync(message, callback, options) {
    this.on('close', callback);
    this.show(message, options);
  }

}