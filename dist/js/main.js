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
/* harmony import */ var _models_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _models_Projectile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _models_Enimes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _models_Particle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _enum_game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);






var CanvasGame =
/** @class */
function () {
  function CanvasGame() {
    var _this = this;

    this.projectiles = [];
    this.particles = [];
    this.enemies = [];
    this.isPlayGame = true;

    this.animate = function () {
      if (_this.isPlayGame) requestAnimationFrame(_this.animate); // todo: After projectile was fire. We will clear canvas and re-draw player

      _this.ctx.fillStyle = 'rgba(0,0,0,0.1)';

      _this.ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height);

      _this.mainPlayer.draw(_this.ctx);

      _this.particles.forEach(function (particle, paIndex) {
        if (particle.alpha < 0) _this.removeItemInArray(_this.particles, paIndex);
        particle.update(_this.ctx);
      });
      /* Render projectiles
       * Check projectiles outside screen and remove it
       */


      _this.projectiles.forEach(function (projectile, pIndex) {
        projectile.update(_this.ctx);

        _this.removeProjectilesOutScreen(projectile, pIndex);
      });

      _this.enemies.forEach(function (enemy, eIndex) {
        enemy.update(_this.ctx); // @ts-ignore

        var distancePlayer = Math.hypot(enemy.x - _this.mainPlayer.x, enemy.y - _this.mainPlayer.y);
        var isGameOver = distancePlayer - enemy.radius - _this.mainPlayer.radius < 1;
        if (isGameOver) _this.isPlayGame = false;

        _this.projectiles.forEach(function (projectile, pIndex) {
          // @ts-ignore
          var distanceEnemy = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
          var isContactEnemy = distanceEnemy - projectile.radius - enemy.radius < 1;

          if (isContactEnemy) {
            _this.renderParticles(projectile, enemy);

            if (enemy.radius - _enum_game__WEBPACK_IMPORTED_MODULE_4__["GAME_ENUM"].MIN_RADIUS > _enum_game__WEBPACK_IMPORTED_MODULE_4__["GAME_ENUM"].MIN_RADIUS) {
              enemy.radius -= _enum_game__WEBPACK_IMPORTED_MODULE_4__["GAME_ENUM"].MIN_RADIUS;
              setTimeout(function () {
                return _this.removeItemInArray(_this.projectiles, pIndex);
              }, 0);
            } else {
              setTimeout(function () {
                _this.removeItemInArray(_this.enemies, eIndex);

                _this.removeItemInArray(_this.projectiles, pIndex);
              }, 0);
            }
          }
        });
      });
    };

    this.init();
    this.handleWindowClick();
    this.animate();
    this.spawnEnemies();
  }

  CanvasGame.prototype.removeItemInArray = function (array, indexRemove) {
    return array.splice(indexRemove, 1);
  };

  CanvasGame.prototype.generateEnemies = function () {
    var radius = Math.random() * (_enum_game__WEBPACK_IMPORTED_MODULE_4__["GAME_ENUM"].MAX_RADIUS - _enum_game__WEBPACK_IMPORTED_MODULE_4__["GAME_ENUM"].MIN_RADIUS) + _enum_game__WEBPACK_IMPORTED_MODULE_4__["GAME_ENUM"].MIN_RADIUS;
    var x = 0;
    var y = 0;

    if (Math.random() < _enum_game__WEBPACK_IMPORTED_MODULE_4__["GAME_ENUM"].HAFT_PAST) {
      x = Math.random() < _enum_game__WEBPACK_IMPORTED_MODULE_4__["GAME_ENUM"].HAFT_PAST ? 0 - radius : this.canvas.width + radius;
      y = Math.random() * this.canvas.height;
    } else {
      x = Math.random() * this.canvas.width;
      y = Math.random() < _enum_game__WEBPACK_IMPORTED_MODULE_4__["GAME_ENUM"].HAFT_PAST ? 0 - radius : this.canvas.height + radius;
    }

    var angle = Math.atan2(this.canvasCenterY - y, this.canvasCenterX - x);
    var velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
    var randomColor = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
    this.enemies.push(new _models_Enimes__WEBPACK_IMPORTED_MODULE_2__["default"](x, y, randomColor, radius, velocity));
  };

  CanvasGame.prototype.spawnEnemies = function () {
    var _this = this;

    setInterval(function () {
      _this.generateEnemies();
    }, 1000);
  };

  CanvasGame.prototype.init = function () {
    this.canvas = document.querySelector('#canvas-game');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.canvasCenterX = this.canvas.width / 2;
    this.canvasCenterY = this.canvas.height / 2;
    this.mainPlayer = new _models_Player__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvasCenterX, this.canvasCenterY, 'blue', 30);
    this.mainPlayer.draw(this.ctx);
  };

  CanvasGame.prototype.handleWindowClick = function () {
    var _this = this;

    window.addEventListener('click', function (e) {
      var clientX = e.clientX,
          clientY = e.clientY;
      var angle = Math.atan2(clientY - _this.canvasCenterY, clientX - _this.canvasCenterX);
      var velocity = {
        x: Math.cos(angle) * 4,
        y: Math.sin(angle) * 4
      };

      _this.projectiles.push(new _models_Projectile__WEBPACK_IMPORTED_MODULE_1__["default"](_this.canvasCenterX, _this.canvasCenterY, 'red', 5, velocity));
    });
  };

  CanvasGame.prototype.removeProjectilesOutScreen = function (projectile, pIndex) {
    var _this = this;

    var isOutScreen = projectile.x - projectile.radius < 0 || projectile.x + projectile.radius > this.canvas.width || projectile.y - projectile.radius < 0 || projectile.y + projectile.radius > this.canvas.height;
    if (isOutScreen) setTimeout(function () {
      return _this.projectiles.splice(pIndex, 1);
    }, 0);
  };

  CanvasGame.prototype.renderParticles = function (projectile, enemy) {
    for (var i = 0; i < CanvasGame.particleNumber; i++) {
      var velocity = {
        x: Math.random() - _enum_game__WEBPACK_IMPORTED_MODULE_4__["GAME_ENUM"].HAFT_PAST,
        y: Math.random() - _enum_game__WEBPACK_IMPORTED_MODULE_4__["GAME_ENUM"].HAFT_PAST
      };
      this.particles.push(new _models_Particle__WEBPACK_IMPORTED_MODULE_3__["default"](projectile.x, projectile.y, enemy.color, 3, velocity));
    }
  };

  CanvasGame.particleNumber = 8;
  return CanvasGame;
}();

