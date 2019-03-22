import util from 'util';
import modals from 'views/modal/modals';

export default class MainController {

  constructor(views) {
    this.views = views;
    this.activeView = null;
    debugger;
    this.views.mainView.on('play', () => {
      debugger;
      this.activate(this.views.gameView, {});
    });
  }

  update() {
    modals.inputBox({ message: 'Please enter your name:'}, (player) => {
      this.activate(this.views.mainView, { player });
    });
    // util.ajax('/state', {}, (state) => {
    //   switch(state.status) {
    //     case 0:
    //       modals.inputBox({ message: 'Please enter your name:'}, (name) => {
    //         this.activate(this.views.mainView, { name });
    //       });
    //       break;
    //     case 1:
    //       this.activate( this.views.mainVIew, { name: state.name });
    //       break;
    //     case 2:
    //       this.activate( this.views.gameView, state);
    //       break;
    //   }
    // });
  }

  activate(view, data) {
    if (this.activeView == view) {
      view.setData(data);
    } else {
      if (this.activeView)
        this.activeView.destroy();
      this.activeView = view;
      view.activate(data);
    }
  }
}