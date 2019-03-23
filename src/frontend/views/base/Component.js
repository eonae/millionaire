'use strict'

import templates from 'views/templates/templates';
import EventEmitter from 'base/EventEmitter';

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

// Class

export default class Component extends EventEmitter {
  constructor(settings) {
    super();
    this.isActive = false;
    this.data = settings.data;
    // if (settings.slot) {
    //   this.slotSelector = settings.slot;
    // }

    this.render = (inCascade) => {
    // inCascade - флаг указывающий на то, рендерится объект сам по себе или его рендеринг
    // вызван родительским компонентом.
      this.isActive = true;
      if (settings.slot) {
        if (!this.slot || inCascade) {
          this.slot = document.querySelector(settings.slot);
          if (!this.slot) throw new Error(`Slot >> ${this.slotSelector} << not found!`);
        }
        this.slot = render_slot(settings.template, this.data, this.slot);
      }
      else
        render_master(settings.template, this.data);

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
            this.raiseEvent(event.emit, { component: this, nativeEvent: e }); // насчёт аргументов надо подумать.... Могут быть конфликты...
            // console.log (this.handlers);
          });
        }
      }
    }

    if (settings.data) {
      this.setData = (entries) => {
        Object.assign(this.data, entries);
        if (this.isActive) {
          this.render();
        }
      }
    }

    if (settings.children) {
      this.children = {};
      for (let child of Object.entries(settings.children)) {
        var key = child[0], componentSettings = child[1];
        this.children[key] = new Component(componentSettings);
        this.children[key].parent = this;
        this[key] = this.children[key]; // Исключительно, чтобы навигация по дереву была чуть приятнее
      }
    }
  }

  raiseEvent(name, args) {
    if (this.handlers[name]) {
      this.emit(name, args);
    }
    // Если событие никем не отловлено оно передаётся родителю.
    else if (this.parent) {
      this.parent.raiseEvent(name, args);
    }

  }

  deactivate() {
    this.isActive = false;
    if (this.children) {
      for (let child of Object.values(this.children)) {
        child.isActive = false;
      }
    }
  }  
}




/**
 * Виды компонентов:
  *  - master     - контейнер, рендерится прямо в body
  *  - switch     - контейнер, способный "переключать содержимое"
  *  - container  - контейнер, рендерится "замещением"
  *  - child      - "лист" дерева компонентов, вложенных компонентов не имеет.
  * 
  * Каждый компонет умеет:
  *  - рендерится
  *  - запускать рендер вложенных компонентов
  *  - самостоятельно обновляться при изменении данных.
  *  - эмиттить события.
  *  
 */