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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(2);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(3);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret) },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 4 */
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
/* harmony default export */ var templates = ({  render_confirmBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(buttons, message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window confirm-box"\u003E\n    \u003Cdiv class="message"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = message) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="positive"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.positive) ? "" : pug_interp) +        '\u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="negative"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.negative) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "buttons" in locals_for_with        ? locals_for_with.buttons        : typeof buttons !== "undefined"        ? buttons        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_inputBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(buttons, message, placeholder) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-sm input-box"\u003E\n    \u003Cdiv class="message"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = message) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n    \u003Cinput" +        (' type="text"' +          pug_runtime_es6.attr("placeholder", `${placeholder}`, true, false) +          ' id="modal-input"') +        '\u002F\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="positive"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.positive) ? "" : pug_interp) +        '\u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="negative"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.negative) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "buttons" in locals_for_with        ? locals_for_with.buttons        : typeof buttons !== "undefined"        ? buttons        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined,      "placeholder" in locals_for_with        ? locals_for_with.placeholder        : typeof placeholder !== "undefined"        ? placeholder        : undefined    ));    return pug_html;  },  render_messageBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(buttons, message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window message-box"\u003E\n    \u003Cdiv class="message"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = message) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="positive"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = buttons.positive) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "buttons" in locals_for_with        ? locals_for_with.buttons        : typeof buttons !== "undefined"        ? buttons        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_modalLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-lg" style="background: white"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = message) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_gameLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cdiv class="frame"\u003E\n  \u003Cheader class="gameHeader"\u003E\n    \u003Cdiv class="controls"\u003E\n      \u003Cdiv id="player"\u003E\u003C\u002Fdiv\u003E\n      \u003Cdiv id="hints"\u003E\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cdiv id="menu"\u003E\u003C\u002Fdiv\u003E\n  \u003C\u002Fheader\u003E\n  \u003Cdiv class="content-wrapper"\u003E\n    \u003Cdiv id="question"\u003E\u003C\u002Fdiv\u003E\n    \u003Cdiv id="ladder"\u003E\u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cfooter\u003E\u003Ca href="https:\u002F\u002Fgithub.com\u002Feonae\u002Fmillionaire" target="_blank"\u003Ecopyright app by Eonae &#xa9\u003C\u002Fa\u003E\u003C\u002Ffooter\u003E\n\u003C\u002Fdiv\u003E';    return pug_html;  },  render_hints: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cdiv class="hints"\u003E\n  \u003Cbutton type="button" id="hint-0"\u003E50\u002F50\u003C\u002Fbutton\u003E\n  \u003Cbutton type="button" id="hint-1"\u003EDisabled\u003C\u002Fbutton\u003E\n  \u003Cbutton type="button" id="hint-2"\u003EDisabled\u003C\u002Fbutton\u003E\n\u003C\u002Fdiv\u003E';    return pug_html;  },  render_ladder: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(currentStage, stages) {      var pug_indent = [];      pug_html = pug_html + '\n\u003Cdiv class="ladder"\u003E';      // iterate stages      (function() {        var $$obj = stages;        if ("number" == typeof $$obj.length) {          for (var index = 0, $$l = $$obj.length; index < $$l; index++) {            var stage = $$obj[index];            if (index < currentStage) {              if (stage.isFixed) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done-immune"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            } else {              if (stage.immune) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="immune"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="general"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            }          }        } else {          var $$l = 0;          for (var index in $$obj) {            $$l++;            var stage = $$obj[index];            if (index < currentStage) {              if (stage.isFixed) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done-immune"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            } else {              if (stage.immune) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="immune"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="general"\u003E' +                  pug_runtime_es6.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            }          }        }      }.call(this));      pug_html = pug_html + "\n\u003C\u002Fdiv\u003E";    }.call(      this,      "currentStage" in locals_for_with        ? locals_for_with.currentStage        : typeof currentStage !== "undefined"        ? currentStage        : undefined,      "stages" in locals_for_with        ? locals_for_with.stages        : typeof stages !== "undefined"        ? stages        : undefined    ));    return pug_html;  },  render_menu: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cbutton type="button" id="menu"\u003EMenu\u003C\u002Fbutton\u003E';    return pug_html;  },  render_player: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(player) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv class="player"\u003E\n  \u003Cdiv\u003EPlayer:\u003C\u002Fdiv\u003E\n  \u003Cdiv\u003E' +        pug_runtime_es6.escape(null == (pug_interp = player) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "player" in locals_for_with        ? locals_for_with.player        : typeof player !== "undefined"        ? player        : undefined    ));    return pug_html;  },  render_question: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(answers, question) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv class="wrapper"\u003E\n  \u003Cdiv class="question-text"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = question) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n  \u003Cdiv class="options"\u003E\n    \u003Cdiv class="options-row"\u003E\n      \u003Cbutton type="button" id="option-0"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = answers[0]) ? "" : pug_interp) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003EA\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="option-1"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = answers[1]) ? "" : pug_interp) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003EB\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cdiv class="options-row"\u003E\n      \u003Cbutton type="button" id="option-2"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = answers[2]) ? "" : pug_interp) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003EC\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="option-3"\u003E' +        pug_runtime_es6.escape(null == (pug_interp = answers[3]) ? "" : pug_interp) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003ED\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E';    }.call(      this,      "answers" in locals_for_with        ? locals_for_with.answers        : typeof answers !== "undefined"        ? answers        : undefined,      "question" in locals_for_with        ? locals_for_with.question        : typeof question !== "undefined"        ? question        : undefined    ));    return pug_html;  },  render_greetings: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(player) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv class="greetings"\u003EHello, \u003Cspan\u003E' +        pug_runtime_es6.escape(null == (pug_interp = player) ? "" : pug_interp) +        "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";    }.call(      this,      "player" in locals_for_with        ? locals_for_with.player        : typeof player !== "undefined"        ? player        : undefined    ));    return pug_html;  },  render_mainLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cdiv class="frame"\u003E\n  \u003Cheader class="mainHeader"\u003E\n    \u003Cdiv class="title"\u003EWanna be a millionaire?\u003C\u002Fdiv\u003E\n    \u003Cdiv class="mainBar"\u003E\n      \u003Cdiv id="mainMenu"\u003E\u003C\u002Fdiv\u003E\n      \u003Cdiv id="greetings"\u003E\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fheader\u003E\n  \u003Cdiv class="content-wrapper"\u003E\u003C\u002Fdiv\u003E\n  \u003Cfooter\u003E\u003Ca href="https:\u002F\u002Fgithub.com\u002Feonae\u002Fmillionaire" target="_blank"\u003Ecopyright app by Eonae &#xa9\u003C\u002Fa\u003E\u003C\u002Ffooter\u003E\n\u003C\u002Fdiv\u003E';    return pug_html;  },  render_mainMenu: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cnav class="mainMenu"\u003E\n  \u003Cbutton type="button" id="play"\u003EPlay\u003C\u002Fbutton\u003E\n  \u003Cbutton type="button" id="contribute"\u003EContribute\u003C\u002Fbutton\u003E\n\u003C\u002Fnav\u003E';    return pug_html;  }});
// CONCATENATED MODULE: ./src/frontend/vendor/modals/ModalWindow.js


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
    this.callback(this.output);
  }
}
// CONCATENATED MODULE: ./src/frontend/vendor/modals/MessageBox.js




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
// CONCATENATED MODULE: ./src/frontend/vendor/modals/ConfirmBox.js




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
// CONCATENATED MODULE: ./src/frontend/vendor/modals/InputBox.js




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
// CONCATENATED MODULE: ./src/frontend/base/Component.js



class Component_Component extends EventEmitter {
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
            this.raiseEvent(event.emit, { component: this, nativeEvent: e });
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
        this.children[key] = new Component_Component(componentSettings);
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
      if (this.parent instanceof Component_Component) {
        this.parent.raiseEvent(name, args);
      } else {
        this.parent.emit(name, args);
      }
    
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
// CONCATENATED MODULE: ./src/frontend/base/LayoutSwitch.js



// Надо бы это дело отнаследовать от Component, тогда будет действительно гибко.

class LayoutSwitch_LayoutSwitch extends EventEmitter {
  constructor(tree) {
    super();
    for (let layout of Object.entries(tree)) {
      this[layout[0]] = new Component_Component(layout[1]);
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
// CONCATENATED MODULE: ./src/frontend/views/View.js





class View_View extends LayoutSwitch_LayoutSwitch {
  constructor() {
    super({
      mainLayout: {
        template: 'mainLayout', //
        children: {             //
          mainMenu: {
            template: 'mainMenu',
            slot: '#mainMenu',
            events: [
              { element: '#play', on: 'click', emit: 'play' },
              { element: '#contribute', on: 'click', emit: 'contribute' }
            ]
          },
          greetings: {
            template: 'greetings',
            slot: '#greetings',
            data: { player: 'dear friend' }
          }
        }
      },
      gameLayout: {
        template: 'gameLayout',
        children: {
  
          player: {
            template: 'player',
            slot: '#player',
            data: { player: 'Incognito' },
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
            data: { question: '', answers: [] },
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
            data: {
              stages: [
                { prize: 1000, immune: false },
                { prize: 2000, immune: true },
                { prize: 5000, immune: false },
                { prize: 6000, immune: true }
              ],
              currentStage: 0 }
          }
        }
      }
    });
  }

  loss(args) {
    modals.confirmBox( { message:
      `We are really sorry, but you are wrong (((
      Correct answer was
      ${String.fromCharCode(args.correct + 65)}: ${this.question.answers[args.correct]}
      Would you play once more?`}, (oneMore) => {
        if (oneMore) alert('One more!');
      });
  }

  win(prize) {
    modals.confirmBox( { message:
      `Congratulations! You were really great!
      Your prize: ${prize}
      Would you play once more?`}, (oneMore) => {
        if (oneMore) alert('One more!');
      });
  }

  askName() {
    modals.inputBox({ message: 'Please enter your name' }, player => {
      this.emit('changePlayerName', { player } );
    });
  }

  error(args) {
    modals.messageBox( { message: 'Something gone wrong with our server. We appologize for inconvenience. We will try to reconnect...'}, () => {
      document.location.reload(true);
    });
  }


};


// EXTERNAL MODULE: ./node_modules/util/util.js
var util = __webpack_require__(0);
var util_default = /*#__PURE__*/__webpack_require__.n(util);

// CONCATENATED MODULE: ./src/frontend/base/BaseModel.js


class BaseModel_BaseModel extends EventEmitter {
  constructor(schema) {
    super();
    // schema представляет собой объект с необходимыми в модели свойствами и их начальными значениями.
    for (let prop of Object.keys(schema)) {
      const privateProp = '_' + prop
      this[privateProp] = schema[prop];
      Object.defineProperty(this, prop, {
        set: value => {

          const oldValue = this[privateProp];
          this[privateProp] = value;
          this.emit(prop + '_change', {
            model: this,
            changed: prop,
            oldValue,
            value
          });
        },
        get: () => {
          return this[privateProp];
        }
      });
    }
  }
  // Это будет работать только при изменении "корневых" свойств.
}
// CONCATENATED MODULE: ./src/frontend/models/State.js




class State_State extends BaseModel_BaseModel {

  constructor(initialState) {
    super(initialState);
  }

  startNewGame() {
    util_default.a.ajax('/api/new', {}, (err, res) => {
      if (err) {
        this.emit('serverError', {
          model: this, message: 'startNewGame failed'
        });
      } else {
        this.status = res.status;
        this.question = res.question;
        this.answers = res.answers;
        this.ladderCurrentStage = res.ladderCurrentStage;
        this.ladderStages = res.ladderStages;
      }
    });
  }

  tryAnswer(option) {
    util_default.a.ajax('/api/try', { option }, (err, res) => {
      if (err) {
        this.emit('serverError', {
          model: this, message: 'checking answer failed'
        });
      } else {
        if (res.correct) {
          if (res.status != 'win') {
            this.question = res.question;
            this.answers = res.answers;
            this.currentStage = this.currentStage++;
          } else {
            this.emit('win', { prize: res.prize });
          }
        } else {
          this.emit('loss', { correct: res.correct, option });
        }
      }
    });
  }

  flee() {
    util_default.a.ajax('/api/flee', {}, (err, res) => {
      if (err) {
        this.emit('serverError', {
          model: this, message: 'flee failed'
        });
      } else {
        this.emit('flee', { prize: res.prize });
      }
    });
  }
};
// CONCATENATED MODULE: ./src/frontend/controllers/MainController.js


class MainController {
  constructor(view, state) {

    debugger;
    this.updatePlayerName(state.player);
    this.updateLadderStages(state.ladder);
    this.updateQuestion(state.question);
    state.status = 0;

    {

    }

    state.on('status_change', (args) => {
      this.updateStatus(args.status);
    });

    state.on('player_change', args => {
      this.updatePlayerName(args.player);
    });

    state.on('serverError', args => {
      view.error(args);
    });

    state.on('loss', args => {
      view.loss(args);
    });

    state.on('win', args => {
      view.win(args);
    });


    view.on('newPlayer', args => {
      state.player = args.player;
    });

    view.on('contribute', args => {
      alert('contribute!');
    });

    view.on('play', args => {
      state.startNewGame();
    });
  }

  updateStatus(status) {
    {
      switch (status) {
        case 'incognito':
          view.switchTo('mainLayout');
          view.askName();
          break;
        case 'welcome':
          view.switchTo('mainLayout');
          break;
        case 'playing':
          view.switchTo('gameLayout');
          break;
      }
    }
  }

  updatePlayerName(player) {
    view.mainLayout.greetings.setData( { player } );
    view.gameLayout.player.setData( { player } );
  }

  updateQuestion(question, answers) {
    view.gameLayout.question.setData( { question, answers });
  }

  updateLadderStages(stages) {
    view.gameLayout.ladder.setData( { stages });
  }

  updateLadderCurrentStage(currentStage) {
    view.gameLayout.ladder.setData( { currentStage });
  }

  setPlayerName(player) {
    state._player = player;
  }

}
// CONCATENATED MODULE: ./src/frontend/main.js






window.onload = () => {
  window.initialState = JSON.parse(document.getElementById('state').innerHTML);
  window.state = new State_State(initialState);
  debugger;
  window.view = new View_View();
  window.controller = new MainController(view, state);
};

/***/ })
/******/ ]);