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

// CONCATENATED MODULE: ./src/frontend/base/EventEmitter.js
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
          
          for (let handler of this.handlers[eventName]) {
              setTimeout(() => { handler.call(this, args); }, 0);
          }
      }
  }
}
// CONCATENATED MODULE: ./src/frontend/vendor/ajax.js
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

/* harmony default export */ var ajax = ({
  
  get(url, params, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', constructGetUrl(url, params));
    xhr.send();
    xhr.onload = () => {
        console.log(xhr.responseText);
        if (xhr.status != 200) {
            callback( { statusCode: xhr.status } );
        } else {
            callback(null, JSON.parse(xhr.responseText));
        }
    };
  }
});
  // Обёртка над обыкновенным XHR-запросом.
  // Принимает url, объект с параметрами и callback, который будет вызван при получении ответа.
// CONCATENATED MODULE: ./src/frontend/base/BaseModel.js



class BaseModel_BaseModel extends EventEmitter {
  constructor(data) {
    super();
    if (data) this.set(data);
  }

  set(entries) {
    const changed = {};
    const keys = Object.keys(entries);
    keys.forEach(key => {
      if (this[key] !== entries[key]) {
        this[key] = entries[key];
        changed[key] = entries[key];
      }
    });
    this.emit('change', changed);
  }

  request(url, params, callback, surpress) {
    ajax.get(url, params, (err, res) => {
      if (err) {
        this.emit('error', { model: this, err });
      } else {
        if (!surpress) this.set(res);
        if (callback) setTimeout(() => callback(res), 0); //Надо ли?

      }
    });
  }
}
// CONCATENATED MODULE: ./src/frontend/models/State.js




class State_State extends BaseModel_BaseModel {

  constructor(data) {
    super(data);
  }

  setPlayer(player) {
    this.request('/api/player', { player });
  }

  startNewGame() {
    this.request('/api/new');
  }

  tryAnswer(option) {
    this.request('/api/try', { option }, res => {
      if (res.result) {
        this.emit(res.result.toLowerCase(), res);
      } else {
        this.emit('correct', {});
      }
    });
  }

  flee() {
    this.request('./api/flee');
  }
};
// CONCATENATED MODULE: ./src/frontend/base/BaseController.js
class BaseController {

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
// CONCATENATED MODULE: ./src/frontend/controllers/Controller.js




class Controller_Controller extends BaseController {

