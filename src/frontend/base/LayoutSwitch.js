import EventEmitter from 'base/EventEmitter';
import Component from 'base/Component';

// Надо бы это дело отнаследовать от Component, тогда будет действительно гибко.

export default class LayoutSwitch extends EventEmitter {
  constructor(tree) {
    super();
    for (let layout of Object.entries(tree)) {
      this[layout[0]] = new Component(layout[1]);
      this[layout[0]].parent = this;                // В статическом языке это было бы невозможно...
    }
    this.activeLayout = null;
  }

  switchTo(layoutName) {
    const layout = this[layoutName];
    if (layout) {
      if (this.activeLayout) {
        this.activeLayout.deactivate();
      }
      this.activeLayout = layout;
      layout.render();
    } else {
      throw new Error(`No layout >> ${layoutName} << found in this view`);
    }
  }
}