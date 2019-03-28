import templates from 'views/templates';
import EventEmitter from 'base/EventEmitter';

export default class Component extends EventEmitter {
  constructor(settings, model) {
    super();
    this.isActive = false;
    this.model = model;
    this.uses = settings.uses;

    this.render = (inCascade) => {
    // inCascade - флаг указывающий на то, рендерится объект сам по себе или его рендеринг
    // вызван родительским компонентом.
      if (!this.isActive)
        this.emit('activate', this);
      this.isActive = true;

      if (settings.slot) {
        if (!this.slot || inCascade) {
          this.slot = document.querySelector(settings.slot);
          if (!this.slot) throw new Error(`Slot >> ${this.slotSelector} << not found!`);
        }
        this.slot = render_slot(settings.template, this.model, this.slot);
      }
      else
        render_master(settings.template, this.model);

      if (settings.events) {
        this.setEvents();
      }

      if (this.children)
        for (let child of Object.values(this.children)) {
          child.render(true);
        }
    }

    if (settings.events) {
      this.setEvents = () => {
        for (let event of settings.events) {
          const element = document.querySelector(event.element);
          if (!element)
            throw new Error (`Can't assign listener for element >> ${event.element} <<. Element not found!`);
          element.addEventListener(event.on, (e) => {
            this.raiseEvent(event.emit, { component: this, nativeEvent: e });
          });
        }
      }
    }

    if (settings.children) {
      this.children = {};
      for (let child of Object.entries(settings.children)) {
        var key = child[0], componentSettings = child[1];
        this.children[key] = new Component(componentSettings, this.model);
        this.children[key].parent = this;
        this[key] = this.children[key]; // Исключительно, чтобы навигация по дереву была чуть приятнее
      }
    }

    if (settings.uses) {
      model.on('change', changed => {
        if (this.isActive) {
          for (let key of settings.uses) {
            if (key in changed) {
              this.render();
              return;
            }
          }
        }
      });
    }

  }


  raiseEvent(name, args) {
    if (this.handlers[name]) {
      this.emit(name, args);
    }
    // Если событие никем не отловлено оно передаётся родителю.
    else if (this.parent) {
      if (this.parent instanceof Component) {
        this.parent.raiseEvent(name, args);
      } else {
        this.parent.emit(name, args);
      }
    }
  }

  deactivate() {
    this.isActive = false;
    this.emit('deactivate', this);
    // Сюда же надо добавить отписку от событий DOM
    if (this.children) {
      for (let child of Object.values(this.children)) {
        child.isActive = false;
      }
    }
  }  
}

// Private

function getRenderer(name) {
  const renderer = templates['render_' + name];
  if (!renderer) {
    throw new Error(`Template >> ${name} << not found!`);
  }
  return renderer;
}

function render_master(template, data) {
  document.body.innerHTML = getRenderer(template)(data);
}

function render_slot(template,  data, slot) {

  const parent = slot.parentElement;
  const temp = document.createElement('template');

  temp.innerHTML = getRenderer(template)(data);
  
  const root = temp.content.firstElementChild;
  parent.insertBefore(root, slot);
  parent.removeChild(slot);

  return root;
}