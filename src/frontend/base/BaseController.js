export default class BaseController {

  constructor(views) {
    this.views = views;
    this.activeView = null;
  }

  show(view) {
    if (this.activeView) {
      this.activeView.deactivate();
    }
    this.activeView = view;
    view.render();
  }
}