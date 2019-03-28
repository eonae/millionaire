export default class BaseController {

  constructor(views) {
    this.views = views;
    this.activeView = null;
    debugger;
    //Object.values(views).forEach(v => binder(v));
  }

  show(view) {
    if (this.activeView) {
      this.activeView.deactivate();
    }
    this.activeView = view;
    debugger;
    view.render();
  }
}

function binder(component) {
  component.model.on('change', changed => {
    debugger;
    if (component.isActive) {
      console.log(component.uses);
      for (let key of component.uses) {
        if (changed.indexOf(key) != -1) {
          component.render();
          return;
        }
      }
    }
  });
  if (component.children) {
    Object.values(component.children).forEach(c => binder(c));
  }
}