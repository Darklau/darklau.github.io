// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/slider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Slider = /*#__PURE__*/function () {
  function Slider() {
    var _this = this;
    _classCallCheck(this, Slider);
    this.activeClass = 'offers__list__item--current';
    this.nextClass = 'offers__list__item--next';
    this.prevClass = 'offers__list__item--prev';
    this.container = document.querySelector(".offers__list");
    this.slides = Array.from(document.querySelectorAll(".offers__list__item"));
    this.slides.forEach(function (slide) {
      return slide.classList.remove(_this.activeClass);
    });
    this.slides[0].classList.add(this.activeClass);
    this.currentSLide = 0;
    this.previousSlide = this.slides.length - 1;
    this.nextSlide = 1;
    this.setTotalSlides(this.slides.length);
    this.setCurrentPage(this.currentSLide);
    this.setPrevSlide();
    this.setNextSlide();
  }
  _createClass(Slider, [{
    key: "setTotalSlides",
    value: function setTotalSlides(length) {
      // Определение количества слайдов
      document.querySelector('.offers__controller__pagination-value--total').innerHTML = length;
    }
  }, {
    key: "setCurrentPage",
    value: function setCurrentPage(slide) {
      // Определение текущего слайда
      document.querySelector('.offers__controller__pagination-value--current').innerHTML = slide + 1;
    }
  }, {
    key: "switchDirection",
    value: function switchDirection(direction) {
      // Переключение направления анимации
      if (direction === 'left') {
        this.container.classList.remove('offers__list--slide-right');
        this.container.classList.add('offers__list--slide-left');
      }
      if (direction === 'right') {
        this.container.classList.remove('offers__list--slide-left');
        this.container.classList.add('offers__list--slide-right');
      }
    }
  }, {
    key: "toNextSlide",
    value: function toNextSlide() {
      // Переключение на следующий слайд
      this.switchDirection('right');
      this.slides[this.currentSLide].classList.remove(this.activeClass);
      this.currentSLide++;
      if (this.currentSLide === this.slides.length) {
        this.currentSLide = 0;
      }
      this.slides[this.currentSLide].classList.add(this.activeClass);
      this.setCurrentPage(this.currentSLide);
      this.setPrevSlide();
      this.setNextSlide();
    }
  }, {
    key: "toPrevSlide",
    value: function toPrevSlide() {
      // Переключение на предыдущий слайд
      this.switchDirection('left');
      this.slides[this.currentSLide].classList.remove(this.activeClass);
      this.currentSLide--;
      if (this.currentSLide < 0) {
        this.currentSLide = this.slides.length - 1;
      }
      this.slides[this.currentSLide].classList.add(this.activeClass);
      this.setCurrentPage(this.currentSLide);
      this.setPrevSlide();
      this.setNextSlide();
    }
  }, {
    key: "setPrevSlide",
    value: function setPrevSlide() {
      // Определение предыдущего слайда
      this.slides[this.previousSlide].classList.remove(this.prevClass);
      this.previousSlide = this.currentSLide - 1;
      if (this.previousSlide < 0) {
        this.previousSlide = this.slides.length - 1;
      }
      this.slides[this.previousSlide].classList.add(this.prevClass);
    }
  }, {
    key: "setNextSlide",
    value: function setNextSlide() {
      // Определение следующего слайда
      this.slides[this.nextSlide].classList.remove(this.nextClass);
      this.nextSlide = this.currentSLide + 1;
      if (this.nextSlide === this.slides.length) {
        this.nextSlide = 0;
      }
      this.slides[this.nextSlide].classList.add(this.nextClass);
    }
  }]);
  return Slider;
}();
exports.Slider = Slider;
},{}],"js/burger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.burger = void 0;
var burger = function burger() {
  var burger = document.querySelector('.header__top__burger');
  var nav = document.querySelector('.header__bottom');
  burger.addEventListener('click', function () {
    burger.classList.toggle('header__top__burger--active');
    nav.classList.toggle('header__bottom--active');
    document.body.classList.toggle('lock');
  });
};
exports.burger = burger;
},{}],"js/modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modal = void 0;
var modal = function modal() {
  var secondButton = document.querySelector('.header__bottom__nav-button');
  var button = document.querySelector('.header__top__contacts__right-button');
  var close = document.querySelector('.modal__form-close');
  var form = document.querySelector('.modal__form');
  var modal = document.querySelector('.modal');
  var toggleModal = function toggleModal() {
    modal.classList.toggle('modal--active');
  };
  var lockBody = function lockBody() {
    document.body.classList.add('lock');
  };
  var unlockBody = function unlockBody() {
    document.body.classList.remove('lock');
  };
  var closeBurger = function closeBurger() {
    var burger = document.querySelector('.header__top__burger');
    burger.classList.remove('header__top__burger--active');
    var nav = document.querySelector('.header__bottom');
    nav.classList.remove('header__bottom--active');
  };
  button.addEventListener('click', function (e) {
    e.preventDefault();
    lockBody();
    toggleModal();
  });
  close.addEventListener('click', function (e) {
    e.preventDefault();
    unlockBody();
    toggleModal();
    console.log(document.body.classList);
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    unlockBody();
    toggleModal();
    console.log('submitted');
  });
  secondButton.addEventListener('click', function (e) {
    e.preventDefault();
    toggleModal();
    closeBurger();
  });
};
exports.modal = modal;
},{}],"index.js":[function(require,module,exports) {
require('./js/slider');
var _require = require("./js/slider"),
  Slider = _require.Slider;
var _require2 = require("./js/burger"),
  burger = _require2.burger;
var _require3 = require("./js/modal"),
  modal = _require3.modal;
document.addEventListener("DOMContentLoaded", function () {
  var slider = new Slider();
  document.querySelector("button.offers__controller-button--next").addEventListener("click", function () {
    slider.toNextSlide();
  });
  document.querySelector(".offers__controller-button--prev").addEventListener("click", function () {
    slider.toPrevSlide();
  });
  burger();
  modal();
});
},{"./js/slider":"js/slider.js","./js/burger":"js/burger.js","./js/modal":"js/modal.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62085" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map