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
/* harmony default export */ var templates = ({  render_gameLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cdiv class="frame"\u003E\n  \u003Cheader class="gameHeader"\u003E\n    \u003Cdiv class="controls"\u003E\n      \u003Cdiv id="player"\u003E\u003C\u002Fdiv\u003E\n      \u003Cdiv id="hints"\u003E\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cdiv id="menu"\u003E\u003C\u002Fdiv\u003E\n  \u003C\u002Fheader\u003E\n  \u003Cdiv class="content-wrapper"\u003E\n    \u003Cdiv id="question"\u003E\u003C\u002Fdiv\u003E\n    \u003Cdiv id="ladder"\u003E\u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cfooter\u003E\u003Ca href="https:\u002F\u002Fgithub.com\u002Feonae\u002Fmillionaire" target="_blank"\u003Ecopyright app by Eonae &#xa9\u003C\u002Fa\u003E\u003C\u002Ffooter\u003E\n\u003C\u002Fdiv\u003E';    return pug_html;  },  render_hints: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cdiv class="hints"\u003E\n  \u003Cbutton type="button" id="hint-0"\u003E50\u002F50\u003C\u002Fbutton\u003E\n  \u003Cbutton type="button" id="hint-1"\u003EDisabled\u003C\u002Fbutton\u003E\n  \u003Cbutton type="button" id="hint-2"\u003EDisabled\u003C\u002Fbutton\u003E\n\u003C\u002Fdiv\u003E';    return pug_html;  },  render_ladder: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(currentStage, stages) {      var pug_indent = [];      pug_html = pug_html + '\n\u003Cdiv class="ladder"\u003E';      // iterate stages      (function() {        var $$obj = stages;        if ("number" == typeof $$obj.length) {          for (var index = 0, $$l = $$obj.length; index < $$l; index++) {            var stage = $$obj[index];            if (index < currentStage) {              if (stage.immune) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done-immune"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            } else {              if (stage.immune) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="immune"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="general"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            }          }        } else {          var $$l = 0;          for (var index in $$obj) {            $$l++;            var stage = $$obj[index];            if (index < currentStage) {              if (stage.immune) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done-immune"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            } else {              if (stage.immune) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="immune"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="general"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            }          }        }      }.call(this));      pug_html = pug_html + "\n\u003C\u002Fdiv\u003E";    }.call(      this,      "currentStage" in locals_for_with        ? locals_for_with.currentStage        : typeof currentStage !== "undefined"        ? currentStage        : undefined,      "stages" in locals_for_with        ? locals_for_with.stages        : typeof stages !== "undefined"        ? stages        : undefined    ));    return pug_html;  },  render_menu: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cbutton type="button" id="menu"\u003EMenu\u003C\u002Fbutton\u003E';    return pug_html;  },  render_player: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(player) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv class="player"\u003E\n  \u003Cdiv\u003EPlayer:\u003C\u002Fdiv\u003E\n  \u003Cdiv\u003E' +        pug_runtime_es6.escape(null == (pug_interp = player) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "player" in locals_for_with        ? locals_for_with.player        : typeof player !== "undefined"        ? player        : undefined    ));    return pug_html;  },  render_question: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(answers, question) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv class="wrapper"\u003E\n  \u003Cdiv class="question-text"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = question) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n  \u003Cdiv class="options"\u003E\n    \u003Cdiv class="options-row"\u003E\n      \u003Cbutton type="button" id="option-0"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = answers[0]) ? "" : pug_interp) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003EA\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="option-1"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = answers[1]) ? "" : pug_interp) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003EB\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cdiv class="options-row"\u003E\n      \u003Cbutton type="button" id="option-2"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = answers[2]) ? "" : pug_interp) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003EC\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="option-3"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = answers[3]) ? "" : pug_interp) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003ED\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E';    }.call(      this,      "answers" in locals_for_with        ? locals_for_with.answers        : typeof answers !== "undefined"        ? answers        : undefined,      "question" in locals_for_with        ? locals_for_with.question        : typeof question !== "undefined"        ? question        : undefined    ));    return pug_html;  },  render_greetings: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(player) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv class="greetings"\u003EHello, \u003Cspan\u003E' +        pug_runtime_es6.escape(null == (pug_interp = player) ? "" : pug_interp) +        "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";    }.call(      this,      "player" in locals_for_with        ? locals_for_with.player        : typeof player !== "undefined"        ? player        : undefined    ));    return pug_html;  },  render_mainLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cdiv class="frame"\u003E\n  \u003Cheader class="mainHeader"\u003E\n    \u003Cdiv class="title"\u003EWanna be a millionaire?\u003C\u002Fdiv\u003E\n    \u003Cdiv class="mainBar"\u003E\n      \u003Cdiv id="mainMenu"\u003E\u003C\u002Fdiv\u003E\n      \u003Cdiv id="greetings"\u003E\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fheader\u003E\n  \u003Cdiv class="content-wrapper"\u003E\u003C\u002Fdiv\u003E\n  \u003Cfooter\u003E\u003Ca href="https:\u002F\u002Fgithub.com\u002Feonae\u002Fmillionaire" target="_blank"\u003Ecopyright app by Eonae &#xa9\u003C\u002Fa\u003E\u003C\u002Ffooter\u003E\n\u003C\u002Fdiv\u003E';    return pug_html;  },  render_mainMenu: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cnav class="mainMenu"\u003E\n  \u003Cbutton type="button" id="play"\u003EPlay\u003C\u002Fbutton\u003E\n  \u003Cbutton type="button" id="contribute"\u003EContribute\u003C\u002Fbutton\u003E\n\u003C\u002Fnav\u003E';    return pug_html;  },  render_confirmBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(buttons, message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window confirm-box"\u003E\n    \u003Cdiv class="message"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = message) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="positive"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.positive) ? "" : pug_interp) +        '\u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="negative"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.negative) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "buttons" in locals_for_with        ? locals_for_with.buttons        : typeof buttons !== "undefined"        ? buttons        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_inputBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(buttons, message, placeholder) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-sm input-box"\u003E\n    \u003Cdiv class="message"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = message) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n    \u003Cinput" +        (' type="text"' +          pug_runtime_es6.attr("placeholder", `${placeholder}`, true, false) +          ' id="modal-input"') +        '\u002F\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="positive"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.positive) ? "" : pug_interp) +        '\u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="negative"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.negative) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "buttons" in locals_for_with        ? locals_for_with.buttons        : typeof buttons !== "undefined"        ? buttons        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined,      "placeholder" in locals_for_with        ? locals_for_with.placeholder        : typeof placeholder !== "undefined"        ? placeholder        : undefined    ));    return pug_html;  },  render_messageBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(buttons, message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window message-box"\u003E\n    \u003Cdiv class="message"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = message) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="positive"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.positive) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "buttons" in locals_for_with        ? locals_for_with.buttons        : typeof buttons !== "undefined"        ? buttons        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_modalLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-lg" style="background: white"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = message) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  }});
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
          for (var handler of this.handlers[eventName]) {
              setTimeout(() => { handler(args); }, 0);
          }
      }
  }
}
// CONCATENATED MODULE: ./src/frontend/views/base/Component.js





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

