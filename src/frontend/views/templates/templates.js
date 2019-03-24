import pug from "vendor/pug-runtime-es6";export default {  render_confirmBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(buttons, message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window confirm-box"\u003E\n    \u003Cdiv class="message"\u003E' +        pug.escape(null == (pug_interp = message) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="positive"\u003E' +        pug.escape(null == (pug_interp = buttons.positive) ? "" : pug_interp) +        '\u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="negative"\u003E' +        pug.escape(null == (pug_interp = buttons.negative) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "buttons" in locals_for_with        ? locals_for_with.buttons        : typeof buttons !== "undefined"        ? buttons        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_inputBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(buttons, message, placeholder) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-sm input-box"\u003E\n    \u003Cdiv class="message"\u003E' +        pug.escape(null == (pug_interp = message) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n    \u003Cinput" +        (' type="text"' +          pug.attr("placeholder", `${placeholder}`, true, false) +          ' id="modal-input"') +        '\u002F\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="positive"\u003E' +        pug.escape(null == (pug_interp = buttons.positive) ? "" : pug_interp) +        '\u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="negative"\u003E' +        pug.escape(null == (pug_interp = buttons.negative) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "buttons" in locals_for_with        ? locals_for_with.buttons        : typeof buttons !== "undefined"        ? buttons        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined,      "placeholder" in locals_for_with        ? locals_for_with.placeholder        : typeof placeholder !== "undefined"        ? placeholder        : undefined    ));    return pug_html;  },  render_messageBox: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(buttons, message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window message-box"\u003E\n    \u003Cdiv class="message"\u003E' +        pug.escape(null == (pug_interp = message) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n    \u003Cdiv class="buttons"\u003E\n      \u003Cbutton type="button" id="positive"\u003E' +        pug.escape(null == (pug_interp = buttons.positive) ? "" : pug_interp) +        "\u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "buttons" in locals_for_with        ? locals_for_with.buttons        : typeof buttons !== "undefined"        ? buttons        : undefined,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_modalLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(message) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv id="modal-wrapper"\u003E\n  \u003Cdiv class="modal-overlay"\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class="modal-window modal-window-lg" style="background: white"\u003E' +        pug.escape(null == (pug_interp = message) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "message" in locals_for_with        ? locals_for_with.message        : typeof message !== "undefined"        ? message        : undefined    ));    return pug_html;  },  render_gameLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cdiv class="frame"\u003E\n  \u003Cheader class="gameHeader"\u003E\n    \u003Cdiv class="controls"\u003E\n      \u003Cdiv id="player"\u003E\u003C\u002Fdiv\u003E\n      \u003Cdiv id="hints"\u003E\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cdiv id="menu"\u003E\u003C\u002Fdiv\u003E\n  \u003C\u002Fheader\u003E\n  \u003Cdiv class="content-wrapper"\u003E\n    \u003Cdiv id="question"\u003E\u003C\u002Fdiv\u003E\n    \u003Cdiv id="ladder"\u003E\u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cfooter\u003E\u003Ca href="https:\u002F\u002Fgithub.com\u002Feonae\u002Fmillionaire" target="_blank"\u003Ecopyright app by Eonae &#xa9\u003C\u002Fa\u003E\u003C\u002Ffooter\u003E\n\u003C\u002Fdiv\u003E';    return pug_html;  },  render_hints: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cdiv class="hints"\u003E\n  \u003Cbutton type="button" id="hint-0"\u003E50\u002F50\u003C\u002Fbutton\u003E\n  \u003Cbutton type="button" id="hint-1"\u003EDisabled\u003C\u002Fbutton\u003E\n  \u003Cbutton type="button" id="hint-2"\u003EDisabled\u003C\u002Fbutton\u003E\n\u003C\u002Fdiv\u003E';    return pug_html;  },  render_ladder: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(currentStage, stages) {      var pug_indent = [];      pug_html = pug_html + '\n\u003Cdiv class="ladder"\u003E';      // iterate stages      (function() {        var $$obj = stages;        if ("number" == typeof $$obj.length) {          for (var index = 0, $$l = $$obj.length; index < $$l; index++) {            var stage = $$obj[index];            if (index < currentStage) {              if (stage.isFixed) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done-immune"\u003E' +                  pug.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done"\u003E' +                  pug.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            } else {              if (stage.immune) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="immune"\u003E' +                  pug.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="general"\u003E' +                  pug.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            }          }        } else {          var $$l = 0;          for (var index in $$obj) {            $$l++;            var stage = $$obj[index];            if (index < currentStage) {              if (stage.isFixed) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done-immune"\u003E' +                  pug.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="done"\u003E' +                  pug.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            } else {              if (stage.immune) {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="immune"\u003E' +                  pug.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              } else {                pug_html =                  pug_html +                  '\n  \u003Cdiv class="general"\u003E' +                  pug.escape(                    null == (pug_interp = stage.prize) ? "" : pug_interp                  ) +                  "\u003C\u002Fdiv\u003E";              }            }          }        }      }.call(this));      pug_html = pug_html + "\n\u003C\u002Fdiv\u003E";    }.call(      this,      "currentStage" in locals_for_with        ? locals_for_with.currentStage        : typeof currentStage !== "undefined"        ? currentStage        : undefined,      "stages" in locals_for_with        ? locals_for_with.stages        : typeof stages !== "undefined"        ? stages        : undefined    ));    return pug_html;  },  render_menu: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cbutton type="button" id="menu"\u003EMenu\u003C\u002Fbutton\u003E';    return pug_html;  },  render_player: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(player) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv class="player"\u003E\n  \u003Cdiv\u003EPlayer:\u003C\u002Fdiv\u003E\n  \u003Cdiv\u003E' +        pug.escape(null == (pug_interp = player) ? "" : pug_interp) +        "\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";    }.call(      this,      "player" in locals_for_with        ? locals_for_with.player        : typeof player !== "undefined"        ? player        : undefined    ));    return pug_html;  },  render_question: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(answers, question) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv class="wrapper"\u003E\n  \u003Cdiv class="question-text"\u003E' +        pug.escape(null == (pug_interp = question) ? "" : pug_interp) +        '\u003C\u002Fdiv\u003E\n  \u003Cdiv class="options"\u003E\n    \u003Cdiv class="options-row"\u003E\n      \u003Cbutton type="button" id="option-0"\u003E' +        pug.escape(null == (pug_interp = answers[0]) ? "" : pug_interp) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003EA\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="option-1"\u003E' +        pug.escape(null == (pug_interp = answers[1]) ? "" : pug_interp) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003EB\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cdiv class="options-row"\u003E\n      \u003Cbutton type="button" id="option-2"\u003E' +        pug.escape(null == (pug_interp = answers[2]) ? "" : pug_interp) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003EC\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n      \u003Cbutton type="button" id="option-3"\u003E' +        pug.escape(null == (pug_interp = answers[3]) ? "" : pug_interp) +        '\n        \u003Cdiv class="letterFrame"\u003E\n          \u003Cdiv class="letter"\u003ED\u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E';    }.call(      this,      "answers" in locals_for_with        ? locals_for_with.answers        : typeof answers !== "undefined"        ? answers        : undefined,      "question" in locals_for_with        ? locals_for_with.question        : typeof question !== "undefined"        ? question        : undefined    ));    return pug_html;  },  render_greetings: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var locals_for_with = locals || {};    (function(player) {      var pug_indent = [];      pug_html =        pug_html +        '\n\u003Cdiv class="greetings"\u003EHello, \u003Cspan\u003E' +        pug.escape(null == (pug_interp = player) ? "" : pug_interp) +        "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";    }.call(      this,      "player" in locals_for_with        ? locals_for_with.player        : typeof player !== "undefined"        ? player        : undefined    ));    return pug_html;  },  render_mainLayout: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cdiv class="frame"\u003E\n  \u003Cheader class="mainHeader"\u003E\n    \u003Cdiv class="title"\u003EWanna be a millionaire?\u003C\u002Fdiv\u003E\n    \u003Cdiv class="mainBar"\u003E\n      \u003Cdiv id="mainMenu"\u003E\u003C\u002Fdiv\u003E\n      \u003Cdiv id="greetings"\u003E\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fheader\u003E\n  \u003Cdiv class="content-wrapper"\u003E\u003C\u002Fdiv\u003E\n  \u003Cfooter\u003E\u003Ca href="https:\u002F\u002Fgithub.com\u002Feonae\u002Fmillionaire" target="_blank"\u003Ecopyright app by Eonae &#xa9\u003C\u002Fa\u003E\u003C\u002Ffooter\u003E\n\u003C\u002Fdiv\u003E';    return pug_html;  },  render_mainMenu: function(locals) {    var pug_html = "",      pug_mixins = {},      pug_interp;    var pug_indent = [];    pug_html =      pug_html +      '\n\u003Cnav class="mainMenu"\u003E\n  \u003Cbutton type="button" id="play"\u003EPlay\u003C\u002Fbutton\u003E\n  \u003Cbutton type="button" id="contribute"\u003EContribute\u003C\u002Fbutton\u003E\n\u003C\u002Fnav\u003E';    return pug_html;  }};