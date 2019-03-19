/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/frontend/views/introView.js
let _$introView = document.querySelector('.introScreen');
let _startHandler = null;

class IntroView {

    constructor() {
        this.$btnStart = document.querySelector('#newGame');
        this.$btnStart.addEventListener('click', () => {
            _startHandler();
        });
    }

    setStartHandler(handler) {
        _startHandler = handler;
    }

    toggle() {
        _$introView.classList.toggle('hidden');
    }
}
// CONCATENATED MODULE: ./src/frontend/util.js
function constructGetUrl(url, paramsObj) {
    let query = url;
    if (paramsObj && Object.keys(paramsObj).length != 0) {
        let delim = '?';
        for (let key in paramsObj) {
            query += `${delim}${key}=${paramsObj[key]}`;
        }
    }
    return query;
}

/* harmony default export */ var util = ({

    // Обёртка над обыкновенным XHR-запросом.
    // Принимает url, объект с параметрами и callback, который будет вызван при получении ответа.
    ajax(url, params, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', constructGetUrl(url, params));
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                callback(JSON.parse(xhr.responseText));
            }
            else {
                callback(null, JSON.parse(xhr.responseText));
            }
        };
    },

    setInnerText(element, value) {
        element.textContent = value;
    },

    create(tagName, classList, text) {
        var $elem = document.createElement(tagName);
        if (classList) {
            for (var cls of classList)
                $elem.classList.add(cls);
        }
        if (text)
            $elem.textContent = text;
    
        return $elem;
    },

    getElements() {
        const elements = [];

        function push(selector) {
            const element = document.querySelector(selector);
            if (element) elements.push(element);
        }

        for (let argument of arguments) {
            if (argument instanceof Array) {
                for (let value of argument)
                    push(value);
            } else {
                push(argument);
            }
        }
        return elements;
    }
    // getElementsObj(values, keys) {
        


    // }
});
// CONCATENATED MODULE: ./src/frontend/base/eventEmitter.js
class EventEmitter {

  constructor() {
    this.handlers = {};
  }
  
  on(eventName, handler) {
      if (eventName in this.handlers) {
          this.handlers[eventName].push(handler);
      } else {
          this.handlers[eventName] = [ handler ];
      }
  };

  off(eventName, handler) {
      //..
  };

  emit(eventName, args) {
      if (eventName in this.handlers) {
          for (var handler of this.handlers[eventName]) {
              setTimeout(() => { handler(args); }, 0);
          }
      }
  }
}
// CONCATENATED MODULE: ./src/frontend/base/component.js
// gameView < MasterComponent < Component < EventEmitter
// questionView < SlaveComponent < Component



class component_Component extends EventEmitter {
  constructor() {
    super();
  }
}

// CONCATENATED MODULE: ./src/frontend/views/gameView.js



let _gw = document.querySelector('.gameScreen');

class gameView_GameView extends component_Component {

    constructor() {
        super();
        var elems = util.getElements('#quit', '#flee', '#percent', '#half', '.question', '.options');
        //debugger;
        //Object.assign(this, util);

        this.btnQuit = document.querySelector('#quit');
        this.btnFlee = document.querySelector('#flee');
        this.btnHintPercent = document.querySelector('#percent');
        this.btnHintHalf = document.querySelector('#half');
        this.questionField = document.querySelector('.question');
        this.optionButtonsPanel = document.querySelector('.options');
        this.optionButtons = Array.from(this.optionButtonsPanel.children);
    }

    toggle() {
        _gw.classList.toggle('hidden');
    }

    update() {
        var nextPrize = this._currentGame.rounds[this._currentGame.current].prize;
        var prize = this._currentGame.prize;
        switch (this._currentGame.status) {
            case 'start':
                alert(`Вопрос на ${nextPrize}р.`); // Будет другое.
                this.showQuestion();
                break;
            case 'promote':
                alert('Всё верно!');
                alert(`Вопрос на ${nextPrize}р.`); // Будет другое.
                this.showQuestion();
                break;
            case 'loose':
                alert(`Вы проиграли! Ваш выирыш составил ${prize}p.`);
                view.mainScreen.classList.remove('hidden');
                view.gameScreen.classList.add('hidden');
                break;
                // тяп ляп.. не успеваю.
            case 'flee':
                alert(`Вы забрали деньги! Ваш выирыш составил ${prize}p.`);
                view.mainScreen.classList.remove('hidden');
                view.gameScreen.classList.add('hidden');
                break;
                // тяп ляп.. не успеваю.
            case 'win':
                alert(`Вы выиграли! Ваш выирыш составил ${prize}p.`);
                view.mainScreen.classList.remove('hidden');
                view.gameScreen.classList.add('hidden');
                break;
        }
    }
    showQuestion(question) {
        const buttons = this.optionButtonsPanel.children;
        util.setInnerText(this.questionField, question.text);
        for (var i = 0; i < this.optionButtons.length; i++) {
            util.setInnerText(this.optionButtons[i], question.options[i]);
        }
    }
}
// CONCATENATED MODULE: ./src/frontend/vendor/pug-runtime-es6.js
// На данный момент не будет работать функци rethrow, т. к. она не может найти модуль fs...



