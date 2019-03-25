'use strict';

import ModalWindow from 'vendor/modals/base/ModalWindow.js'

export default class MessageBox extends ModalWindow {

  constructor(data, callback) {
    
    const settings = Object.assign({
      buttons: { positive: 'Continue' },
      message: ''
    }, (data instanceof Object) ? data : { message: data });

    super('messageBox', settings, callback);
  }

  show() {
    this.open();
    document.getElementById('positive').addEventListener('click', () => {
      this.close();
    });
  }
}