new CanvasGame();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
var __extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();



var Player =
/** @class */
function (_super) {
  __extends(Player, _super);

  function Player() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return Player;
}(_Base__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var BaseModel =
/** @class */
function () {
  function BaseModel(x, y, color, radius) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
  }

  BaseModel.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  return BaseModel;
}();

/* harmony default export */ __webpack_exports__["default"] = (BaseModel);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
var __extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();



var Projectile =
/** @class */
function (_super) {
  __extends(Projectile, _super);

  function Projectile(x, y, color, radius, velocity) {
    var _this = _super.call(this, x, y, color, radius) || this;

    _this.velocity = velocity;
    return _this;
  }

  Projectile.prototype.update = function (ctx) {
    this.draw(ctx);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };

  return Projectile;
}(_Base__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Projectile);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Projectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
var __extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();



var Enemy =
/** @class */
function (_super) {
  __extends(Enemy, _super);

  function Enemy() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return Enemy;
}(_Projectile__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Enemy);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Projectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
var __extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();



var Particle =
/** @class */
function (_super) {
  __extends(Particle, _super);

  function Particle() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.alpha = 1;
    return _this;
  }

  Particle.prototype.update = function (ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;

    _super.prototype.update.call(this, ctx);

    ctx.restore();
  };

  Particle.prototype.draw = function (ctx) {
    _super.prototype.draw.call(this, ctx);

    this.alpha -= 0.01;
  };

  return Particle;
}(_Projectile__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Particle);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_ENUM", function() { return GAME_ENUM; });
var GAME_ENUM;

(function (GAME_ENUM) {
  GAME_ENUM[GAME_ENUM["HAFT_PAST"] = 0.5] = "HAFT_PAST";
  GAME_ENUM[GAME_ENUM["MAX_RADIUS"] = 30] = "MAX_RADIUS";
  GAME_ENUM[GAME_ENUM["MIN_RADIUS"] = 10] = "MIN_RADIUS";
})(GAME_ENUM || (GAME_ENUM = {}));

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map