class Pug {

  constructor() {
    this.has_own_property = Object.prototype.hasOwnProperty;
    this.match_html = /["&<>]/;
  }
  
  merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];
      for (var i = 1; i < a.length; i++) {
        attrs = this.merge(attrs, a[i]);
      }
      return attrs;
    }
  
    for (var key in b) {
      if (key === 'class') {
        var valA = a[key] || [];
        a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
      } else if (key === 'style') {
        var valA = this.style(a[key]);
        valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
        var valB = this.style(b[key]);
        valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
        a[key] = valA + valB;
      } else {
        a[key] = b[key];
      }
    }
  
    return a;
  };

  classes_array(val, escaping) {
    var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
    for (var i = 0; i < val.length; i++) {
      className = this.classes(val[i]);
      if (!className) continue;
      escapeEnabled && escaping[i] && (className = this.escape(className));
      classString = classString + padding + className;
      padding = ' ';
    }
    return classString;
  }

  classes_object(val) {
    var classString = '', padding = '';
    for (var key in val) {
      if (key && val[key] && this.has_own_property.call(val, key)) {
        classString = classString + padding + key;
        padding = ' ';
      }
    }
    return classString;
  }

  classesn(val, escaping) {
    if (Array.isArray(val)) {
      return this.classes_array(val, escaping);
    } else if (val && typeof val === 'object') {
      return this.classes_object(val);
    } else {
      return val || '';
    }
  }

  style(val) {
    if (!val) return '';
    if (typeof val === 'object') {
      var out = '';
      for (var style in val) {
        /* istanbul ignore else */
        if (this.has_own_property.call(val, style)) {
          out = out + style + ':' + val[style] + ';';
        }
      }
      return out;
    } else {
      return val + '';
    }
  }

  attr(key, val, escaped, terse) {
    if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
      return '';
    }
    if (val === true) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    }
    if (typeof val.toJSON === 'function') {
      val = val.toJSON();
    }
    if (typeof val !== 'string') {
      val = JSON.stringify(val);
      if (!escaped && val.indexOf('"') !== -1) {
        return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
      }
    }
    if (escaped) val = this.escape(val);
    return ' ' + key + '="' + val + '"';
  };

  attrs(obj, terse) {
    var attrs = '';
  
    for (var key in obj) {
      if (this.has_own_property.call(obj, key)) {
        var val = obj[key];
  
        if ('class' === key) {
          val = this.classes(val);
          attrs = this.attr(key, val, false, terse) + attrs;
          continue;
        }
        if ('style' === key) {
          val = this.style(val);
        }
        attrs += this.attr(key, val, false, terse);
      }
    }
  
    return attrs;
  };

  escape(_html){
    var html = '' + _html;
    var regexResult = this.match_html.exec(html);
    if (!regexResult) return _html;
  
    var result = '';
    var i, lastIndex, escape;
    for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
      switch (html.charCodeAt(i)) {
        case 34: escape = '&quot;'; break;
        case 38: escape = '&amp;'; break;
        case 60: escape = '&lt;'; break;
        case 62: escape = '&gt;'; break;
        default: continue;
      }
      if (lastIndex !== i) result += html.substring(lastIndex, i);
      lastIndex = i + 1;
      result += escape;
    }
    if (lastIndex !== i) return result + html.substring(lastIndex, i);
    else return result;
  }

  rethrow(err, filename, lineno, str) {
    if (!(err instanceof Error)) throw err;
    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }
    try {
      str = str || __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).readFileSync(filename, 'utf8')
    } catch (ex) {
      this.rethrow(err, null, lineno)
    }
    var context = 3
      , lines = str.split('\n')
      , start = Math.max(lineno - context, 0)
      , end = Math.min(lines.length, lineno + context);
  
    // Error context
    var context = lines.slice(start, end).map(function(line, i){
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');
  
    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Pug') + ':' + lineno
      + '\n' + context + '\n\n' + err.message;
    throw err;
  }
}