class Component_Component extends EventEmitter {
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
// CONCATENATED MODULE: ./src/frontend/views/base/initializeView.js


// mainLayout.greetings.setData({ name: 'Sergey'});

function initializeView() {

  return {
    mainLayout: new Component_Component({
      template: 'mainLayout',
      children: {
    
        mainMenu: new Component_Component({
          template: 'mainMenu',
          slot: '#mainMenu',
          events: [
            { element: '#play', on: 'click', emit: 'play' },
            { element: '#contribute', on: 'click', emit: 'contribute' }
          ]
        }),
    
        greetings: new Component_Component({
          template: 'greetings',
          slot: '#greetings',
          data: { player: 'dear friend' }
        })
      }
    }),

    gameLayout: new Component_Component({

      template: 'gameLayout',
      children: {
    
        player: new Component_Component({
          template: 'player',
          slot: '#player',
          data: { player: '' },
        }),
    
        hints: new Component_Component({
          template: 'hints',
          slot: '#hints',
          events: [
            { element: '#hint-0', on: 'click', emit: 'hint_0' },
            { element: '#hint-1', on: 'click', emit: 'hint_1' },
            { element: '#hint-2', on: 'click', emit: 'hint_2' },
          ]
        }),
    
        menu: new Component_Component({
          template: 'menu',
          slot: '#menu'
        }),
    
        question: new Component_Component({
          template: 'question',
          slot: '#question',
          data: { question: '', answers: [] },
          events: [
            { element: '#option-0', on: 'click', emit: 'option_0' },
            { element: '#option-1', on: 'click', emit: 'option_1' },
            { element: '#option-2', on: 'click', emit: 'option_2' },
            { element: '#option-3', on: 'click', emit: 'option_3' }
          ]
        }),
    
        ladder: new Component_Component({
          template: 'ladder',
          slot: '#ladder',
          data: {
            stages: [
              { prize: 1000, immune: false },
              { prize: 2000, immune: true },
              { prize: 5000, immune: false },
              { prize: 6000, immune: true }
            ],
            currentStage: 0 }
        })
      }
    })
  }
}
// CONCATENATED MODULE: ./src/frontend/main.js
// import modals from './views/modal/modals.js';
// import MainController from './controllers/MainController.js';



window.onload = () => {
  window.view = initializeView();
  view.gameLayout.render();

  // view.mainLayout.mainMenu.on('play', () => alert('play!'));
  // view.mainLayout.mainMenu.on('contribute', () => alert('contribute!'));


};



  // debugger;
  // window.controller = new MainController({
  //   mainView: new MainView(),
  //   gameView: new GameView()
  // });

  // controller.update();


  // util.ajax('/state', {}, state => {
  //   switch (state.status) {
  //     case 0:
        
  //       break;
  //     case 1:
  //       break;
  //     case 2:
  //   }

  //   document.body.innerHTML = templates.render_gameView();
  //   const btn0 = document.getElementById('0');
  //   console.log(btn0);
  // });

  // Дальше в зависимости от полученного state рисуем основное окно.

// window.onload = () => {
  
//   modals.inputBox('Please enter your name', data => {
//     util.ajax('/name', { name: data }, () => {
//       const $name = document.querySelector('.greetings span');
//       $name.textContent = data;
//     });
//   });
// };


// modals.confirmBox('Hello, My little friend!', data => alert(data));
// modals.inputBox('Please enter your name!', data => alert(data));
// debugger;
// const introView = new IntroView();
// const gameView = new GameView();
// // const answer = modal.confirmBox('?');
// // const input = modal.inputBox(' ');


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