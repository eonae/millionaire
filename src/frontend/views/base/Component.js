'use strict'

import templates from 'views/templates/templates';
import EventEmitter from 'base/EventEmitter';

// Private

function getRenderer(name) {
  const renderer = templates['render_' + name];
  if (!renderer) throw new Error(`Template >> ${name} << not found!`);
  return renderer;
}

function render_master(template, data) {
  document.body.innerHTML = getRenderer(template)(data);
}

function render_slot(template,  data, slot) {

  const parent = slot.parentElement;
  const temp = document.createElement('template');

  temp.innerHTML = getRenderer(template)(data);
  
  //debugger;
  const root = temp.content.firstElementChild;
  parent.insertBefore(root, slot);
  parent.removeChild(slot);

  return root;
}

// Class

export default class Component extends EventEmitter {
  constructor(settings) {
    super();
    this.data = settings.data;
    if (settings.slot) {
      this.slotSelector = settings.slot;
    }

    if (settings.children) {
      this.children = settings.children;
      Object.assign(this, settings.children); // Для более простого доступа.
    }

    this.render = () => {
      //debugger;
      if (this.slotSelector) {
        if (!this.slot) {
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
          child.render();
        }
    }

    if (settings.events) {
      this.setEvents = () => {
        for (let event of settings.events) {
          const element = document.querySelector(event.element);
          if (!element)
            throw new Error (`Can't assign listener for element >> ${event.element} <<. Element not found!`);
          element.addEventListener(event.on, (e) => {
            this.emit(event.emit, Object.assign(e, this.data)); // насчёт аргументов надо подумать.... Могут быть конфликты...
          });
        }
      }
    }

    if (settings.data) {
      this.setData = (entries) => {
        Object.assign(this.data, entries);
        this.render();
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