/* harmony default export */ var pug_runtime_es6 = (new Pug());
// CONCATENATED MODULE: ./src/frontend/views/templates/templates.js
/* harmony default export */ var templates = ({  render_message: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-lg" style="background: white"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = message) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_preloader: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    return pug_html;  },  render_test: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-lg" style="background: white"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = message) ? "" : pug_interp) +        " test!\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_messageBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(btnOkText, message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-sm alert"\u003E\n    \u003Cdiv class="message"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = message) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="msgBox-ok"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = btnOkText) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "btnOkText" in locals_for_with        ? locals_for_with.btnOkText        : typeof btnOkText !== "undefined"        ? btnOkText        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_modalLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-lg" style="background: white"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = message) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  }});
// CONCATENATED MODULE: ./src/frontend/base/EventEmitter.js
class EventEmitter_EventEmitter {

  constructor() {
    this.handlers = {};
  }
  
  on(eventName, handler) {
      if (eventName in this.handlers) {
          this.handlers[eventName].push(handler);
      } else {
          this.handlers[eventName] = [ handler ];
      }
  };

  off(eventName, handler) {
      //..
  };

  emit(eventName, args) {
      if (eventName in this.handlers) {
          for (var handler of this.handlers[eventName]) {
              setTimeout(() => { handler(args); }, 0);
          }
      }
  }
}
// CONCATENATED MODULE: ./src/frontend/views/modal/base/ModalWindow.js



class ModalWindow_ModalWindow extends EventEmitter_EventEmitter {

  constructor(template) {
    super();
    this.template = template;
    this.wrapper = document.createElement('div');
    this.output = {};
  }
  
  open(data) {

    const render = templates[`render_${this.template}`];
    if (render) {
      this.wrapper.innerHTML = render(data);
      document.body.appendChild(this.wrapper);
      this.emit('open', {}); // ....
    }
    else {
      throw new Error(`Template ${this.template} not found!`);
    }
  }

  close() {
    document.body.removeChild(this.wrapper);
    this.emit('close', this.output);
  }

}
// CONCATENATED MODULE: ./src/frontend/views/modal/MessageBox.js


class MessageBox_MessageBox extends ModalWindow_ModalWindow {

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
// CONCATENATED MODULE: ./src/frontend/views/modal/modals.js


// void messageBox(message, [{ options }])
// void messageBoxAsync(message, callback, [{ options }])
// string inputBox(message, [{options}])
// string inputBoxAsync(message, callback, [options]);
// bool confirmBox()
// bool confirmBoxAsync()



/* harmony default export */ var modals = ({
  messageBox(message, options) {
    new MessageBox_MessageBox()
      .show(message, options);
  },

  messageBoxAsync(message, callback, options) {
    new MessageBox_MessageBox()
      .showAsync(message, callback, options)
  }

  
});
// CONCATENATED MODULE: ./src/frontend/main.js





// const introView = new IntroView();
// const gameView = new GameView();
modals.messageBoxAsync('Большое спасибо за игру!', () => alert('callback!'));
// const answer = modal.confirm('?');
// const input = modal.inputBox(' ');


// gameView.btnHintHalf.addEventListener('click', (event) => {
//     debugger;
//     var test = new ModalWindow();
//     test.open({ message: 'My Message!'});
// });

// gameView.btnHintPercent.addEventListener('click', (event) => {
//     debugger;
//     var test = new ModalWindow();
//     test.open({ message: 'My Message!'});
// });

// introView.setStartHandler(() => {
    
//     util.ajax('api/new', null,  (error, result) => {
//         if (error) {
//             console.dir(error);
//         } else {
//             introView.toggle();
//             gameView.toggle();
//             // create LadderView(result);
//             requireQuestion();
//         }
//     });
// });

// //////////////////// GameView

// gameView.btnQuit.addEventListener('click', () => {
//     gameView.toggle();
//     introView.toggle();
// });

// gameView.optionButtonsPanel.addEventListener('click', (event) => {

//     if ( [ '0', '1', '2', '3' ].includes(event.target.id) ) {
//         util.ajax('api/try', { option: +event.target.id }, (error, result) => {
//             if (error) {
//                 console.dir(error);
//             } else if (result.status == 'promoting') {
//                 requireQuestion();
//             } else if (result.params.type == 'win') {
//                 alert('you win!');
//             } else {
//                 alert('You loose!');
//             }
//         });
//     }
// });

// gameView.btnFlee.addEventListener('click', function() {
//     alert('btn-flee');
//     util.ajax('api/flee', null, (error, result) => {
//         if (error) {
//             console.dir(error);
//         } else {
//             if (result.status == 'finished') {
//                 alert('You flee!');
//             } else {
//                 alert('It\'s not a good time to flee - you hadn\'t answered any questions yet!');
//             }
//         }
//     });
// });

// ////////////////

// function requireQuestion() {
//     util.ajax('api/question', null, (error, result) => {
//         if (error) {
//             console.dir(error);
//         } else {
//             console.dir(result);
//             gameView.showQuestion(result.params);
//         }
//     });
// }

/***/ })
/******/ ]);