  constructor(views) {

    super(views);
    this.state = views.game.model;

    state.on('error', args => {
      if (this.activeView) {
        this.activeView.error(args);
      }
    });

    state.on('change', changed => {
      if (changed.inProgress === true) this.show(views.game);
      if (changed.inProgress === false) this.show(views.main);
    });
    state.on('win', res => {
      views.game.win(res);
    });
    state.on('loss', res => {
      views.game.loss(res);
    });
    state.on('flee', res => {
      views.game.flee(res);
    });
    state.on('correct', res => {
      views.game.correct();
    });

    views.main.on('newPlayer', args => {
      state.setPlayer(args.player);
    });

    views.main.on('contribute', args => {
      alert('contribute!');
    });

    views.main.on('play', args => {
      state.startNewGame();
    });
    views.game.on('play', args => {
      state.startNewGame();
    })

    views.main.on('activate', () => {
      if (!state.player || state.player == 'guest') views.main.askName();
    });

    views.game.on('try', args => {
      const option = +args.nativeEvent.target.id.split('-')[1];
      state.tryAnswer(option);
    });

    views.game.on('fifty', state.fifty);
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
// CONCATENATED MODULE: ./src/frontend/views/templates.js
/* harmony default export */ var templates = ({  render_gameLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cdiv class="frame"\u003E\n  \u003Cheader class="gameHeader"\u003E\n    \u003Cdiv class="controls"\u003E\n      \u003Cdiv id="player"\u003E\u003C\u002Fdiv\u003E\n      \u003Cdiv id="hints"\u003E\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cdiv id="menu"\u003E\u003C\u002Fdiv\u003E\n  \u003C\u002Fheader\u003E\n  \u003Cdiv class="content-wrapper"\u003E\n    \u003Cdiv id="question"\u003E\u003C\u002Fdiv\u003E\n    \u003Cdiv id="ladder"\u003E\u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cfooter\u003E\u003Ca href="https:\u002F\u002Fgithub.com\u002Feonae\u002Fmillionaire" target="_blank"\u003Ecopyright app by Eonae &#xa9\u003C\u002Fa\u003E\u003C\u002Ffooter\u003E\n\u003C\u002Fdiv\u003E';    return pug_html;  },  render_hints: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cdiv class="hints"\u003E\n  \u003Cbutton type="button" id="hint-0"\u003E50\u002F50\u003C\u002Fbutton\u003E\n  \u003Cbutton type="button" id="hint-1"\u003EDisabled\u003C\u002Fbutton\u003E\n  \u003Cbutton type="button" id="hint-2"\u003EDisabled\u003C\u002Fbutton\u003E\n\u003C\u002Fdiv\u003E';    return pug_html;  },  render_ladder: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(ladder, stage) {      var pug_indent = [];      pug_html = pug_html + '\n\u003Cdiv class="ladder"\u003E';      // iterate ladder      (function() {        var $$obj = ladder;        if ("number" == typeof $$obj.length) {          for (var index = 0, $$l = $$obj.length; index < $$l; index++) {            var st = $$obj[index];            if (index < stage) {              if (st.isFixed) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done-immune"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = st.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = st.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            } else {              if (st.isFixed) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="immune"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = st.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="general"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = st.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            }          }        } else {          var $$l = 0;          for (var index in $$obj) {            $$l++;            var st = $$obj[index];            if (index < stage) {              if (st.isFixed) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done-immune"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = st.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = st.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            } else {              if (st.isFixed) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="immune"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = st.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="general"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = st.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            }          }        }      }.call(this));      pug_html = pug_html + "\n\u003C\u002Fdiv\u003E";    }.call(      this,      "ladder" in locals_for_with        ? locals_for_with.ladder        : typeof ladder !== "undefined"        ? ladder        : undefined,      "stage" in locals_for_with        ? locals_for_with.stage        : typeof stage !== "undefined"        ? stage        : undefined    ));    return pug_html;  },  render_menu: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cbutton type="button" id="menu"\u003EMenu\u003C\u002Fbutton\u003E';    return pug_html;  },  render_player: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(player) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv class="player"\u003E\n  \u003Cdiv\u003EPlayer:\u003C\u002Fdiv\u003E\n  \u003Cdiv\u003E' +        pug_runtime_es6.escape(null == (pug_interp = player) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "player" in locals_for_with        ? locals_for_with.player        : typeof player !== "undefined"        ? player        : undefined    ));    return pug_html;  },  render_question: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(question) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv class="wrapper"\u003E\n  \u003Cdiv class="question-text"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = question.text) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n  \u003Cdiv class="options"\u003E\n    \u003Cdiv class="options-row"\u003E\n      \u003Cbutton type="button" id="option-0"\u003E' +        pug_runtime_es6.escape(          null == (pug_interp = question.options[0]) ? "" : pug_interp        ) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003EA\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="option-1"\u003E' +        pug_runtime_es6.escape(          null == (pug_interp = question.options[1]) ? "" : pug_interp        ) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003EB\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cdiv class="options-row"\u003E\n      \u003Cbutton type="button" id="option-2"\u003E' +        pug_runtime_es6.escape(          null == (pug_interp = question.options[2]) ? "" : pug_interp        ) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003EC\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="option-3"\u003E' +        pug_runtime_es6.escape(          null == (pug_interp = question.options[3]) ? "" : pug_interp        ) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003ED\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E';    }.call(      this,      "question" in locals_for_with        ? locals_for_with.question        : typeof question !== "undefined"        ? question        : undefined    ));    return pug_html;  },  render_correctMessage: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html + '\u003Cspan class="msg"\u003EWell done!\u003C\u002Fspan\u003E';    return pug_html;  },  render_lossMessage: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(letter, option, prize) {      var pug_indent = [];      pug_html =        pug_html +        "\n\u003Cp\u003E\u003Cstrong\u003EWrong!\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003ECorrect answer was \u003Cstrong\u003E" +        pug_runtime_es6.escape(null == (pug_interp = letter) ? "" : pug_interp) +        ": " +        pug_runtime_es6.escape(null == (pug_interp = option) ? "" : pug_interp) +        '\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003EYou prize is \u003Cspan class="prize"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = prize) ? "" : pug_interp) +        "\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\n\u003Cp\u003EWould you play once more?\u003C\u002Fp\u003E";    }.call(      this,      "letter" in locals_for_with        ? locals_for_with.letter        : typeof letter !== "undefined"        ? letter        : undefined,      "option" in locals_for_with        ? locals_for_with.option        : typeof option !== "undefined"        ? option        : undefined,      "prize" in locals_for_with        ? locals_for_with.prize        : typeof prize !== "undefined"        ? prize        : undefined    ));    return pug_html;  },  render_winMessage: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(prize) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cp\u003E\u003Cstrong\u003ECongratulations!\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003EYou were really great!\u003C\u002Fp\u003E\n\u003Cp\u003EYour prize: \u003Cspan class="prize"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = prize) ? "" : pug_interp) +        "\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\n\u003Cp\u003EWould you play once more?\u003C\u002Fp\u003E";    }.call(      this,      "prize" in locals_for_with        ? locals_for_with.prize        : typeof prize !== "undefined"        ? prize        : undefined    ));    return pug_html;  },  render_greetings: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(player) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv class="greetings"\u003EHello, \u003Cspan\u003E' +        pug_runtime_es6.escape(null == (pug_interp = player) ? "" : pug_interp) +        "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";    }.call(      this,      "player" in locals_for_with        ? locals_for_with.player        : typeof player !== "undefined"        ? player        : undefined    ));    return pug_html;  },  render_mainLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cdiv class="frame"\u003E\n  \u003Cheader class="mainHeader"\u003E\n    \u003Cdiv class="title"\u003EWanna be a millionaire?\u003C\u002Fdiv\u003E\n    \u003Cdiv class="mainBar"\u003E\n      \u003Cnav class="mainMenu"\u003E\n        \u003Cbutton type="button" id="play"\u003EPlay\u003C\u002Fbutton\u003E\n        \u003Cbutton type="button" id="contribute"\u003EContribute\u003C\u002Fbutton\u003E\n      \u003C\u002Fnav\u003E\n      \u003Cdiv id="greetings"\u003E\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fheader\u003E\n  \u003Cdiv class="content-wrapper"\u003E\u003C\u002Fdiv\u003E\n  \u003Cfooter\u003E\u003Ca href="https:\u002F\u002Fgithub.com\u002Feonae\u002Fmillionaire" target="_blank"\u003Ecopyright app by Eonae &#xa9\u003C\u002Fa\u003E\u003C\u002Ffooter\u003E\n\u003C\u002Fdiv\u003E';    return pug_html;  },  render_confirmBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(buttons, message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window confirm-box"\u003E\n    \u003Cdiv class="message"\u003E' +        (null == (pug_interp = message) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="positive"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.positive) ? "" : pug_interp) +        '\u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="negative"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.negative) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "buttons" in locals_for_with        ? locals_for_with.buttons        : typeof buttons !== "undefined"        ? buttons        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_inputBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(buttons, message, placeholder) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window input-box"\u003E\n    \u003Cdiv class="message"\u003E' +        (null == (pug_interp = message) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n    \u003Cinput" +        (' type="text"' +          pug_runtime_es6.attr("placeholder", `${placeholder}`, true, false) +          ' id="modal-input"') +        '\u002F\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="positive"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.positive) ? "" : pug_interp) +        '\u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="negative"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.negative) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "buttons" in locals_for_with        ? locals_for_with.buttons        : typeof buttons !== "undefined"        ? buttons        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined,      "placeholder" in locals_for_with        ? locals_for_with.placeholder        : typeof placeholder !== "undefined"        ? placeholder        : undefined    ));    return pug_html;  },  render_messageBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(buttons, message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window message-box"\u003E\n    \u003Cdiv class="message"\u003E' +        (null == (pug_interp = message) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="positive"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.positive) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "buttons" in locals_for_with        ? locals_for_with.buttons        : typeof buttons !== "undefined"        ? buttons        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  }});
// CONCATENATED MODULE: ./src/frontend/vendor/modals/base/ModalWindow.js


class ModalWindow_ModalWindow {

  constructor(template, data, callback) {
    this.wrapper = document.createElement('div');
    this.template = template;

    this.data = data;
    this.callback = callback;
    this.output = null;
  }
  
  open() {

    const render = templates[`render_${this.template}`];
    if (render) {
      this.wrapper.innerHTML = render(this.data);
      document.body.appendChild(this.wrapper);
    }
    else {
      throw new Error(`Template ${this.template} not found!`);
    }
  }

  close() {
    document.body.removeChild(this.wrapper);
    if (this.callback) {
      this.callback(this.output);
    }
    
  }
}
// CONCATENATED MODULE: ./src/frontend/vendor/modals/messageBox/MessageBox.js




class MessageBox_MessageBox extends ModalWindow_ModalWindow {

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
// CONCATENATED MODULE: ./src/frontend/vendor/modals/confirmBox/ConfirmBox.js




class ConfirmBox_ConfirmBox extends ModalWindow_ModalWindow {

  constructor(data, callback) {
    const settings = Object.assign({
      buttons: {
        positive: 'Yes',
        negative: 'No'
      },
      message: ''
    }, (data instanceof Object) ? data : { message: data });
    super('confirmBox', settings, callback);
  }

  show() {

    this.open();
    const buttons = document.querySelector('.modal-window .buttons');
    buttons.addEventListener('click', (e) => {
      this.output = e.target.id === 'positive';
      console.log(this.output);
      this.close();
    });
  }
}
// CONCATENATED MODULE: ./src/frontend/vendor/modals/inputBox/InputBox.js




class InputBox_ConfirmBox extends ModalWindow_ModalWindow {

  constructor(data, callback) {
    const settings = Object.assign({
      buttons: {
        positive: 'Continue',
        negative: 'Back'
      },
      placeholder: 'Your input',
      message: ''
    }, (data instanceof Object) ? data : { message: data });
    super('inputBox', settings, callback);
  }

  show() {

    this.open();
    const buttons = document.querySelector('.modal-window .buttons');
    buttons.addEventListener('click', (e) => {
      this.output = (e.target.id === 'positive')
        ? document.getElementById('modal-input').value
        : undefined;
      console.log(this.output);
      this.close();
    });
  }
}
// CONCATENATED MODULE: ./src/frontend/vendor/modals/modals.js




/* harmony default export */ var modals = ({

  messageBox(options, callback) {
    new MessageBox_MessageBox(options, callback).show();
  },

  confirmBox(options, callback) {
    new ConfirmBox_ConfirmBox(options, callback).show();
  },

  inputBox(options, callback) {
    new InputBox_ConfirmBox(options, callback).show();

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
});
// CONCATENATED MODULE: ./src/frontend/base/Component.js



class Component_Component extends EventEmitter {
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
        this.children[key] = new Component_Component(componentSettings, this.model);
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
      if (this.parent instanceof Component_Component) {
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
// CONCATENATED MODULE: ./src/frontend/views/GameView.js






class GameView_GameView extends Component_Component {
  constructor(model) {
    super({
        template: 'gameLayout',
        children: {
  
          player: {
            template: 'player',
            slot: '#player',
            uses: [ 'player' ]
          },
      
          hints: {
            template: 'hints',
            slot: '#hints',
            events: [
              { element: '#hint-0', on: 'click', emit: 'hint_0' },
              { element: '#hint-1', on: 'click', emit: 'hint_1' },
              { element: '#hint-2', on: 'click', emit: 'hint_2' },
            ]
          },
      
          menu: {
            template: 'menu',
            slot: '#menu'
          },
      
          question: {
            template: 'question',
            slot: '#question',
            uses: [ 'question' ],
            events: [
              { element: '#option-0', on: 'click', emit: 'try' },
              { element: '#option-1', on: 'click', emit: 'try' },
              { element: '#option-2', on: 'click', emit: 'try' },
              { element: '#option-3', on: 'click', emit: 'try' }
            ]
          },
      
          ladder: {
            template: 'ladder',
            slot: '#ladder',
            uses: [ 'ladder', 'stage' ]
          }
        }
        
    }, model);
  }

  loss(args) {

    modals.confirmBox(templates.render_lossMessage({

      letter: String.fromCharCode(args.correctOption + 65),
      option: this.model.question.options[args.correctOption],
      prize: args.prize

    }), (oneMore) => {
        if (oneMore)
          this.emit('play', {});
      });
  }

  win(args) {

    modals.confirmBox(templates.render_winMessage({
      prize: args.prize
    }), (oneMore) => {
      if (oneMore)
        this.emit('play', {});
      });
  }

  correct() {
    modals.messageBox({
      message: templates.render_correctMessage(),
      buttons: { positive: 'Continue' }
     });
  }

  error(args) {
    modals.messageBox( { message: 'Something gone wrong with our server. We appologize for inconvenience. We will try to reconnect...'}, () => {
      document.location.reload(true);
    });
  }

};


// CONCATENATED MODULE: ./src/frontend/views/MainView.js





class MainView_MainView extends Component_Component {
  constructor(model) {
    super({
        template: 'mainLayout',
        events: [
          { element: '#play', on: 'click', emit: 'play' },
          { element: '#contribute', on: 'click', emit: 'contribute' }
        ],
        children: {             
          greetings: {
            template: 'greetings',
            slot: '#greetings',
            uses: ['player']
          }
        }
    }, model);
  }

  askName() {
    modals.inputBox({
      message: 'Please enter your name',
      placeholder: 'mr.Incognito'
    }, player => {
      this.emit('newPlayer', { player } );
    });
  }

  error(args) {
    modals.messageBox( { message: 'Something gone wrong with our server. We appologize for inconvenience. We will try to reconnect...'}, () => {
      document.location.reload(true);
    });
  }
};


// CONCATENATED MODULE: ./src/frontend/main.js







window.onload = () => {

  window.state = new State_State();

  window.controller = new Controller_Controller({
    main: new MainView_MainView(state),
    game: new GameView_GameView(state)
  });

  window.initialState = JSON.parse(document.getElementById('state').innerHTML);

  state.set(initialState);

  const activeView = (state.inProgress)
    ? controller.views.game
    : controller.views.main;
  controller.show(activeView);
};

/***/ })
/******/ ]);