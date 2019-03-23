import MessageBox from 'vendor/modals/MessageBox';
import ConfirmBox from 'vendor/modals/ConfirmBox';
import InputBox from 'vendor/modals/InputBox';

export default {

  messageBox(options, callback) {
    new MessageBox(options, callback).show();
  },

  confirmBox(options, callback) {
    new ConfirmBox(options, callback).show();
  },

  inputBox(options, callback) {
    new InputBox(options, callback).show();

    /*
      На будущее:
      new InputBox({
        validation: {
          constraint: 'email',
          type: 'submit || 'input'
        },
        placeholder: '...'
      }, (value) => {
        // do something;
      }
      )
    */
  }
}