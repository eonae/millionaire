import pug from "vendor/pug-runtime-es6";export default {  render_message: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-lg" style="background: white"\u003E' +        pug.escape(null == (pug_interp = message) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_preloader: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    return pug_html;  },  render_test: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-lg" style="background: white"\u003E' +        pug.escape(null == (pug_interp = message) ? "" : pug_interp) +        " test!\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_messageBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(btnOkText, message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-sm alert"\u003E\n    \u003Cdiv class="message"\u003E' +        pug.escape(null == (pug_interp = message) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="msgBox-ok"\u003E' +        pug.escape(null == (pug_interp = btnOkText) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "btnOkText" in locals_for_with        ? locals_for_with.btnOkText        : typeof btnOkText !== "undefined"        ? btnOkText        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_modalLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-lg" style="background: white"\u003E' +        pug.escape(null == (pug_interp = message) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  }};