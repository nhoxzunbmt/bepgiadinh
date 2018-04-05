/*!
  * Bootstrap v4.0.0 (https://getbootstrap.com)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
	(factory((global.bootstrap = {}),global.jQuery,global.Popper));
}(this, (function (exports,$,Popper) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;
Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($$$1) {
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */
  var transition = false;
  var MAX_UID = 1000000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($$$1(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndTest() {
    if (typeof window !== 'undefined' && window.QUnit) {
      return false;
    }

    return {
      end: 'transitionend'
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $$$1(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();
    $$$1.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  function escapeId(selector) {
    // We escape IDs in case of special selectors (selector = '#myId:something')
    // $.escapeSelector does not exist in jQuery < 3
    selector = typeof $$$1.escapeSelector === 'function' ? $$$1.escapeSelector(selector).substr(1) : selector.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1');
    return selector;
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      } // If it's an ID


      if (selector.charAt(0) === '#') {
        selector = escapeId(selector);
      }

      try {
        var $selector = $$$1(document).find(selector);
        return $selector.length > 0 ? selector : null;
      } catch (err) {
        return null;
      }
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $$$1(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    }
  };
  setTransitionEndSupport();
  return Util;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($$$1) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'alert';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 150;
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      element = element || this._element;

      var rootElement = this._getRootElement(element);

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $$$1.removeData(this._element, DATA_KEY);
      this._element = null;
    }; // Private


    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = $$$1(selector)[0];
      }

      if (!parent) {
        parent = $$$1(element).closest("." + ClassName.ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $$$1.Event(Event.CLOSE);
      $$$1(element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $$$1(element).removeClass(ClassName.SHOW);

      if (!Util.supportsTransitionEnd() || !$$$1(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);

        return;
      }

      $$$1(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(TRANSITION_DURATION);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $$$1(element).detach().trigger(Event.CLOSED).remove();
    }; // Static


    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $$$1(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);
    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Alert._jQueryInterface;
  $$$1.fn[NAME].Constructor = Alert;

  $$$1.fn[NAME].noConflict = function () {
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($$$1) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'button';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event = {
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $$$1(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $$$1(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $$$1(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $$$1(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }

            input.checked = !$$$1(this._element).hasClass(ClassName.ACTIVE);
            $$$1(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !$$$1(this._element).hasClass(ClassName.ACTIVE));
      }

      if (triggerChangeEvent) {
        $$$1(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    _proto.dispose = function dispose() {
      $$$1.removeData(this._element, DATA_KEY);
      this._element = null;
    }; // Static


    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $$$1(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $$$1(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);
    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!$$$1(button).hasClass(ClassName.BUTTON)) {
      button = $$$1(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($$$1(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $$$1(event.target).closest(Selector.BUTTON)[0];
    $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Button._jQueryInterface;
  $$$1.fn[NAME].Constructor = Button;

  $$$1.fn[NAME].noConflict = function () {
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($$$1) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'carousel';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event = {
    SLIDE: "slide" + EVENT_KEY,
    SLID: "slid" + EVENT_KEY,
    KEYDOWN: "keydown" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY,
    TOUCHEND: "touchend" + EVENT_KEY,
    LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  };
  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this._config = this._getConfig(config);
      this._element = $$$1(element)[0];
      this._indicatorsElement = $$$1(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if ($$$1(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = $$$1(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $$$1(this._element).one(Event.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $$$1(this._element).off(EVENT_KEY);
      $$$1.removeData(this._element, DATA_KEY);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    }; // Private


    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $$$1(this._element).on(Event.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $$$1(this._element).on(Event.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });

        if ('ontouchstart' in document.documentElement) {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          $$$1(this._element).on(Event.TOUCHEND, function () {
            _this2.pause();

            if (_this2.touchTimeout) {
              clearTimeout(_this2.touchTimeout);
            }

            _this2.touchTimeout = setTimeout(function (event) {
              return _this2.cycle(event);
            }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
          });
        }
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;

        default:
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = $$$1.makeArray($$$1(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex($$$1(this._element).find(Selector.ACTIVE_ITEM)[0]);

      var slideEvent = $$$1.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $$$1(this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        $$$1(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $$$1(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this3 = this;

      var activeElement = $$$1(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $$$1.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if (Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.SLIDE)) {
        $$$1(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $$$1(activeElement).addClass(directionalClassName);
        $$$1(nextElement).addClass(directionalClassName);
        $$$1(activeElement).one(Util.TRANSITION_END, function () {
          $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
          $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this3._isSliding = false;
          setTimeout(function () {
            return $$$1(_this3._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        $$$1(activeElement).removeClass(ClassName.ACTIVE);
        $$$1(nextElement).addClass(ClassName.ACTIVE);
        this._isSliding = false;
        $$$1(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    }; // Static


    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $$$1(this).data(DATA_KEY);

        var _config = _extends({}, Default, $$$1(this).data());

        if (typeof config === 'object') {
          _config = _extends({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $$$1(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $$$1(selector)[0];

      if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = _extends({}, $$$1(target).data(), $$$1(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($$$1(target), config);

      if (slideIndex) {
        $$$1(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);
    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
  $$$1(window).on(Event.LOAD_DATA_API, function () {
    $$$1(Selector.DATA_RIDE).each(function () {
      var $carousel = $$$1(this);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Carousel._jQueryInterface;
  $$$1.fn[NAME].Constructor = Carousel;

  $$$1.fn[NAME].noConflict = function () {
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($$$1) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'collapse';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 600;
  var Default = {
    toggle: true,
    parent: ''
  };
  var DefaultType = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event = {
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $$$1.makeArray($$$1("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var tabToggles = $$$1(Selector.DATA_TOGGLE);

      for (var i = 0; i < tabToggles.length; i++) {
        var elem = tabToggles[i];
        var selector = Util.getSelectorFromElement(elem);

        if (selector !== null && $$$1(selector).filter(element).length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($$$1(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = $$$1.makeArray($$$1(this._parent).find(Selector.ACTIVES).filter("[data-parent=\"" + this._config.parent + "\"]"));

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $$$1.Event(Event.SHOW);
      $$$1(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

        if (!activesData) {
          $$$1(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length > 0) {
        $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $$$1(_this._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $$$1.Event(Event.HIDE);
      $$$1(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      if (this._triggerArray.length > 0) {
        for (var i = 0; i < this._triggerArray.length; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $$$1(selector);

            if (!$elem.hasClass(ClassName.SHOW)) {
              $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $$$1.removeData(this._element, DATA_KEY);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    }; // Private


    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent = null;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = $$$1(this._config.parent)[0];
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      $$$1(parent).find(selector).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $$$1(element).hasClass(ClassName.SHOW);

        if (triggerArray.length > 0) {
          $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    }; // Static


    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $$$1(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $$$1(this);
        var data = $this.data(DATA_KEY);

        var _config = _extends({}, Default, $this.data(), typeof config === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);
    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $$$1(this);
    var selector = Util.getSelectorFromElement(this);
    $$$1(selector).each(function () {
      var $target = $$$1(this);
      var data = $target.data(DATA_KEY);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Collapse._jQueryInterface;
  $$$1.fn[NAME].Constructor = Collapse;

  $$$1.fn[NAME].noConflict = function () {
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($$$1) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'dropdown';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
    KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var Selector = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent'
  };
  var DefaultType = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);

      var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
      $$$1(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
        }

        var element = this._element; // For dropup with alignment we use the parent as popper container

        if ($$$1(parent).hasClass(ClassName.DROPUP)) {
          if ($$$1(this._menu).hasClass(ClassName.MENULEFT) || $$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            element = parent;
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $$$1(parent).addClass(ClassName.POSITION_STATIC);
        }

        this._popper = new Popper(element, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
        $$$1('body').children().on('mouseover', null, $$$1.noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $$$1(this._menu).toggleClass(ClassName.SHOW);
      $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $$$1.removeData(this._element, DATA_KEY);
      $$$1(this._element).off(EVENT_KEY);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    }; // Private


    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $$$1(this._element).on(Event.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, this.constructor.Default, $$$1(this._element).data(), config);
      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        this._menu = $$$1(parent).find(Selector.MENU)[0];
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $$$1(this._element).parent();
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(ClassName.DROPUP)) {
        placement = AttachmentMap.TOP;

        if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $$$1(this._element).closest('.navbar').length > 0;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var _this2 = this;

      var offsetConf = {};

      if (typeof this._config.offset === 'function') {
        offsetConf.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets) || {});
          return data;
        };
      } else {
        offsetConf.offset = this._config.offset;
      }

      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: offsetConf,
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      };
      return popperConfig;
    }; // Static


    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $$$1(this).data(DATA_KEY);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $$$1(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = $$$1.makeArray($$$1(Selector.DATA_TOGGLE));

      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $$$1(toggles[i]).data(DATA_KEY);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$$$1(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
        $$$1(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $$$1('body').children().off('mouseover', null, $$$1.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');
        $$$1(dropdownMenu).removeClass(ClassName.SHOW);
        $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $$$1(selector)[0];
      }

      return parent || element.parentNode;
    }; // eslint-disable-next-line complexity


    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $$$1(parent).hasClass(ClassName.SHOW);

      if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $$$1(parent).find(Selector.DATA_TOGGLE)[0];
          $$$1(toggle).trigger('focus');
        }

        $$$1(this).trigger('click');
        return;
      }

      var items = $$$1(parent).find(Selector.VISIBLE_ITEMS).get();

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);
    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($$$1(this), 'toggle');
  }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Dropdown._jQueryInterface;
  $$$1.fn[NAME].Constructor = Dropdown;

  $$$1.fn[NAME].noConflict = function () {
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}($, Popper);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($$$1) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'modal';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    RESIZE: "resize" + EVENT_KEY,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top',
    NAVBAR_TOGGLER: '.navbar-toggler'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $$$1(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isTransitioning || this._isShown) {
        return;
      }

      if (Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $$$1.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });
      $$$1(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      $$$1(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();

      this._setResizeEvent();

      $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($$$1(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning || !this._isShown) {
        return;
      }

      var hideEvent = $$$1.Event(Event.HIDE);
      $$$1(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $$$1(document).off(Event.FOCUSIN);
      $$$1(this._element).removeClass(ClassName.SHOW);
      $$$1(this._element).off(Event.CLICK_DISMISS);
      $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {
        $$$1(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      $$$1.removeData(this._element, DATA_KEY);
      $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    }; // Private


    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $$$1(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $$$1.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        $$$1(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            event.preventDefault();

            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $$$1(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $$$1(window).on(Event.RESIZE, function (event) {
          return _this6.handleUpdate(event);
        });
      } else {
        $$$1(window).off(Event.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $$$1(document.body).removeClass(ClassName.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        $$$1(_this7._element).trigger(Event.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $$$1(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        var doAnimate = Util.supportsTransitionEnd() && animate;
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $$$1(this._backdrop).addClass(animate);
        }

        $$$1(this._backdrop).appendTo(document.body);
        $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (doAnimate) {
          Util.reflow(this._backdrop);
        }

        $$$1(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!doAnimate) {
          callback();
          return;
        }

        $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else if (!this._isShown && this._backdrop) {
        $$$1(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if (Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE)) {
          $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    }; // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------


    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this9 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        // Adjust fixed content padding
        $$$1(Selector.FIXED_CONTENT).each(function (index, element) {
          var actualPadding = $$$1(element)[0].style.paddingRight;
          var calculatedPadding = $$$1(element).css('padding-right');
          $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $$$1(Selector.STICKY_CONTENT).each(function (index, element) {
          var actualMargin = $$$1(element)[0].style.marginRight;
          var calculatedMargin = $$$1(element).css('margin-right');
          $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
        }); // Adjust navbar-toggler margin

        $$$1(Selector.NAVBAR_TOGGLER).each(function (index, element) {
          var actualMargin = $$$1(element)[0].style.marginRight;
          var calculatedMargin = $$$1(element).css('margin-right');
          $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) + _this9._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $$$1('body').css('padding-right');
        $$$1('body').data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      $$$1(Selector.FIXED_CONTENT).each(function (index, element) {
        var padding = $$$1(element).data('padding-right');

        if (typeof padding !== 'undefined') {
          $$$1(element).css('padding-right', padding).removeData('padding-right');
        }
      }); // Restore sticky content and navbar-toggler margin

      $$$1(Selector.STICKY_CONTENT + ", " + Selector.NAVBAR_TOGGLER).each(function (index, element) {
        var margin = $$$1(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $$$1(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $$$1('body').data('padding-right');

      if (typeof padding !== 'undefined') {
        $$$1('body').css('padding-right', padding).removeData('padding-right');
      }
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    }; // Static


    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $$$1(this).data(DATA_KEY);

        var _config = _extends({}, Modal.Default, $$$1(this).data(), typeof config === 'object' && config);

        if (!data) {
          data = new Modal(this, _config);
          $$$1(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);
    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $$$1(selector)[0];
    }

    var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _extends({}, $$$1(target).data(), $$$1(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($$$1(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call($$$1(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Modal._jQueryInterface;
  $$$1.fn[NAME].Constructor = Modal;

  $$$1.fn[NAME].noConflict = function () {
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($$$1) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'tooltip';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent'
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    INSERTED: "inserted" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    FOCUSOUT: "focusout" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY
  };
  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      /**
       * Check for Popper dependency
       * Popper - https://popper.js.org
       */
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $$$1.removeData(this.element, this.constructor.DATA_KEY);
      $$$1(this.element).off(this.constructor.EVENT_KEY);
      $$$1(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $$$1(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper !== null) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($$$1(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $$$1.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $$$1(this.element).trigger(showEvent);
        var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $$$1(tip).addClass(ClassName.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);
        var container = this.config.container === false ? document.body : $$$1(this.config.container);
        $$$1(tip).data(this.constructor.DATA_KEY, this);

        if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $$$1(tip).appendTo(container);
        }

        $$$1(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, {
          placement: attachment,
          modifiers: {
            offset: {
              offset: this.config.offset
            },
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Selector.ARROW
            },
            preventOverflow: {
              boundariesElement: this.config.boundary
            }
          },
          onCreate: function onCreate(data) {
            if (data.originalPlacement !== data.placement) {
              _this._handlePopperPlacementChange(data);
            }
          },
          onUpdate: function onUpdate(data) {
            _this._handlePopperPlacementChange(data);
          }
        });
        $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $$$1('body').children().on('mouseover', null, $$$1.noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if (Util.supportsTransitionEnd() && $$$1(this.tip).hasClass(ClassName.FADE)) {
          $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $$$1(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $$$1('body').children().off('mouseover', null, $$$1.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (Util.supportsTransitionEnd() && $$$1(this.tip).hasClass(ClassName.FADE)) {
        $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    }; // Protected


    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $$$1(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $$$1(this.getTipElement());
      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());
      $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      var html = this.config.html;

      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (html) {
          if (!$$$1(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($$$1(content).text());
        }
      } else {
        $element[html ? 'html' : 'text'](content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    }; // Private


    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this3 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
            return _this3.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
          $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
            return _this3._enter(event);
          }).on(eventOut, _this3.config.selector, function (event) {
            return _this3._leave(event);
          });
        }

        $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
          return _this3.hide();
        });
      });

      if (this.config.selector) {
        this.config = _extends({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $$$1(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $$$1(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $$$1(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $$$1(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, this.constructor.Default, $$$1(this.element).data(), config);

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $$$1(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(data) {
      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(data.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $$$1(tip).removeClass(ClassName.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    }; // Static


    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $$$1(this).data(DATA_KEY);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $$$1(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);
    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[NAME] = Tooltip._jQueryInterface;
  $$$1.fn[NAME].Constructor = Tooltip;

  $$$1.fn[NAME].noConflict = function () {
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}($, Popper);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($$$1) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'popover';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var CLASS_PREFIX = 'bs-popover';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var Default = _extends({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });
  var DefaultType = _extends({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });
  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    INSERTED: "inserted" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    FOCUSOUT: "focusout" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $$$1(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(Selector.CONTENT), content);
      $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
    }; // Private


    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $$$1(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    }; // Static


    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $$$1(this).data(DATA_KEY);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $$$1(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);
    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $$$1.fn[NAME] = Popover._jQueryInterface;
  $$$1.fn[NAME].Constructor = Popover;

  $$$1.fn[NAME].noConflict = function () {
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function ($$$1) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'scrollspy';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event = {
    ACTIVATE: "activate" + EVENT_KEY,
    SCROLL: "scroll" + EVENT_KEY,
    LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };
  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ScrollSpy =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = $$$1.makeArray($$$1(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = $$$1(targetSelector)[0];
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $$$1.removeData(this._element, DATA_KEY);
      $$$1(this._scrollElement).off(EVENT_KEY);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    }; // Private


    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);

      if (typeof config.target !== 'string') {
        var id = $$$1(config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME);
          $$$1(config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


      queries = queries.map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
      });
      var $link = $$$1(queries.join(','));

      if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        $link.addClass(ClassName.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
      }

      $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      $$$1(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
    }; // Static


    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $$$1(this).data(DATA_KEY);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $$$1(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);
    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $$$1.makeArray($$$1(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $$$1(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
  $$$1.fn[NAME].Constructor = ScrollSpy;

  $$$1.fn[NAME].noConflict = function () {
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($$$1) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'tab';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 150;
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
        previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $$$1.Event(Event.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $$$1.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $$$1(previous).trigger(hideEvent);
      }

      $$$1(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $$$1(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $$$1.Event(Event.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: previous
        });
        $$$1(previous).trigger(hiddenEvent);
        $$$1(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $$$1.removeData(this._element, DATA_KEY);
      this._element = null;
    }; // Private


    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements;

      if (container.nodeName === 'UL') {
        activeElements = $$$1(container).find(Selector.ACTIVE_UL);
      } else {
        activeElements = $$$1(container).children(Selector.ACTIVE);
      }

      var active = activeElements[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && active && $$$1(active).hasClass(ClassName.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
        var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $$$1(element).addClass(ClassName.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);
      $$$1(element).addClass(ClassName.SHOW);

      if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
        var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

        if (dropdownElement) {
          $$$1(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    }; // Static


    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $$$1(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);
    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($$$1(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Tab._jQueryInterface;
  $$$1.fn[NAME].Constructor = Tab;

  $$$1.fn[NAME].noConflict = function () {
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

(function ($$$1) {
  if (typeof $$$1 === 'undefined') {
    throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
  }

  var version = $$$1.fn.jquery.split(' ')[0].split('.');
  var minMajor = 1;
  var ltMajor = 2;
  var minMinor = 9;
  var minPatch = 1;
  var maxMajor = 4;

  if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
  }
})($);

exports.Util = Util;
exports.Alert = Alert;
exports.Button = Button;
exports.Carousel = Carousel;
exports.Collapse = Collapse;
exports.Dropdown = Dropdown;
exports.Modal = Modal;
exports.Popover = Popover;
exports.Scrollspy = ScrollSpy;
exports.Tab = Tab;
exports.Tooltip = Tooltip;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.js.map

/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g--;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var b,c,e;b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&e<=0&&this.preloadAutoWidthImages(b)}this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.$element.is(":visible")&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),this.settings.responsive!==!1&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var d=-1,e=30,f=this.width(),g=this.coordinates();return this.settings.freeDrag||a.each(g,a.proxy(function(a,h){return"left"===c&&b>h-e&&b<h+e?d=a:"right"===c&&b>h-f-e&&b<h-f+e?d=a+1:this.op(b,"<",h)&&this.op(b,">",g[a+1]||h-f)&&(d="left"===c?a+1:a),d===-1},this)),this.settings.loop||(this.op(b,">",g[this.minimum()])?d=b=this.minimum():this.op(b,"<",g[this.maximum()])&&(d=b=this.maximum())),d},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){for(b=this._items.length,c=this._items[--b].width(),d=this.$element.width();b--&&(c+=this._items[b].width()+this.settings.margin,!(c>d)););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=f*-1*g),a=c+e,d=((a-h)%g+g)%g+h,d!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.$element.is(":visible")&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),this.settings.responsive!==!1&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&a.namespace.indexOf("owl")!==-1?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.$element.is(":visible"),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.$element.is(":visible")!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&e*-1||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.$stage.children().toArray().slice(b,c),e=[],f=0;a.each(d,function(b,c){e.push(a(c).height())}),f=Math.max.apply(null,e),this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};if(b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),"youtube"===f.type?c='<iframe width="'+g+'" height="'+h+'" src="//www.youtube.com/embed/'+f.id+"?autoplay=1&rel=0&v="+f.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===f.type?c='<iframe src="//player.vimeo.com/video/'+f.id+'?autoplay=1" width="'+g+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>':"vzaar"===f.type&&(c='<iframe frameborder="0"height="'+h+'"width="'+g+'" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/'+f.id+'/player?autoplay=true"></iframe>'),a('<div class="owl-video-frame">'+c+"</div>").insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},
a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._timeout=null,this._paused=!1,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._core.settings.autoplay&&this._setAutoPlayInterval()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype.play=function(a,b){this._paused=!1,this._core.is("rotating")||(this._core.enter("rotating"),this._setAutoPlayInterval())},e.prototype._getNextTimeout=function(d,e){return this._timeout&&b.clearTimeout(this._timeout),b.setTimeout(a.proxy(function(){this._paused||this._core.is("busy")||this._core.is("interacting")||c.hidden||this._core.next(e||this._core.settings.autoplaySpeed)},this),d||this._core.settings.autoplayTimeout)},e.prototype._setAutoPlayInterval=function(){this._timeout=this._getNextTimeout()},e.prototype.stop=function(){this._core.is("rotating")&&(b.clearTimeout(this._timeout),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&(this._paused=!0)},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","div",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
// ==================================================
// fancyBox v3.2.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2017 fancyApps
//
// ==================================================
!function(t,e,n,o){"use strict";function a(t){var e=n(t.currentTarget),o=t.data?t.data.options:{},a=e.attr("data-fancybox")||"",i=0,s=[];t.isDefaultPrevented()||(t.preventDefault(),a?(s=o.selector?n(o.selector):t.data?t.data.items:[],s=s.length?s.filter('[data-fancybox="'+a+'"]'):n('[data-fancybox="'+a+'"]'),i=s.index(e),i<0&&(i=0)):s=[e],n.fancybox.open(s,o,i))}if(n){if(n.fn.fancybox)return void("console"in t&&console.log("fancyBox already initialized"));var i={loop:!1,margin:[44,0],gutter:50,keyboard:!0,arrows:!0,infobar:!0,toolbar:!0,buttons:["slideShow","fullScreen","thumbs","share","close"],idleTime:3,smallBtn:"auto",protect:!1,modal:!1,image:{preload:"auto"},ajax:{settings:{data:{fancybox:!0}}},iframe:{tpl:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',preload:!0,css:{},attr:{scrolling:"auto"}},defaultType:"image",animationEffect:"zoom",animationDuration:500,zoomOpacity:"auto",transitionEffect:"fade",transitionDuration:366,slideClass:"",baseClass:"",baseTpl:'<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',spinnerTpl:'<div class="fancybox-loading"></div>',errorTpl:'<div class="fancybox-error"><p>{{ERROR}}<p></div>',btnTpl:{download:'<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}"><svg viewBox="0 0 40 40"><path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M26,28 L13,28 L27,28 L14,28" /></svg></a>',zoom:'<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg viewBox="0 0 40 40"><path d="M 18,17 m-8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M25,23 L31,29 L25,23" /></svg></button>',close:'<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',smallBtn:'<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',arrowLeft:'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path></svg></button>',arrowRight:'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><svg viewBox="0 0 40 40"><path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path></svg></button>'},parentEl:"body",autoFocus:!1,backFocus:!0,trapFocus:!0,fullScreen:{autoStart:!1},touch:{vertical:!0,momentum:!0},hash:null,media:{},slideShow:{autoStart:!1,speed:4e3},thumbs:{autoStart:!1,hideOnClose:!0,parentEl:".fancybox-container",axis:"y"},onInit:n.noop,beforeLoad:n.noop,afterLoad:n.noop,beforeShow:n.noop,afterShow:n.noop,beforeClose:n.noop,afterClose:n.noop,onActivate:n.noop,onDeactivate:n.noop,clickContent:function(t,e){return"image"===t.type&&"zoom"},clickSlide:"close",clickOutside:"close",dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1,mobile:{margin:0,clickContent:function(t,e){return"image"===t.type&&"toggleControls"},clickSlide:function(t,e){return"image"===t.type?"toggleControls":"close"},dblclickContent:function(t,e){return"image"===t.type&&"zoom"},dblclickSlide:function(t,e){return"image"===t.type&&"zoom"}},lang:"en",i18n:{en:{CLOSE:"Close",NEXT:"Next",PREV:"Previous",ERROR:"The requested content cannot be loaded. <br/> Please try again later.",PLAY_START:"Start slideshow",PLAY_STOP:"Pause slideshow",FULL_SCREEN:"Full screen",THUMBS:"Thumbnails",DOWNLOAD:"Download",SHARE:"Share",ZOOM:"Zoom"},de:{CLOSE:"Schliessen",NEXT:"Weiter",PREV:"Zurück",ERROR:"Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",PLAY_START:"Diaschau starten",PLAY_STOP:"Diaschau beenden",FULL_SCREEN:"Vollbild",THUMBS:"Vorschaubilder",DOWNLOAD:"Herunterladen",SHARE:"Teilen",ZOOM:"Maßstab"}}},s=n(t),r=n(e),c=0,l=function(t){return t&&t.hasOwnProperty&&t instanceof n},u=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}}(),d=function(){var t,n=e.createElement("fakeelement"),a={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in a)if(n.style[t]!==o)return a[t];return"transitionend"}(),f=function(t){return t&&t.length&&t[0].offsetHeight},p=function(t,o,a){var i=this;i.opts=n.extend(!0,{index:a},n.fancybox.defaults,o||{}),n.fancybox.isMobile&&(i.opts=n.extend(!0,{},i.opts,i.opts.mobile)),o&&n.isArray(o.buttons)&&(i.opts.buttons=o.buttons),i.id=i.opts.id||++c,i.group=[],i.currIndex=parseInt(i.opts.index,10)||0,i.prevIndex=null,i.prevPos=null,i.currPos=0,i.firstRun=null,i.createGroup(t),i.group.length&&(i.$lastFocus=n(e.activeElement).blur(),i.slides={},i.init())};n.extend(p.prototype,{init:function(){var a,i,s,c=this,l=c.group[c.currIndex],u=l.opts,d=n.fancybox.scrollbarWidth;c.scrollTop=r.scrollTop(),c.scrollLeft=r.scrollLeft(),n.fancybox.getInstance()||(n("body").addClass("fancybox-active"),/iPad|iPhone|iPod/.test(navigator.userAgent)&&!t.MSStream?"image"!==l.type&&n("body").css("top",n("body").scrollTop()*-1).addClass("fancybox-iosfix"):!n.fancybox.isMobile&&e.body.scrollHeight>t.innerHeight&&(d===o&&(a=n('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo("body"),d=n.fancybox.scrollbarWidth=a[0].offsetWidth-a[0].clientWidth,a.remove()),n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: '+d+"px; }</style>"),n("body").addClass("compensate-for-scrollbar"))),s="",n.each(u.buttons,function(t,e){s+=u.btnTpl[e]||""}),i=n(c.translate(c,u.baseTpl.replace("{{buttons}}",s).replace("{{arrows}}",u.btnTpl.arrowLeft+u.btnTpl.arrowRight))).attr("id","fancybox-container-"+c.id).addClass("fancybox-is-hidden").addClass(u.baseClass).data("FancyBox",c).appendTo(u.parentEl),c.$refs={container:i},["bg","inner","infobar","toolbar","stage","caption","navigation"].forEach(function(t){c.$refs[t]=i.find(".fancybox-"+t)}),c.trigger("onInit"),c.activate(),c.jumpTo(c.currIndex)},translate:function(t,e){var n=t.opts.i18n[t.opts.lang];return e.replace(/\{\{(\w+)\}\}/g,function(t,e){var a=n[e];return a===o?t:a})},createGroup:function(t){var e=this,a=n.makeArray(t);n.each(a,function(t,a){var i,s,r,c,l={},u={};n.isPlainObject(a)?(l=a,u=a.opts||a):"object"===n.type(a)&&n(a).length?(i=n(a),u=i.data(),u=n.extend({},u,u.options||{}),u.$orig=i,l.src=u.src||i.attr("href"),l.type||l.src||(l.type="inline",l.src=a)):l={type:"html",src:a+""},l.opts=n.extend(!0,{},e.opts,u),n.isArray(u.buttons)&&(l.opts.buttons=u.buttons),s=l.type||l.opts.type,r=l.src||"",!s&&r&&(r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)?s="image":r.match(/\.(pdf)((\?|#).*)?$/i)?s="pdf":"#"===r.charAt(0)&&(s="inline")),s?l.type=s:e.trigger("objectNeedsType",l),l.index=e.group.length,l.opts.$orig&&!l.opts.$orig.length&&delete l.opts.$orig,!l.opts.$thumb&&l.opts.$orig&&(l.opts.$thumb=l.opts.$orig.find("img:first")),l.opts.$thumb&&!l.opts.$thumb.length&&delete l.opts.$thumb,"function"===n.type(l.opts.caption)&&(l.opts.caption=l.opts.caption.apply(a,[e,l])),"function"===n.type(e.opts.caption)&&(l.opts.caption=e.opts.caption.apply(a,[e,l])),l.opts.caption instanceof n||(l.opts.caption=l.opts.caption===o?"":l.opts.caption+""),"ajax"===s&&(c=r.split(/\s+/,2),c.length>1&&(l.src=c.shift(),l.opts.filter=c.shift())),"auto"==l.opts.smallBtn&&(n.inArray(s,["html","inline","ajax"])>-1?(l.opts.toolbar=!1,l.opts.smallBtn=!0):l.opts.smallBtn=!1),"pdf"===s&&(l.type="iframe",l.opts.iframe.preload=!1),l.opts.modal&&(l.opts=n.extend(!0,l.opts,{infobar:0,toolbar:0,smallBtn:0,keyboard:0,slideShow:0,fullScreen:0,thumbs:0,touch:0,clickContent:!1,clickSlide:!1,clickOutside:!1,dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1})),e.group.push(l)})},addEvents:function(){var o=this;o.removeEvents(),o.$refs.container.on("click.fb-close","[data-fancybox-close]",function(t){t.stopPropagation(),t.preventDefault(),o.close(t)}).on("click.fb-prev touchend.fb-prev","[data-fancybox-prev]",function(t){t.stopPropagation(),t.preventDefault(),o.previous()}).on("click.fb-next touchend.fb-next","[data-fancybox-next]",function(t){t.stopPropagation(),t.preventDefault(),o.next()}).on("click.fb","[data-fancybox-zoom]",function(t){o[o.isScaledDown()?"scaleToActual":"scaleToFit"]()}),s.on("orientationchange.fb resize.fb",function(t){t&&t.originalEvent&&"resize"===t.originalEvent.type?u(function(){o.update()}):(o.$refs.stage.hide(),setTimeout(function(){o.$refs.stage.show(),o.update()},600))}),r.on("focusin.fb",function(t){var a=n.fancybox?n.fancybox.getInstance():null;a.isClosing||!a.current||!a.current.opts.trapFocus||n(t.target).hasClass("fancybox-container")||n(t.target).is(e)||a&&"fixed"!==n(t.target).css("position")&&!a.$refs.container.has(t.target).length&&(t.stopPropagation(),a.focus(),s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft))}),r.on("keydown.fb",function(t){var e=o.current,a=t.keyCode||t.which;if(e&&e.opts.keyboard&&!n(t.target).is("input")&&!n(t.target).is("textarea"))return 8===a||27===a?(t.preventDefault(),void o.close(t)):37===a||38===a?(t.preventDefault(),void o.previous()):39===a||40===a?(t.preventDefault(),void o.next()):void o.trigger("afterKeydown",t,a)}),o.group[o.currIndex].opts.idleTime&&(o.idleSecondsCounter=0,r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",function(t){o.idleSecondsCounter=0,o.isIdle&&o.showControls(),o.isIdle=!1}),o.idleInterval=t.setInterval(function(){o.idleSecondsCounter++,o.idleSecondsCounter>=o.group[o.currIndex].opts.idleTime&&(o.isIdle=!0,o.idleSecondsCounter=0,o.hideControls())},1e3))},removeEvents:function(){var e=this;s.off("orientationchange.fb resize.fb"),r.off("focusin.fb keydown.fb .fb-idle"),this.$refs.container.off(".fb-close .fb-prev .fb-next"),e.idleInterval&&(t.clearInterval(e.idleInterval),e.idleInterval=null)},previous:function(t){return this.jumpTo(this.currPos-1,t)},next:function(t){return this.jumpTo(this.currPos+1,t)},jumpTo:function(t,e,a){var i,s,r,c,l,u,d,p=this,h=p.group.length;if(!(p.isSliding||p.isClosing||p.isAnimating&&p.firstRun)){if(t=parseInt(t,10),s=p.current?p.current.opts.loop:p.opts.loop,!s&&(t<0||t>=h))return!1;if(i=p.firstRun=null===p.firstRun,!(h<2&&!i&&p.isSliding)){if(c=p.current,p.prevIndex=p.currIndex,p.prevPos=p.currPos,r=p.createSlide(t),h>1&&((s||r.index>0)&&p.createSlide(t-1),(s||r.index<h-1)&&p.createSlide(t+1)),p.current=r,p.currIndex=r.index,p.currPos=r.pos,p.trigger("beforeShow",i),p.updateControls(),u=n.fancybox.getTranslate(r.$slide),r.isMoved=(0!==u.left||0!==u.top)&&!r.$slide.hasClass("fancybox-animated"),r.forcedDuration=o,n.isNumeric(e)?r.forcedDuration=e:e=r.opts[i?"animationDuration":"transitionDuration"],e=parseInt(e,10),i)return r.opts.animationEffect&&e&&p.$refs.container.css("transition-duration",e+"ms"),p.$refs.container.removeClass("fancybox-is-hidden"),f(p.$refs.container),p.$refs.container.addClass("fancybox-is-open"),r.$slide.addClass("fancybox-slide--current"),p.loadSlide(r),void p.preload();n.each(p.slides,function(t,e){n.fancybox.stop(e.$slide)}),r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"),r.isMoved?(l=Math.round(r.$slide.width()),n.each(p.slides,function(t,o){var a=o.pos-r.pos;n.fancybox.animate(o.$slide,{top:0,left:a*l+a*o.opts.gutter},e,function(){o.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"),o.pos===p.currPos&&(r.isMoved=!1,p.complete())})})):p.$refs.stage.children().removeAttr("style"),r.isLoaded?p.revealContent(r):p.loadSlide(r),p.preload(),c.pos!==r.pos&&(d="fancybox-slide--"+(c.pos>r.pos?"next":"previous"),c.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"),c.isComplete=!1,e&&(r.isMoved||r.opts.transitionEffect)&&(r.isMoved?c.$slide.addClass(d):(d="fancybox-animated "+d+" fancybox-fx-"+r.opts.transitionEffect,n.fancybox.animate(c.$slide,d,e,function(){c.$slide.removeClass(d).removeAttr("style")}))))}}},createSlide:function(t){var e,o,a=this;return o=t%a.group.length,o=o<0?a.group.length+o:o,!a.slides[t]&&a.group[o]&&(e=n('<div class="fancybox-slide"></div>').appendTo(a.$refs.stage),a.slides[t]=n.extend(!0,{},a.group[o],{pos:t,$slide:e,isLoaded:!1}),a.updateSlide(a.slides[t])),a.slides[t]},scaleToActual:function(t,e,a){var i,s,r,c,l,u=this,d=u.current,f=d.$content,p=parseInt(d.$slide.width(),10),h=parseInt(d.$slide.height(),10),g=d.width,b=d.height;"image"!=d.type||d.hasError||!f||u.isAnimating||(n.fancybox.stop(f),u.isAnimating=!0,t=t===o?.5*p:t,e=e===o?.5*h:e,i=n.fancybox.getTranslate(f),c=g/i.width,l=b/i.height,s=.5*p-.5*g,r=.5*h-.5*b,g>p&&(s=i.left*c-(t*c-t),s>0&&(s=0),s<p-g&&(s=p-g)),b>h&&(r=i.top*l-(e*l-e),r>0&&(r=0),r<h-b&&(r=h-b)),u.updateCursor(g,b),n.fancybox.animate(f,{top:r,left:s,scaleX:c,scaleY:l},a||330,function(){u.isAnimating=!1}),u.SlideShow&&u.SlideShow.isActive&&u.SlideShow.stop())},scaleToFit:function(t){var e,o=this,a=o.current,i=a.$content;"image"!=a.type||a.hasError||!i||o.isAnimating||(n.fancybox.stop(i),o.isAnimating=!0,e=o.getFitPos(a),o.updateCursor(e.width,e.height),n.fancybox.animate(i,{top:e.top,left:e.left,scaleX:e.width/i.width(),scaleY:e.height/i.height()},t||330,function(){o.isAnimating=!1}))},getFitPos:function(t){var e,o,a,i,s,r=this,c=t.$content,l=t.width,u=t.height,d=t.opts.margin;return!(!c||!c.length||!l&&!u)&&("number"===n.type(d)&&(d=[d,d]),2==d.length&&(d=[d[0],d[1],d[0],d[1]]),e=parseInt(r.$refs.stage.width(),10)-(d[1]+d[3]),o=parseInt(r.$refs.stage.height(),10)-(d[0]+d[2]),a=Math.min(1,e/l,o/u),i=Math.floor(a*l),s=Math.floor(a*u),{top:Math.floor(.5*(o-s))+d[0],left:Math.floor(.5*(e-i))+d[3],width:i,height:s})},update:function(){var t=this;n.each(t.slides,function(e,n){t.updateSlide(n)})},updateSlide:function(t){var e=this,o=t.$content;o&&(t.width||t.height)&&(e.isAnimating=!1,n.fancybox.stop(o),n.fancybox.setTranslate(o,e.getFitPos(t)),t.pos===e.currPos&&e.updateCursor()),t.$slide.trigger("refresh"),e.trigger("onUpdate",t)},updateCursor:function(t,e){var n,a=this,i=a.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");a.current&&!a.isClosing&&(a.isZoomable()?(i.addClass("fancybox-is-zoomable"),n=t!==o&&e!==o?t<a.current.width&&e<a.current.height:a.isScaledDown(),n?i.addClass("fancybox-can-zoomIn"):a.current.opts.touch?i.addClass("fancybox-can-drag"):i.addClass("fancybox-can-zoomOut")):a.current.opts.touch&&i.addClass("fancybox-can-drag"))},isZoomable:function(){var t,e=this,o=e.current;if(o&&!e.isClosing)return!!("image"===o.type&&o.isLoaded&&!o.hasError&&("zoom"===o.opts.clickContent||n.isFunction(o.opts.clickContent)&&"zoom"===o.opts.clickContent(o))&&(t=e.getFitPos(o),o.width>t.width||o.height>t.height))},isScaledDown:function(){var t=this,e=t.current,o=e.$content,a=!1;return o&&(a=n.fancybox.getTranslate(o),a=a.width<e.width||a.height<e.height),a},canPan:function(){var t=this,e=t.current,n=e.$content,o=!1;return n&&(o=t.getFitPos(e),o=Math.abs(n.width()-o.width)>1||Math.abs(n.height()-o.height)>1),o},loadSlide:function(t){var e,o,a,i=this;if(!t.isLoading&&!t.isLoaded){switch(t.isLoading=!0,i.trigger("beforeLoad",t),e=t.type,o=t.$slide,o.off("refresh").trigger("onReset").addClass("fancybox-slide--"+(e||"unknown")).addClass(t.opts.slideClass),e){case"image":i.setImage(t);break;case"iframe":i.setIframe(t);break;case"html":i.setContent(t,t.src||t.content);break;case"inline":n(t.src).length?i.setContent(t,n(t.src)):i.setError(t);break;case"ajax":i.showLoading(t),a=n.ajax(n.extend({},t.opts.ajax.settings,{url:t.src,success:function(e,n){"success"===n&&i.setContent(t,e)},error:function(e,n){e&&"abort"!==n&&i.setError(t)}})),o.one("onReset",function(){a.abort()});break;default:i.setError(t)}return!0}},setImage:function(e){var o,a,i,s,r=this,c=e.opts.srcset||e.opts.image.srcset;if(c){i=t.devicePixelRatio||1,s=t.innerWidth*i,a=c.split(",").map(function(t){var e={};return t.trim().split(/\s+/).forEach(function(t,n){var o=parseInt(t.substring(0,t.length-1),10);return 0===n?e.url=t:void(o&&(e.value=o,e.postfix=t[t.length-1]))}),e}),a.sort(function(t,e){return t.value-e.value});for(var l=0;l<a.length;l++){var u=a[l];if("w"===u.postfix&&u.value>=s||"x"===u.postfix&&u.value>=i){o=u;break}}!o&&a.length&&(o=a[a.length-1]),o&&(e.src=o.url,e.width&&e.height&&"w"==o.postfix&&(e.height=e.width/e.height*o.value,e.width=o.value))}e.$content=n('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide),e.opts.preload!==!1&&e.opts.width&&e.opts.height&&(e.opts.thumb||e.opts.$thumb)?(e.width=e.opts.width,e.height=e.opts.height,e.$ghost=n("<img />").one("error",function(){n(this).remove(),e.$ghost=null,r.setBigImage(e)}).one("load",function(){r.afterLoad(e),r.setBigImage(e)}).addClass("fancybox-image").appendTo(e.$content).attr("src",e.opts.thumb||e.opts.$thumb.attr("src"))):r.setBigImage(e)},setBigImage:function(t){var e=this,o=n("<img />");t.$image=o.one("error",function(){e.setError(t)}).one("load",function(){clearTimeout(t.timouts),t.timouts=null,e.isClosing||(t.width=this.naturalWidth,t.height=this.naturalHeight,t.opts.image.srcset&&o.attr("sizes","100vw").attr("srcset",t.opts.image.srcset),e.hideLoading(t),t.$ghost?t.timouts=setTimeout(function(){t.timouts=null,t.$ghost.hide()},Math.min(300,Math.max(1e3,t.height/1600))):e.afterLoad(t))}).addClass("fancybox-image").attr("src",t.src).appendTo(t.$content),(o[0].complete||"complete"==o[0].readyState)&&o[0].naturalWidth&&o[0].naturalHeight?o.trigger("load"):o[0].error?o.trigger("error"):t.timouts=setTimeout(function(){o[0].complete||t.hasError||e.showLoading(t)},100)},setIframe:function(t){var e,a=this,i=t.opts.iframe,s=t.$slide;t.$content=n('<div class="fancybox-content'+(i.preload?" fancybox-is-hidden":"")+'"></div>').css(i.css).appendTo(s),e=n(i.tpl.replace(/\{rnd\}/g,(new Date).getTime())).attr(i.attr).appendTo(t.$content),i.preload?(a.showLoading(t),e.on("load.fb error.fb",function(e){this.isReady=1,t.$slide.trigger("refresh"),a.afterLoad(t)}),s.on("refresh.fb",function(){var n,a,s,r=t.$content,c=i.css.width,l=i.css.height;if(1===e[0].isReady){try{a=e.contents(),s=a.find("body")}catch(t){}s&&s.length&&(c===o&&(n=e[0].contentWindow.document.documentElement.scrollWidth,c=Math.ceil(s.outerWidth(!0)+(r.width()-n)),c+=r.outerWidth()-r.innerWidth()),l===o&&(l=Math.ceil(s.outerHeight(!0)),l+=r.outerHeight()-r.innerHeight()),c&&r.width(c),l&&r.height(l)),r.removeClass("fancybox-is-hidden")}})):this.afterLoad(t),e.attr("src",t.src),t.opts.smallBtn===!0&&t.$content.prepend(a.translate(t,t.opts.btnTpl.smallBtn)),s.one("onReset",function(){try{n(this).find("iframe").hide().attr("src","//about:blank")}catch(t){}n(this).empty(),t.isLoaded=!1})},setContent:function(t,e){var o=this;o.isClosing||(o.hideLoading(t),t.$slide.empty(),l(e)&&e.parent().length?(e.parent(".fancybox-slide--inline").trigger("onReset"),t.$placeholder=n("<div></div>").hide().insertAfter(e),e.css("display","inline-block")):t.hasError||("string"===n.type(e)&&(e=n("<div>").append(n.trim(e)).contents(),3===e[0].nodeType&&(e=n("<div>").html(e))),t.opts.filter&&(e=n("<div>").html(e).find(t.opts.filter))),t.$slide.one("onReset",function(){t.$placeholder&&(t.$placeholder.after(e.hide()).remove(),t.$placeholder=null),t.$smallBtn&&(t.$smallBtn.remove(),t.$smallBtn=null),t.hasError||(n(this).empty(),t.isLoaded=!1)}),t.$content=n(e).appendTo(t.$slide),this.afterLoad(t))},setError:function(t){t.hasError=!0,t.$slide.removeClass("fancybox-slide--"+t.type),this.setContent(t,this.translate(t,t.opts.errorTpl))},showLoading:function(t){var e=this;t=t||e.current,t&&!t.$spinner&&(t.$spinner=n(e.opts.spinnerTpl).appendTo(t.$slide))},hideLoading:function(t){var e=this;t=t||e.current,t&&t.$spinner&&(t.$spinner.remove(),delete t.$spinner)},afterLoad:function(t){var e=this;e.isClosing||(t.isLoading=!1,t.isLoaded=!0,e.trigger("afterLoad",t),e.hideLoading(t),t.opts.smallBtn&&!t.$smallBtn&&(t.$smallBtn=n(e.translate(t,t.opts.btnTpl.smallBtn)).appendTo(t.$content.filter("div,form").first())),t.opts.protect&&t.$content&&!t.hasError&&(t.$content.on("contextmenu.fb",function(t){return 2==t.button&&t.preventDefault(),!0}),"image"===t.type&&n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),e.revealContent(t))},revealContent:function(t){var e,a,i,s,r,c=this,l=t.$slide,u=!1;return e=t.opts[c.firstRun?"animationEffect":"transitionEffect"],i=t.opts[c.firstRun?"animationDuration":"transitionDuration"],i=parseInt(t.forcedDuration===o?i:t.forcedDuration,10),!t.isMoved&&t.pos===c.currPos&&i||(e=!1),"zoom"!==e||t.pos===c.currPos&&i&&"image"===t.type&&!t.hasError&&(u=c.getThumbPos(t))||(e="fade"),"zoom"===e?(r=c.getFitPos(t),r.scaleX=r.width/u.width,r.scaleY=r.height/u.height,delete r.width,delete r.height,s=t.opts.zoomOpacity,"auto"==s&&(s=Math.abs(t.width/t.height-u.width/u.height)>.1),s&&(u.opacity=.1,r.opacity=1),n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"),u),f(t.$content),void n.fancybox.animate(t.$content,r,i,function(){c.complete()})):(c.updateSlide(t),e?(n.fancybox.stop(l),a="fancybox-animated fancybox-slide--"+(t.pos>=c.prevPos?"next":"previous")+" fancybox-fx-"+e,l.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(a),t.$content.removeClass("fancybox-is-hidden"),f(l),void n.fancybox.animate(l,"fancybox-slide--current",i,function(e){l.removeClass(a).removeAttr("style"),t.pos===c.currPos&&c.complete()},!0)):(f(l),t.$content.removeClass("fancybox-is-hidden"),void(t.pos===c.currPos&&c.complete())))},getThumbPos:function(o){var a,i=this,s=!1,r=function(e){for(var o,a=e[0],i=a.getBoundingClientRect(),s=[];null!==a.parentElement;)"hidden"!==n(a.parentElement).css("overflow")&&"auto"!==n(a.parentElement).css("overflow")||s.push(a.parentElement.getBoundingClientRect()),a=a.parentElement;return o=s.every(function(t){var e=Math.min(i.right,t.right)-Math.max(i.left,t.left),n=Math.min(i.bottom,t.bottom)-Math.max(i.top,t.top);return e>0&&n>0}),o&&i.bottom>0&&i.right>0&&i.left<n(t).width()&&i.top<n(t).height()},c=o.opts.$thumb,l=c?c.offset():0;return l&&c[0].ownerDocument===e&&r(c)&&(a=i.$refs.stage.offset(),s={top:l.top-a.top+parseFloat(c.css("border-top-width")||0),left:l.left-a.left+parseFloat(c.css("border-left-width")||0),width:c.width(),height:c.height(),scaleX:1,scaleY:1}),s},complete:function(){var t=this,o=t.current,a={};o.isMoved||!o.isLoaded||o.isComplete||(o.isComplete=!0,o.$slide.siblings().trigger("onReset"),f(o.$slide),o.$slide.addClass("fancybox-slide--complete"),n.each(t.slides,function(e,o){o.pos>=t.currPos-1&&o.pos<=t.currPos+1?a[o.pos]=o:o&&(n.fancybox.stop(o.$slide),o.$slide.off().remove())}),t.slides=a,t.updateCursor(),t.trigger("afterShow"),(n(e.activeElement).is("[disabled]")||o.opts.autoFocus&&"image"!=o.type&&"iframe"!==o.type)&&t.focus())},preload:function(){var t,e,n=this;n.group.length<2||(t=n.slides[n.currPos+1],e=n.slides[n.currPos-1],t&&"image"===t.type&&n.loadSlide(t),e&&"image"===e.type&&n.loadSlide(e))},focus:function(){var t,e=this.current;this.isClosing||(e&&e.isComplete&&(t=e.$slide.find("input[autofocus]:enabled:visible:first"),t.length||(t=e.$slide.find("button,:input,[tabindex],a").filter(":enabled:visible:first"))),t=t&&t.length?t:this.$refs.container,t.focus())},activate:function(){var t=this;n(".fancybox-container").each(function(){var e=n(this).data("FancyBox");e&&e.id!==t.id&&!e.isClosing&&(e.trigger("onDeactivate"),e.removeEvents(),e.isVisible=!1)}),t.isVisible=!0,(t.current||t.isIdle)&&(t.update(),t.updateControls()),t.trigger("onActivate"),t.addEvents()},close:function(t,e){var o,a,i,s,r,c,l=this,p=l.current,h=function(){l.cleanUp(t)};return!l.isClosing&&(l.isClosing=!0,l.trigger("beforeClose",t)===!1?(l.isClosing=!1,u(function(){l.update()}),!1):(l.removeEvents(),p.timouts&&clearTimeout(p.timouts),i=p.$content,o=p.opts.animationEffect,a=n.isNumeric(e)?e:o?p.opts.animationDuration:0,p.$slide.off(d).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"),p.$slide.siblings().trigger("onReset").remove(),a&&l.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"),l.hideLoading(p),l.hideControls(),l.updateCursor(),"zoom"!==o||t!==!0&&i&&a&&"image"===p.type&&!p.hasError&&(c=l.getThumbPos(p))||(o="fade"),"zoom"===o?(n.fancybox.stop(i),r=n.fancybox.getTranslate(i),r.width=r.width*r.scaleX,r.height=r.height*r.scaleY,s=p.opts.zoomOpacity,"auto"==s&&(s=Math.abs(p.width/p.height-c.width/c.height)>.1),s&&(c.opacity=0),r.scaleX=r.width/c.width,r.scaleY=r.height/c.height,r.width=c.width,r.height=c.height,n.fancybox.setTranslate(p.$content,r),f(p.$content),n.fancybox.animate(p.$content,c,a,h),!0):(o&&a?t===!0?setTimeout(h,a):n.fancybox.animate(p.$slide.removeClass("fancybox-slide--current"),"fancybox-animated fancybox-slide--previous fancybox-fx-"+o,a,h):h(),!0)))},cleanUp:function(t){var o,a,i=this,r=n("body");i.current.$slide.trigger("onReset"),i.$refs.container.empty().remove(),i.trigger("afterClose",t),i.$lastFocus&&i.current.opts.backFocus&&i.$lastFocus.focus(),i.current=null,o=n.fancybox.getInstance(),o?o.activate():(s.scrollTop(i.scrollTop).scrollLeft(i.scrollLeft),r.removeClass("fancybox-active compensate-for-scrollbar"),r.hasClass("fancybox-iosfix")&&(a=parseInt(e.body.style.top,10),r.removeClass("fancybox-iosfix").css("top","").scrollTop(a*-1)),n("#fancybox-style-noscroll").remove())},trigger:function(t,e){var o,a=Array.prototype.slice.call(arguments,1),i=this,s=e&&e.opts?e:i.current;return s?a.unshift(s):s=i,a.unshift(i),n.isFunction(s.opts[t])&&(o=s.opts[t].apply(s,a)),o===!1?o:void("afterClose"!==t&&i.$refs?i.$refs.container.trigger(t+".fb",a):r.trigger(t+".fb",a))},updateControls:function(t){var e=this,n=e.current,o=n.index,a=n.opts.caption,i=e.$refs.container,s=e.$refs.caption;n.$slide.trigger("refresh"),e.$caption=a&&a.length?s.html(a):null,e.isHiddenControls||e.isIdle||e.showControls(),i.find("[data-fancybox-count]").html(e.group.length),i.find("[data-fancybox-index]").html(o+1),i.find("[data-fancybox-prev]").prop("disabled",!n.opts.loop&&o<=0),i.find("[data-fancybox-next]").prop("disabled",!n.opts.loop&&o>=e.group.length-1),"image"===n.type?i.find("[data-fancybox-download]").attr("href",n.opts.image.src||n.src).show():i.find("[data-fancybox-download],[data-fancybox-zoom]").hide()},hideControls:function(){this.isHiddenControls=!0,this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")},showControls:function(){var t=this,e=t.current?t.current.opts:t.opts,n=t.$refs.container;t.isHiddenControls=!1,t.idleSecondsCounter=0,n.toggleClass("fancybox-show-toolbar",!(!e.toolbar||!e.buttons)).toggleClass("fancybox-show-infobar",!!(e.infobar&&t.group.length>1)).toggleClass("fancybox-show-nav",!!(e.arrows&&t.group.length>1)).toggleClass("fancybox-is-modal",!!e.modal),t.$caption?n.addClass("fancybox-show-caption "):n.removeClass("fancybox-show-caption")},toggleControls:function(){this.isHiddenControls?this.showControls():this.hideControls()}}),n.fancybox={version:"3.2.5",defaults:i,getInstance:function(t){var e=n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),o=Array.prototype.slice.call(arguments,1);return e instanceof p&&("string"===n.type(t)?e[t].apply(e,o):"function"===n.type(t)&&t.apply(e,o),e)},open:function(t,e,n){return new p(t,e,n)},close:function(t){var e=this.getInstance();e&&(e.close(),t===!0&&this.close())},destroy:function(){this.close(!0),r.off("click.fb-start")},isMobile:e.createTouch!==o&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),use3d:function(){var n=e.createElement("div");return t.getComputedStyle&&t.getComputedStyle(n).getPropertyValue("transform")&&!(e.documentMode&&e.documentMode<11)}(),getTranslate:function(t){var e;if(!t||!t.length)return!1;if(e=t.eq(0).css("transform"),e&&e.indexOf("matrix")!==-1?(e=e.split("(")[1],e=e.split(")")[0],e=e.split(",")):e=[],e.length)e=e.length>10?[e[13],e[12],e[0],e[5]]:[e[5],e[4],e[0],e[3]],e=e.map(parseFloat);else{e=[0,0,1,1];var n=/\.*translate\((.*)px,(.*)px\)/i,o=n.exec(t.eq(0).attr("style"));o&&(e[0]=parseFloat(o[2]),e[1]=parseFloat(o[1]))}return{top:e[0],left:e[1],scaleX:e[2],scaleY:e[3],opacity:parseFloat(t.css("opacity")),width:t.width(),height:t.height()}},setTranslate:function(t,e){var n="",a={};if(t&&e)return e.left===o&&e.top===o||(n=(e.left===o?t.position().left:e.left)+"px, "+(e.top===o?t.position().top:e.top)+"px",n=this.use3d?"translate3d("+n+", 0px)":"translate("+n+")"),e.scaleX!==o&&e.scaleY!==o&&(n=(n.length?n+" ":"")+"scale("+e.scaleX+", "+e.scaleY+")"),n.length&&(a.transform=n),e.opacity!==o&&(a.opacity=e.opacity),e.width!==o&&(a.width=e.width),e.height!==o&&(a.height=e.height),t.css(a)},animate:function(t,e,a,i,s){n.isFunction(a)&&(i=a,a=null),n.isPlainObject(e)||t.removeAttr("style"),t.on(d,function(a){(!a||!a.originalEvent||t.is(a.originalEvent.target)&&"z-index"!=a.originalEvent.propertyName)&&(n.fancybox.stop(t),n.isPlainObject(e)?e.scaleX!==o&&e.scaleY!==o&&(t.css("transition-duration",""),e.width=Math.round(t.width()*e.scaleX),e.height=Math.round(t.height()*e.scaleY),e.scaleX=1,e.scaleY=1,n.fancybox.setTranslate(t,e)):s!==!0&&t.removeClass(e),n.isFunction(i)&&i(a))}),n.isNumeric(a)&&t.css("transition-duration",a+"ms"),n.isPlainObject(e)?n.fancybox.setTranslate(t,e):t.addClass(e),e.scaleX&&t.hasClass("fancybox-image-wrap")&&t.parent().addClass("fancybox-is-scaling"),t.data("timer",setTimeout(function(){t.trigger("transitionend")},a+16))},stop:function(t){clearTimeout(t.data("timer")),t.off("transitionend").css("transition-duration",""),t.hasClass("fancybox-image-wrap")&&t.parent().removeClass("fancybox-is-scaling")}},n.fn.fancybox=function(t){var e;return t=t||{},e=t.selector||!1,e?n("body").off("click.fb-start",e).on("click.fb-start",e,{options:t},a):this.off("click.fb-start").on("click.fb-start",{items:this,options:t},a),this},r.on("click.fb-start","[data-fancybox]",a)}}(window,document,window.jQuery||jQuery),function(t){"use strict";var e=function(e,n,o){if(e)return o=o||"","object"===t.type(o)&&(o=t.param(o,!0)),t.each(n,function(t,n){e=e.replace("$"+t,n||"")}),o.length&&(e+=(e.indexOf("?")>0?"&":"?")+o),e},n={youtube:{matcher:/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,params:{autoplay:1,autohide:1,fs:1,rel:0,hd:1,wmode:"transparent",enablejsapi:1,html5:1},paramPlace:8,type:"iframe",url:"//www.youtube.com/embed/$4",thumb:"//img.youtube.com/vi/$4/hqdefault.jpg"},vimeo:{matcher:/^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,params:{autoplay:1,hd:1,show_title:1,show_byline:1,show_portrait:0,fullscreen:1,api:1},paramPlace:3,type:"iframe",url:"//player.vimeo.com/video/$2"},metacafe:{matcher:/metacafe.com\/watch\/(\d+)\/(.*)?/,type:"iframe",url:"//www.metacafe.com/embed/$1/?ap=1"},dailymotion:{matcher:/dailymotion.com\/video\/(.*)\/?(.*)/,params:{additionalInfos:0,autoStart:1},type:"iframe",url:"//www.dailymotion.com/embed/video/$1"},vine:{matcher:/vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,type:"iframe",url:"//vine.co/v/$1/embed/simple"},instagram:{matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,type:"image",url:"//$1/p/$2/media/?size=l"
},gmap_place:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/?ll="+(t[9]?t[9]+"&z="+Math.floor(t[10])+(t[12]?t[12].replace(/^\//,"&"):""):t[12])+"&output="+(t[12]&&t[12].indexOf("layer=c")>0?"svembed":"embed")}},gmap_search:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/maps?q="+t[5].replace("query=","q=").replace("api=1","")+"&output=embed"}}};t(document).on("objectNeedsType.fb",function(o,a,i){var s,r,c,l,u,d,f,p=i.src||"",h=!1;s=t.extend(!0,{},n,i.opts.media),t.each(s,function(n,o){if(c=p.match(o.matcher)){if(h=o.type,d={},o.paramPlace&&c[o.paramPlace]){u=c[o.paramPlace],"?"==u[0]&&(u=u.substring(1)),u=u.split("&");for(var a=0;a<u.length;++a){var s=u[a].split("=",2);2==s.length&&(d[s[0]]=decodeURIComponent(s[1].replace(/\+/g," ")))}}return l=t.extend(!0,{},o.params,i.opts[n],d),p="function"===t.type(o.url)?o.url.call(this,c,l,i):e(o.url,c,l),r="function"===t.type(o.thumb)?o.thumb.call(this,c,l,i):e(o.thumb,c),"vimeo"===n&&(p=p.replace("&%23","#")),!1}}),h?(i.src=p,i.type=h,i.opts.thumb||i.opts.$thumb&&i.opts.$thumb.length||(i.opts.thumb=r),"iframe"===h&&(t.extend(!0,i.opts,{iframe:{preload:!1,attr:{scrolling:"no"}}}),i.contentProvider=f,i.opts.slideClass+=" fancybox-slide--"+("gmap_place"==f||"gmap_search"==f?"map":"video"))):p&&(i.type=i.opts.defaultType)})}(window.jQuery||jQuery),function(t,e,n){"use strict";var o=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}}(),a=function(){return t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||function(e){t.clearTimeout(e)}}(),i=function(e){var n=[];e=e.originalEvent||e||t.e,e=e.touches&&e.touches.length?e.touches:e.changedTouches&&e.changedTouches.length?e.changedTouches:[e];for(var o in e)e[o].pageX?n.push({x:e[o].pageX,y:e[o].pageY}):e[o].clientX&&n.push({x:e[o].clientX,y:e[o].clientY});return n},s=function(t,e,n){return e&&t?"x"===n?t.x-e.x:"y"===n?t.y-e.y:Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)):0},r=function(t){if(t.is('a,area,button,[role="button"],input,label,select,summary,textarea')||n.isFunction(t.get(0).onclick)||t.data("selectable"))return!0;for(var e=0,o=t[0].attributes,a=o.length;e<a;e++)if("data-fancybox-"===o[e].nodeName.substr(0,14))return!0;return!1},c=function(e){var n=t.getComputedStyle(e)["overflow-y"],o=t.getComputedStyle(e)["overflow-x"],a=("scroll"===n||"auto"===n)&&e.scrollHeight>e.clientHeight,i=("scroll"===o||"auto"===o)&&e.scrollWidth>e.clientWidth;return a||i},l=function(t){for(var e=!1;;){if(e=c(t.get(0)))break;if(t=t.parent(),!t.length||t.hasClass("fancybox-stage")||t.is("body"))break}return e},u=function(t){var e=this;e.instance=t,e.$bg=t.$refs.bg,e.$stage=t.$refs.stage,e.$container=t.$refs.container,e.destroy(),e.$container.on("touchstart.fb.touch mousedown.fb.touch",n.proxy(e,"ontouchstart"))};u.prototype.destroy=function(){this.$container.off(".fb.touch")},u.prototype.ontouchstart=function(o){var a=this,c=n(o.target),u=a.instance,d=u.current,f=d.$content,p="touchstart"==o.type;if(p&&a.$container.off("mousedown.fb.touch"),!d||a.instance.isAnimating||a.instance.isClosing)return o.stopPropagation(),void o.preventDefault();if((!o.originalEvent||2!=o.originalEvent.button)&&c.length&&!r(c)&&!r(c.parent())&&!(o.originalEvent.clientX>c[0].clientWidth+c.offset().left)&&(a.startPoints=i(o),a.startPoints&&!(a.startPoints.length>1&&u.isSliding))){if(a.$target=c,a.$content=f,a.canTap=!0,a.opts=d.opts.touch,n(e).off(".fb.touch"),n(e).on(p?"touchend.fb.touch touchcancel.fb.touch":"mouseup.fb.touch mouseleave.fb.touch",n.proxy(a,"ontouchend")),n(e).on(p?"touchmove.fb.touch":"mousemove.fb.touch",n.proxy(a,"ontouchmove")),!a.opts&&!u.canPan()||!c.is(a.$stage)&&!a.$stage.find(c).length)return void(c.is("img")&&o.preventDefault());o.stopPropagation(),n.fancybox.isMobile&&(l(a.$target)||l(a.$target.parent()))||o.preventDefault(),a.canvasWidth=Math.round(d.$slide[0].clientWidth),a.canvasHeight=Math.round(d.$slide[0].clientHeight),a.startTime=(new Date).getTime(),a.distanceX=a.distanceY=a.distance=0,a.isPanning=!1,a.isSwiping=!1,a.isZooming=!1,a.sliderStartPos=a.sliderLastPos||{top:0,left:0},a.contentStartPos=n.fancybox.getTranslate(a.$content),a.contentLastPos=null,1!==a.startPoints.length||a.isZooming||(a.canTap=!u.isSliding,"image"===d.type&&(a.contentStartPos.width>a.canvasWidth+1||a.contentStartPos.height>a.canvasHeight+1)?(n.fancybox.stop(a.$content),a.$content.css("transition-duration","0ms"),a.isPanning=!0):a.isSwiping=!0,a.$container.addClass("fancybox-controls--isGrabbing")),2!==a.startPoints.length||u.isAnimating||d.hasError||"image"!==d.type||!d.isLoaded&&!d.$ghost||(a.isZooming=!0,a.isSwiping=!1,a.isPanning=!1,n.fancybox.stop(a.$content),a.$content.css("transition-duration","0ms"),a.centerPointStartX=.5*(a.startPoints[0].x+a.startPoints[1].x)-n(t).scrollLeft(),a.centerPointStartY=.5*(a.startPoints[0].y+a.startPoints[1].y)-n(t).scrollTop(),a.percentageOfImageAtPinchPointX=(a.centerPointStartX-a.contentStartPos.left)/a.contentStartPos.width,a.percentageOfImageAtPinchPointY=(a.centerPointStartY-a.contentStartPos.top)/a.contentStartPos.height,a.startDistanceBetweenFingers=s(a.startPoints[0],a.startPoints[1]))}},u.prototype.ontouchmove=function(t){var e=this;if(e.newPoints=i(t),n.fancybox.isMobile&&(l(e.$target)||l(e.$target.parent())))return t.stopPropagation(),void(e.canTap=!1);if((e.opts||e.instance.canPan())&&e.newPoints&&e.newPoints.length&&(e.distanceX=s(e.newPoints[0],e.startPoints[0],"x"),e.distanceY=s(e.newPoints[0],e.startPoints[0],"y"),e.distance=s(e.newPoints[0],e.startPoints[0]),e.distance>0)){if(!e.$target.is(e.$stage)&&!e.$stage.find(e.$target).length)return;t.stopPropagation(),t.preventDefault(),e.isSwiping?e.onSwipe():e.isPanning?e.onPan():e.isZooming&&e.onZoom()}},u.prototype.onSwipe=function(){var e,i=this,s=i.isSwiping,r=i.sliderStartPos.left||0;s===!0?Math.abs(i.distance)>10&&(i.canTap=!1,i.instance.group.length<2&&i.opts.vertical?i.isSwiping="y":i.instance.isSliding||i.opts.vertical===!1||"auto"===i.opts.vertical&&n(t).width()>800?i.isSwiping="x":(e=Math.abs(180*Math.atan2(i.distanceY,i.distanceX)/Math.PI),i.isSwiping=e>45&&e<135?"y":"x"),i.instance.isSliding=i.isSwiping,i.startPoints=i.newPoints,n.each(i.instance.slides,function(t,e){n.fancybox.stop(e.$slide),e.$slide.css("transition-duration","0ms"),e.inTransition=!1,e.pos===i.instance.current.pos&&(i.sliderStartPos.left=n.fancybox.getTranslate(e.$slide).left)}),i.instance.SlideShow&&i.instance.SlideShow.isActive&&i.instance.SlideShow.stop()):("x"==s&&(i.distanceX>0&&(i.instance.group.length<2||0===i.instance.current.index&&!i.instance.current.opts.loop)?r+=Math.pow(i.distanceX,.8):i.distanceX<0&&(i.instance.group.length<2||i.instance.current.index===i.instance.group.length-1&&!i.instance.current.opts.loop)?r-=Math.pow(-i.distanceX,.8):r+=i.distanceX),i.sliderLastPos={top:"x"==s?0:i.sliderStartPos.top+i.distanceY,left:r},i.requestId&&(a(i.requestId),i.requestId=null),i.requestId=o(function(){i.sliderLastPos&&(n.each(i.instance.slides,function(t,e){var o=e.pos-i.instance.currPos;n.fancybox.setTranslate(e.$slide,{top:i.sliderLastPos.top,left:i.sliderLastPos.left+o*i.canvasWidth+o*e.opts.gutter})}),i.$container.addClass("fancybox-is-sliding"))}))},u.prototype.onPan=function(){var t,e,i,s=this;s.canTap=!1,t=s.contentStartPos.width>s.canvasWidth?s.contentStartPos.left+s.distanceX:s.contentStartPos.left,e=s.contentStartPos.top+s.distanceY,i=s.limitMovement(t,e,s.contentStartPos.width,s.contentStartPos.height),i.scaleX=s.contentStartPos.scaleX,i.scaleY=s.contentStartPos.scaleY,s.contentLastPos=i,s.requestId&&(a(s.requestId),s.requestId=null),s.requestId=o(function(){n.fancybox.setTranslate(s.$content,s.contentLastPos)})},u.prototype.limitMovement=function(t,e,n,o){var a,i,s,r,c=this,l=c.canvasWidth,u=c.canvasHeight,d=c.contentStartPos.left,f=c.contentStartPos.top,p=c.distanceX,h=c.distanceY;return a=Math.max(0,.5*l-.5*n),i=Math.max(0,.5*u-.5*o),s=Math.min(l-n,.5*l-.5*n),r=Math.min(u-o,.5*u-.5*o),n>l&&(p>0&&t>a&&(t=a-1+Math.pow(-a+d+p,.8)||0),p<0&&t<s&&(t=s+1-Math.pow(s-d-p,.8)||0)),o>u&&(h>0&&e>i&&(e=i-1+Math.pow(-i+f+h,.8)||0),h<0&&e<r&&(e=r+1-Math.pow(r-f-h,.8)||0)),{top:e,left:t}},u.prototype.limitPosition=function(t,e,n,o){var a=this,i=a.canvasWidth,s=a.canvasHeight;return n>i?(t=t>0?0:t,t=t<i-n?i-n:t):t=Math.max(0,i/2-n/2),o>s?(e=e>0?0:e,e=e<s-o?s-o:e):e=Math.max(0,s/2-o/2),{top:e,left:t}},u.prototype.onZoom=function(){var e=this,i=e.contentStartPos.width,r=e.contentStartPos.height,c=e.contentStartPos.left,l=e.contentStartPos.top,u=s(e.newPoints[0],e.newPoints[1]),d=u/e.startDistanceBetweenFingers,f=Math.floor(i*d),p=Math.floor(r*d),h=(i-f)*e.percentageOfImageAtPinchPointX,g=(r-p)*e.percentageOfImageAtPinchPointY,b=(e.newPoints[0].x+e.newPoints[1].x)/2-n(t).scrollLeft(),m=(e.newPoints[0].y+e.newPoints[1].y)/2-n(t).scrollTop(),y=b-e.centerPointStartX,v=m-e.centerPointStartY,x=c+(h+y),w=l+(g+v),$={top:w,left:x,scaleX:e.contentStartPos.scaleX*d,scaleY:e.contentStartPos.scaleY*d};e.canTap=!1,e.newWidth=f,e.newHeight=p,e.contentLastPos=$,e.requestId&&(a(e.requestId),e.requestId=null),e.requestId=o(function(){n.fancybox.setTranslate(e.$content,e.contentLastPos)})},u.prototype.ontouchend=function(t){var o=this,s=Math.max((new Date).getTime()-o.startTime,1),r=o.isSwiping,c=o.isPanning,l=o.isZooming;return o.endPoints=i(t),o.$container.removeClass("fancybox-controls--isGrabbing"),n(e).off(".fb.touch"),o.requestId&&(a(o.requestId),o.requestId=null),o.isSwiping=!1,o.isPanning=!1,o.isZooming=!1,o.canTap?o.onTap(t):(o.speed=366,o.velocityX=o.distanceX/s*.5,o.velocityY=o.distanceY/s*.5,o.speedX=Math.max(.5*o.speed,Math.min(1.5*o.speed,1/Math.abs(o.velocityX)*o.speed)),void(c?o.endPanning():l?o.endZooming():o.endSwiping(r)))},u.prototype.endSwiping=function(t){var e=this,o=!1;e.instance.isSliding=!1,e.sliderLastPos=null,"y"==t&&Math.abs(e.distanceY)>50?(n.fancybox.animate(e.instance.current.$slide,{top:e.sliderStartPos.top+e.distanceY+150*e.velocityY,opacity:0},150),o=e.instance.close(!0,300)):"x"==t&&e.distanceX>50&&e.instance.group.length>1?o=e.instance.previous(e.speedX):"x"==t&&e.distanceX<-50&&e.instance.group.length>1&&(o=e.instance.next(e.speedX)),o!==!1||"x"!=t&&"y"!=t||e.instance.jumpTo(e.instance.current.index,150),e.$container.removeClass("fancybox-is-sliding")},u.prototype.endPanning=function(){var t,e,o,a=this;a.contentLastPos&&(a.opts.momentum===!1?(t=a.contentLastPos.left,e=a.contentLastPos.top):(t=a.contentLastPos.left+a.velocityX*a.speed,e=a.contentLastPos.top+a.velocityY*a.speed),o=a.limitPosition(t,e,a.contentStartPos.width,a.contentStartPos.height),o.width=a.contentStartPos.width,o.height=a.contentStartPos.height,n.fancybox.animate(a.$content,o,330))},u.prototype.endZooming=function(){var t,e,o,a,i=this,s=i.instance.current,r=i.newWidth,c=i.newHeight;i.contentLastPos&&(t=i.contentLastPos.left,e=i.contentLastPos.top,a={top:e,left:t,width:r,height:c,scaleX:1,scaleY:1},n.fancybox.setTranslate(i.$content,a),r<i.canvasWidth&&c<i.canvasHeight?i.instance.scaleToFit(150):r>s.width||c>s.height?i.instance.scaleToActual(i.centerPointStartX,i.centerPointStartY,150):(o=i.limitPosition(t,e,r,c),n.fancybox.setTranslate(i.content,n.fancybox.getTranslate(i.$content)),n.fancybox.animate(i.$content,o,150)))},u.prototype.onTap=function(t){var e,o=this,a=n(t.target),s=o.instance,r=s.current,c=t&&i(t)||o.startPoints,l=c[0]?c[0].x-o.$stage.offset().left:0,u=c[0]?c[0].y-o.$stage.offset().top:0,d=function(e){var a=r.opts[e];if(n.isFunction(a)&&(a=a.apply(s,[r,t])),a)switch(a){case"close":s.close(o.startEvent);break;case"toggleControls":s.toggleControls(!0);break;case"next":s.next();break;case"nextOrClose":s.group.length>1?s.next():s.close(o.startEvent);break;case"zoom":"image"==r.type&&(r.isLoaded||r.$ghost)&&(s.canPan()?s.scaleToFit():s.isScaledDown()?s.scaleToActual(l,u):s.group.length<2&&s.close(o.startEvent))}};if(!(t.originalEvent&&2==t.originalEvent.button||s.isSliding||l>a[0].clientWidth+a.offset().left)){if(a.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"))e="Outside";else if(a.is(".fancybox-slide"))e="Slide";else{if(!s.current.$content||!s.current.$content.has(t.target).length)return;e="Content"}if(o.tapped){if(clearTimeout(o.tapped),o.tapped=null,Math.abs(l-o.tapX)>50||Math.abs(u-o.tapY)>50||s.isSliding)return this;d("dblclick"+e)}else o.tapX=l,o.tapY=u,r.opts["dblclick"+e]&&r.opts["dblclick"+e]!==r.opts["click"+e]?o.tapped=setTimeout(function(){o.tapped=null,d("click"+e)},300):d("click"+e);return this}},n(e).on("onActivate.fb",function(t,e){e&&!e.Guestures&&(e.Guestures=new u(e))}),n(e).on("beforeClose.fb",function(t,e){e&&e.Guestures&&e.Guestures.destroy()})}(window,document,window.jQuery||jQuery),function(t,e){"use strict";e.extend(!0,e.fancybox.defaults,{btnTpl:{slideShow:'<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>'},slideShow:{autoStart:!1,speed:3e3}});var n=function(t){this.instance=t,this.init()};e.extend(n.prototype,{timer:null,isActive:!1,$button:null,init:function(){var t=this;t.$button=t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click",function(){t.toggle()}),(t.instance.group.length<2||!t.instance.group[t.instance.currIndex].opts.slideShow)&&t.$button.hide()},set:function(t){var e=this;e.instance&&e.instance.current&&(t===!0||e.instance.current.opts.loop||e.instance.currIndex<e.instance.group.length-1)?e.timer=setTimeout(function(){e.isActive&&e.instance.jumpTo((e.instance.currIndex+1)%e.instance.group.length)},e.instance.current.opts.slideShow.speed):(e.stop(),e.instance.idleSecondsCounter=0,e.instance.showControls())},clear:function(){var t=this;clearTimeout(t.timer),t.timer=null},start:function(){var t=this,e=t.instance.current;e&&(t.isActive=!0,t.$button.attr("title",e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"),t.set(!0))},stop:function(){var t=this,e=t.instance.current;t.clear(),t.$button.attr("title",e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"),t.isActive=!1},toggle:function(){var t=this;t.isActive?t.stop():t.start()}}),e(t).on({"onInit.fb":function(t,e){e&&!e.SlideShow&&(e.SlideShow=new n(e))},"beforeShow.fb":function(t,e,n,o){var a=e&&e.SlideShow;o?a&&n.opts.slideShow.autoStart&&a.start():a&&a.isActive&&a.clear()},"afterShow.fb":function(t,e,n){var o=e&&e.SlideShow;o&&o.isActive&&o.set()},"afterKeydown.fb":function(n,o,a,i,s){var r=o&&o.SlideShow;!r||!a.opts.slideShow||80!==s&&32!==s||e(t.activeElement).is("button,a,input")||(i.preventDefault(),r.toggle())},"beforeClose.fb onDeactivate.fb":function(t,e){var n=e&&e.SlideShow;n&&n.stop()}}),e(t).on("visibilitychange",function(){var n=e.fancybox.getInstance(),o=n&&n.SlideShow;o&&o.isActive&&(t.hidden?o.clear():o.set())})}(document,window.jQuery||jQuery),function(t,e){"use strict";var n=function(){var e,n,o,a=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],i={};for(n=0;n<a.length;n++)if(e=a[n],e&&e[1]in t){for(o=0;o<e.length;o++)i[a[0][o]]=e[o];return i}return!1}();if(!n)return void(e&&e.fancybox&&(e.fancybox.defaults.btnTpl.fullScreen=!1));var o={request:function(e){e=e||t.documentElement,e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)},exit:function(){t[n.exitFullscreen]()},toggle:function(e){e=e||t.documentElement,this.isFullscreen()?this.exit():this.request(e)},isFullscreen:function(){return Boolean(t[n.fullscreenElement])},enabled:function(){return Boolean(t[n.fullscreenEnabled])}};e.extend(!0,e.fancybox.defaults,{btnTpl:{fullScreen:'<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" /></svg></button>'},fullScreen:{autoStart:!1}}),e(t).on({"onInit.fb":function(t,e){var n;e&&e.group[e.currIndex].opts.fullScreen?(n=e.$refs.container,n.on("click.fb-fullscreen","[data-fancybox-fullscreen]",function(t){t.stopPropagation(),t.preventDefault(),o.toggle(n[0])}),e.opts.fullScreen&&e.opts.fullScreen.autoStart===!0&&o.request(n[0]),e.FullScreen=o):e&&e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()},"afterKeydown.fb":function(t,e,n,o,a){e&&e.FullScreen&&70===a&&(o.preventDefault(),e.FullScreen.toggle(e.$refs.container[0]))},"beforeClose.fb":function(t){t&&t.FullScreen&&o.exit()}}),e(t).on(n.fullscreenchange,function(){var t=o.isFullscreen(),n=e.fancybox.getInstance();n&&(n.current&&"image"===n.current.type&&n.isAnimating&&(n.current.$content.css("transition","none"),n.isAnimating=!1,n.update(!0,!0,0)),n.trigger("onFullscreenChange",t),n.$refs.container.toggleClass("fancybox-is-fullscreen",t))})}(document,window.jQuery||jQuery),function(t,e){"use strict";e.fancybox.defaults=e.extend(!0,{btnTpl:{thumbs:'<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>'},thumbs:{autoStart:!1,hideOnClose:!0,parentEl:".fancybox-container",axis:"y"}},e.fancybox.defaults);var n=function(t){this.init(t)};e.extend(n.prototype,{$button:null,$grid:null,$list:null,isVisible:!1,isActive:!1,init:function(t){var e=this;e.instance=t,t.Thumbs=e;var n=t.group[0],o=t.group[1];e.opts=t.group[t.currIndex].opts.thumbs,e.$button=t.$refs.toolbar.find("[data-fancybox-thumbs]"),e.opts&&n&&o&&("image"==n.type||n.opts.thumb||n.opts.$thumb)&&("image"==o.type||o.opts.thumb||o.opts.$thumb)?(e.$button.show().on("click",function(){e.toggle()}),e.isActive=!0):e.$button.hide()},create:function(){var t,n,o=this,a=o.instance,i=o.opts.parentEl;o.$grid=e('<div class="fancybox-thumbs fancybox-thumbs-'+o.opts.axis+'"></div>').appendTo(a.$refs.container.find(i).addBack().filter(i)),t="<ul>",e.each(a.group,function(e,o){n=o.opts.thumb||(o.opts.$thumb?o.opts.$thumb.attr("src"):null),n||"image"!==o.type||(n=o.src),n&&n.length&&(t+='<li data-index="'+e+'"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="'+n+'" /></li>')}),t+="</ul>",o.$list=e(t).appendTo(o.$grid).on("click","li",function(){a.jumpTo(e(this).data("index"))}),o.$list.find("img").hide().one("load",function(){var t,n,o,a,i=e(this).parent().removeClass("fancybox-thumbs-loading"),s=i.outerWidth(),r=i.outerHeight();t=this.naturalWidth||this.width,n=this.naturalHeight||this.height,o=t/s,a=n/r,o>=1&&a>=1&&(o>a?(t/=a,n=r):(t=s,n/=o)),e(this).css({width:Math.floor(t),height:Math.floor(n),"margin-top":n>r?Math.floor(.3*r-.3*n):Math.floor(.5*r-.5*n),"margin-left":Math.floor(.5*s-.5*t)}).show()}).each(function(){this.src=e(this).data("src")}),"x"===o.opts.axis&&o.$list.width(parseInt(o.$grid.css("padding-right"))+a.group.length*o.$list.children().eq(0).outerWidth(!0)+"px")},focus:function(t){var e,n,o=this,a=o.$list;o.instance.current&&(e=a.children().removeClass("fancybox-thumbs-active").filter('[data-index="'+o.instance.current.index+'"]').addClass("fancybox-thumbs-active"),n=e.position(),"y"===o.opts.axis&&(n.top<0||n.top>a.height()-e.outerHeight())?a.stop().animate({scrollTop:a.scrollTop()+n.top},t):"x"===o.opts.axis&&(n.left<a.parent().scrollLeft()||n.left>a.parent().scrollLeft()+(a.parent().width()-e.outerWidth()))&&a.parent().stop().animate({scrollLeft:n.left},t))},update:function(){this.instance.$refs.container.toggleClass("fancybox-show-thumbs",this.isVisible),this.isVisible?(this.$grid||this.create(),this.instance.trigger("onThumbsShow"),this.focus(0)):this.$grid&&this.instance.trigger("onThumbsHide"),this.instance.update()},hide:function(){this.isVisible=!1,this.update()},show:function(){this.isVisible=!0,this.update()},toggle:function(){this.isVisible=!this.isVisible,this.update()}}),e(t).on({"onInit.fb":function(t,e){var o;e&&!e.Thumbs&&(o=new n(e),o.isActive&&o.opts.autoStart===!0&&o.show())},"beforeShow.fb":function(t,e,n,o){var a=e&&e.Thumbs;a&&a.isVisible&&a.focus(o?0:250)},"afterKeydown.fb":function(t,e,n,o,a){var i=e&&e.Thumbs;i&&i.isActive&&71===a&&(o.preventDefault(),i.toggle())},"beforeClose.fb":function(t,e){var n=e&&e.Thumbs;n&&n.isVisible&&n.opts.hideOnClose!==!1&&n.$grid.hide()}})}(document,window.jQuery),function(t,e){"use strict";function n(t){var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};return String(t).replace(/[&<>"'`=\/]/g,function(t){return e[t]})}e.extend(!0,e.fancybox.defaults,{btnTpl:{share:'<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>'},share:{tpl:'<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a href="https://www.facebook.com/sharer/sharer.php?u={{src}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#3b5998"><path d="M27.6 3h-23.2c-.8 0-1.4.6-1.4 1.4v23.1c0 .9.6 1.5 1.4 1.5h12.5v-10.1h-3.4v-3.9h3.4v-2.9c0-3.4 2.1-5.2 5-5.2 1.4 0 2.7.1 3 .2v3.5h-2.1c-1.6 0-1.9.8-1.9 1.9v2.5h3.9l-.5 3.9h-3.4v10.1h6.6c.8 0 1.4-.6 1.4-1.4v-23.2c.1-.8-.5-1.4-1.3-1.4z"></path></svg><span>Facebook</span></a><a href="https://www.pinterest.com/pin/create/button/?url={{src}}&amp;description={{descr}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#c92228"><path d="M16 3c-7.2 0-13 5.8-13 13 0 5.5 3.4 10.2 8.3 12.1-.1-1-.2-2.6 0-3.7.2-1 1.5-6.5 1.5-6.5s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.8-1.1 4.3-.3 1.3.6 2.3 1.9 2.3 2.3 0 4.1-2.4 4.1-6 0-3.1-2.2-5.3-5.4-5.3-3.7 0-5.9 2.8-5.9 5.6 0 1.1.4 2.3 1 3 .1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.4.2-1.6-.8-2.6-3.1-2.6-5 0-4.1 3-7.9 8.6-7.9 4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.6-.7-3-1.5 0 0-.7 2.5-.8 3.1-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.6 3.8.6 7.2 0 13-5.8 13-13 0-7.1-5.8-12.9-13-12.9z"></path></svg><span>Pinterest</span></a><a href="https://twitter.com/intent/tweet?url={{src}}&amp;text={{descr}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#1da1f2"><path d="M30 7.3c-1 .5-2.1.8-3.3.9 1.2-.7 2.1-1.8 2.5-3.2-1.1.7-2.3 1.1-3.6 1.4-1-1.1-2.5-1.8-4.2-1.8-3.2 0-5.7 2.6-5.7 5.7 0 .5.1.9.1 1.3-4.8-.2-9-2.5-11.8-6-.5.9-.8 1.9-.8 3 0 2 1 3.8 2.6 4.8-.9 0-1.8-.3-2.6-.7v.1c0 2.8 2 5.1 4.6 5.6-.5.1-1 .2-1.5.2-.4 0-.7 0-1.1-.1.7 2.3 2.9 3.9 5.4 4-2 1.5-4.4 2.5-7.1 2.5-.5 0-.9 0-1.4-.1 2.5 1.6 5.6 2.6 8.8 2.6 10.6 0 16.3-8.8 16.3-16.3v-.7c1.1-1 2-2 2.8-3.2z"></path></svg><span>Twitter</span></a></p><p><input type="text" value="{{src_raw}}" onfocus="this.select()" /></p></div>'}}),e(t).on("click","[data-fancybox-share]",function(){var t,o,a=e.fancybox.getInstance();a&&(t=a.current.opts.hash===!1?a.current.src:window.location,o=a.current.opts.share.tpl.replace(/\{\{src\}\}/g,encodeURIComponent(t)).replace(/\{\{src_raw\}\}/g,n(t)).replace(/\{\{descr\}\}/g,a.$caption?encodeURIComponent(a.$caption.text()):""),e.fancybox.open({src:a.translate(a,o),type:"html",opts:{animationEffect:"fade",animationDuration:250}}))})}(document,window.jQuery||jQuery),function(t,e,n){"use strict";function o(){var t=e.location.hash.substr(1),n=t.split("-"),o=n.length>1&&/^\+?\d+$/.test(n[n.length-1])?parseInt(n.pop(-1),10)||1:1,a=n.join("-");return o<1&&(o=1),{hash:t,index:o,gallery:a}}function a(t){var e;""!==t.gallery&&(e=n("[data-fancybox='"+n.escapeSelector(t.gallery)+"']").eq(t.index-1),e.length||(e=n("#"+n.escapeSelector(t.gallery))),e.length&&(s=!1,e.trigger("click")))}function i(t){var e;return!!t&&(e=t.current?t.current.opts:t.opts,e.hash||(e.$orig?e.$orig.data("fancybox"):""))}n.escapeSelector||(n.escapeSelector=function(t){var e=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,n=function(t,e){return e?"\0"===t?"�":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+" ":"\\"+t};return(t+"").replace(e,n)});var s=!0,r=null,c=null;n(function(){n.fancybox.defaults.hash!==!1&&(n(t).on({"onInit.fb":function(t,e){var n,a;e.group[e.currIndex].opts.hash!==!1&&(n=o(),a=i(e),a&&n.gallery&&a==n.gallery&&(e.currIndex=n.index-1))},"beforeShow.fb":function(n,o,a){var l;a&&a.opts.hash!==!1&&(l=i(o),l&&""!==l&&(e.location.hash.indexOf(l)<0&&(o.opts.origHash=e.location.hash),r=l+(o.group.length>1?"-"+(a.index+1):""),"replaceState"in e.history?(c&&clearTimeout(c),c=setTimeout(function(){e.history[s?"pushState":"replaceState"]({},t.title,e.location.pathname+e.location.search+"#"+r),c=null,s=!1},300)):e.location.hash=r))},"beforeClose.fb":function(o,a,s){var l,u;c&&clearTimeout(c),s.opts.hash!==!1&&(l=i(a),u=a&&a.opts.origHash?a.opts.origHash:"",l&&""!==l&&("replaceState"in history?e.history.replaceState({},t.title,e.location.pathname+e.location.search+u):(e.location.hash=u,n(e).scrollTop(a.scrollTop).scrollLeft(a.scrollLeft))),r=null)}}),n(e).on("hashchange.fb",function(){var t=o();n.fancybox.getInstance()?!r||r===t.gallery+"-"+t.index||1===t.index&&r==t.gallery||(r=null,n.fancybox.close()):""!==t.gallery&&a(t)}),setTimeout(function(){a(o())},50))})}(document,window,window.jQuery||jQuery);
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

/*!
 * Isotope PACKAGED v3.0.5
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){function u(t,e,o){var n,s="$()."+i+'("'+e+'")';return t.each(function(t,u){var h=a.data(u,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+s);var d=h[e];if(!d||"_"==e.charAt(0))return void r(s+" is not a valid method");var l=d.apply(h,o);n=void 0===n?l:n}),void 0!==n?n:t}function h(t,e){t.each(function(t,o){var n=a.data(o,i);n?(n.option(e),n._init()):(n=new s(o,e),a.data(o,i,n))})}a=a||e||t.jQuery,a&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=n.call(arguments,1);return u(this,t,e)}return h(this,t),this},o(a))}function o(t){!t||t&&t.bridget||(t.bridget=i)}var n=Array.prototype.slice,s=t.console,r="undefined"==typeof s?function(){}:function(t){s.error(t)};return o(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},o=i[t]=i[t]||[];return o.indexOf(e)==-1&&o.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},o=i[t]=i[t]||{};return o[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var o=i.indexOf(e);return o!=-1&&i.splice(o,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var o=this._onceEvents&&this._onceEvents[t],n=0;n<i.length;n++){var s=i[n],r=o&&o[s];r&&(this.off(t,s),delete o[s]),s.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<h;e++){var i=u[e];t[i]=0}return t}function o(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function n(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var n=o(e);s.isBoxSizeOuter=r=200==t(n.width),i.removeChild(e)}}function s(e){if(n(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var s=o(e);if("none"==s.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==s.boxSizing,l=0;l<h;l++){var f=u[l],c=s[f],m=parseFloat(c);a[f]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,y=a.paddingTop+a.paddingBottom,g=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,I=a.borderTopWidth+a.borderBottomWidth,z=d&&r,x=t(s.width);x!==!1&&(a.width=x+(z?0:p+_));var S=t(s.height);return S!==!1&&(a.height=S+(z?0:y+I)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(y+I),a.outerWidth=a.width+g,a.outerHeight=a.height+v,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=u.length,d=!1;return s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var o=e[i],n=o+"MatchesSelector";if(t[n])return n}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,o){t=i.makeArray(t);var n=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!o)return void n.push(t);e(t,o)&&n.push(t);for(var i=t.querySelectorAll(o),s=0;s<i.length;s++)n.push(i[s])}}),n},i.debounceMethod=function(t,e,i){var o=t.prototype[e],n=e+"Timeout";t.prototype[e]=function(){var t=this[n];t&&clearTimeout(t);var e=arguments,s=this;this[n]=setTimeout(function(){o.apply(s,e),delete s[n]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var o=t.console;return i.htmlInit=function(e,n){i.docReady(function(){var s=i.toDashed(n),r="data-"+s,a=document.querySelectorAll("["+r+"]"),u=document.querySelectorAll(".js-"+s),h=i.makeArray(a).concat(i.makeArray(u)),d=r+"-options",l=t.jQuery;h.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(d);try{i=s&&JSON.parse(s)}catch(a){return void(o&&o.error("Error parsing "+r+" on "+t.className+": "+a))}var u=new e(t,i);l&&l.data(t,n,u)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function o(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function n(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,r="string"==typeof s.transition?"transition":"WebkitTransition",a="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[r],h={transform:a,transition:r,transitionDuration:r+"Duration",transitionProperty:r+"Property",transitionDelay:r+"Delay"},d=o.prototype=Object.create(t.prototype);d.constructor=o,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var o=h[i]||i;e[o]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),o=t[e?"left":"right"],n=t[i?"top":"bottom"],s=this.layout.size,r=o.indexOf("%")!=-1?parseFloat(o)/100*s.width:parseInt(o,10),a=n.indexOf("%")!=-1?parseFloat(n)/100*s.height:parseInt(n,10);r=isNaN(r)?0:r,a=isNaN(a)?0:a,r-=e?s.paddingLeft:s.paddingRight,a-=i?s.paddingTop:s.paddingBottom,this.position.x=r,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop"),n=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[n];e[s]=this.getXValue(a),e[r]="";var u=o?"paddingTop":"paddingBottom",h=o?"top":"bottom",d=o?"bottom":"top",l=this.position.y+t[u];e[h]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=parseInt(t,10),s=parseInt(e,10),r=n===this.position.x&&s===this.position.y;if(this.setPosition(t,e),r&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,u=e-o,h={};h.transform=this.getTranslate(a,u),this.transition({to:h,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop");return t=i?t:-t,e=o?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+n(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],i(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){var n=e.onEnd[o];n.call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var c={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(c)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return r&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,o,n,s){return e(t,i,o,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,o,n){"use strict";function s(t,e){var i=o.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=o.extend({},this.constructor.defaults),this.option(e);var n=++l;this.element.outlayerGUID=n,f[n]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],o=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var n=m[o]||1;return i*n}var u=t.console,h=t.jQuery,d=function(){},l=0,f={};s.namespace="outlayer",s.Item=n,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var c=s.prototype;o.extend(c,e.prototype),c.option=function(t){o.extend(this.options,t)},c._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},c._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),o.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},c.reloadItems=function(){this.items=this._itemize(this.element.children)},c._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0;n<e.length;n++){var s=e[n],r=new i(s,this);o.push(r)}return o},c._filterFindItemElements=function(t){return o.filterFindElements(t,this.options.itemSelector)},c.getItemElements=function(){return this.items.map(function(t){return t.element})},c.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},c._init=c.layout,c._resetLayout=function(){this.getSize()},c.getSize=function(){this.size=i(this.element)},c._getMeasurement=function(t,e){var o,n=this.options[t];n?("string"==typeof n?o=this.element.querySelector(n):n instanceof HTMLElement&&(o=n),this[t]=o?i(o)[e]:n):this[t]=0},c.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},c._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},c._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var o=this._getItemLayoutPosition(t);o.item=t,o.isInstant=e||t.isLayoutInstant,i.push(o)},this),this._processLayoutQueue(i)}},c._getItemLayoutPosition=function(){return{x:0,y:0}},c._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},c.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},c._positionItem=function(t,e,i,o,n){o?t.goTo(e,i):(t.stagger(n*this.stagger),t.moveTo(e,i))},c._postLayout=function(){this.resizeContainer()},c.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},c._getContainerSize=d,c._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},c._emitCompleteOnItems=function(t,e){function i(){n.dispatchEvent(t+"Complete",null,[e])}function o(){r++,r==s&&i()}var n=this,s=e.length;if(!e||!s)return void i();var r=0;e.forEach(function(e){e.once(t,o)})},c.dispatchEvent=function(t,e,i){var o=e?[e].concat(i):i;if(this.emitEvent(t,o),h)if(this.$element=this.$element||h(this.element),e){var n=h.Event(e);n.type=t,this.$element.trigger(n,i)}else this.$element.trigger(t,i)},c.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},c.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},c.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},c.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){o.removeFrom(this.stamps,t),this.unignore(t)},this)},c._find=function(t){if(t)return"string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o.makeArray(t)},c._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},c._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},c._manageStamp=d,c._getElementOffset=function(t){var e=t.getBoundingClientRect(),o=this._boundingRect,n=i(t),s={left:e.left-o.left-n.marginLeft,top:e.top-o.top-n.marginTop,right:o.right-e.right-n.marginRight,bottom:o.bottom-e.bottom-n.marginBottom};return s},c.handleEvent=o.handleEvent,c.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},c.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},c.onresize=function(){this.resize()},o.debounceMethod(s,"onresize",100),c.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},c.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},c.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},c.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},c.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},c.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},c.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},c.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},c.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},c.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},c.getItems=function(t){t=o.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},c.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),o.removeFrom(this.items,t)},this)},c.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=o.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){var i=r(s);return i.defaults=o.extend({},s.defaults),o.extend(i.defaults,e),i.compatOptions=o.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(n),o.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i};var m={ms:1,s:1e3};return s.Item=n,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),o=i._create;i._create=function(){this.id=this.layout.itemGUID++,o.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var n=i.destroy;return i.destroy=function(){n.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var o=i.prototype,n=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"];return n.forEach(function(t){o[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),o.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},o._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},o.getColumnWidth=function(){this.getSegmentSize("column","Width")},o.getRowHeight=function(){this.getSegmentSize("row","Height")},o.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},o.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},o.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},o.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function n(){i.apply(this,arguments)}return n.prototype=Object.create(o),n.prototype.constructor=n,e&&(n.options=e),n.prototype.namespace=t,i.modes[t]=n,n},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry-layout/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var o=i.prototype;return o._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},o.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var o=this.columnWidth+=this.gutter,n=this.containerWidth+this.gutter,s=n/o,r=o-n%o,a=r&&r<1?"round":"floor";s=Math[a](s),this.cols=Math.max(s,1)},o.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,o=e(i);this.containerWidth=o&&o.innerWidth},o._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&e<1?"round":"ceil",o=Math[i](t.size.outerWidth/this.columnWidth);o=Math.min(o,this.cols);for(var n=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",s=this[n](o,t),r={x:this.columnWidth*s.col,y:s.y},a=s.y+t.size.outerHeight,u=o+s.col,h=s.col;h<u;h++)this.colYs[h]=a;return r},o._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},o._getTopColGroup=function(t){if(t<2)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;o<i;o++)e[o]=this._getColGroupY(o,t);return e},o._getColGroupY=function(t,e){if(e<2)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},o._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,o=t>1&&i+t>this.cols;i=o?0:i;var n=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=n?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},o._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this._getOption("originLeft"),s=n?o.left:o.right,r=s+i.outerWidth,a=Math.floor(s/this.columnWidth);a=Math.max(0,a);var u=Math.floor(r/this.columnWidth);u-=r%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var h=this._getOption("originTop"),d=(h?o.top:o.bottom)+i.outerHeight,l=a;l<=u;l++)this.colYs[l]=Math.max(d,this.colYs[l])},o._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},o._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/masonry",["../layout-mode","masonry-layout/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),o=i.prototype,n={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)n[s]||(o[s]=e.prototype[s]);var r=o.measureColumns;o.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=o._getOption;return o._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var o={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,o},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope-layout/js/item","isotope-layout/js/layout-mode","isotope-layout/js/layout-modes/masonry","isotope-layout/js/layout-modes/fit-rows","isotope-layout/js/layout-modes/vertical"],function(i,o,n,s,r,a){return e(t,i,o,n,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope-layout/js/item"),require("isotope-layout/js/layout-mode"),require("isotope-layout/js/layout-modes/masonry"),require("isotope-layout/js/layout-modes/fit-rows"),require("isotope-layout/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,o,n,s,r){function a(t,e){return function(i,o){for(var n=0;n<t.length;n++){var s=t[n],r=i.sortData[s],a=o.sortData[s];if(r>a||r<a){var u=void 0!==e[s]?e[s]:e,h=u?1:-1;return(r>a?1:-1)*h}}return 0}}var u=t.jQuery,h=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=s,d.LayoutMode=r;var l=d.prototype;l._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in r.modes)this._initLayoutMode(t)},l.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){var o=t[i];o.id=this.itemGUID++}return this._updateItemsSortData(t),t},l._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?n.extend(e.options,i):i,this.modes[t]=new e(this)},l.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},l._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},l._init=l.arrange,l._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},l._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},l._bindArrangeComplete=function(){function t(){e&&i&&o&&n.dispatchEvent("arrangeComplete",null,[n.filteredItems])}var e,i,o,n=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){o=!0,t()})},l._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],o=[],n=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var u=s(a);u&&i.push(a),u&&a.isHidden?o.push(a):u||a.isHidden||n.push(a)}}return{matches:i,needReveal:o,needHide:n}},l._getFilterTest=function(t){
return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return o(e.element,t)}},l.updateSortData=function(t){var e;t?(t=n.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&i<e;i++){var o=t[i];o.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=h(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),s=n&&n[1],r=e(s,o),a=d.sortDataParsers[i[1]];return t=a?function(t){return t&&a(r(t))}:function(t){return t&&r(t)}}function e(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l._sort=function(){if(this.options.sortBy){var t=n.makeArray(this.options.sortBy);this._getIsSameSortBy(t)||(this.sortHistory=t.concat(this.sortHistory));var e=a(this.sortHistory,this.options.sortAscending);this.filteredItems.sort(e)}},l._getIsSameSortBy=function(t){for(var e=0;e<t.length;e++)if(t[e]!=this.sortHistory[e])return!1;return!0},l._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l._manageStamp=function(t){this._mode()._manageStamp(t)},l._getContainerSize=function(){return this._mode()._getContainerSize()},l.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;i<n;i++)o=e[i],this.element.appendChild(o.element);var s=this._filter(e).matches;for(i=0;i<n;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;i<n;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var c=l.remove;return l.remove=function(t){t=n.makeArray(t);var e=this.getItems(t);c.call(this,t);for(var i=e&&e.length,o=0;i&&o<i;o++){var s=e[o];n.removeFrom(this.filteredItems,s)}},l.shuffle=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t];e.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var o=t.apply(this,e);return this.options.transitionDuration=i,o},l.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},d});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function (e) {
  'function' == typeof define && define.amd ? define(['jquery'], e) : 'undefined' != typeof module && module.exports ? module.exports = e : e(jQuery, window, document);
}(function (e) {
  !function (t) {
    var o = 'function' == typeof define && define.amd,
        a = 'undefined' != typeof module && module.exports,
        n = 'https:' == document.location.protocol ? 'https:' : 'http:',
        i = 'cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js';o || (a ? require('jquery-mousewheel')(e) : e.event.special.mousewheel || e('head').append(decodeURI('%3Cscript src=' + n + '//' + i + '%3E%3C/script%3E'))), t();
  }(function () {
    var t,
        o = 'mCustomScrollbar',
        a = 'mCS',
        n = '.mCustomScrollbar',
        i = { setTop: 0, setLeft: 0, axis: 'y', scrollbarPosition: 'inside', scrollInertia: 950, autoDraggerLength: !0, alwaysShowScrollbar: 0, snapOffset: 0, mouseWheel: { enable: !0, scrollAmount: 'auto', axis: 'y', deltaFactor: 'auto', disableOver: ['select', 'option', 'keygen', 'datalist', 'textarea'] }, scrollButtons: { scrollType: 'stepless', scrollAmount: 'auto' }, keyboard: { enable: !0, scrollType: 'stepless', scrollAmount: 'auto' }, contentTouchScroll: 25, documentTouchScroll: !0, advanced: { autoScrollOnFocus: 'input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable=\'true\']', updateOnContentResize: !0, updateOnImageLoad: 'auto', autoUpdateTimeout: 60 }, theme: 'light', callbacks: { onTotalScrollOffset: 0, onTotalScrollBackOffset: 0, alwaysTriggerOffsets: !0 } },
        r = 0,
        l = {},
        s = window.attachEvent && !window.addEventListener ? 1 : 0,
        c = !1,
        d = ['mCSB_dragger_onDrag', 'mCSB_scrollTools_onDrag', 'mCS_img_loaded', 'mCS_disabled', 'mCS_destroyed', 'mCS_no_scrollbar', 'mCS-autoHide', 'mCS-dir-rtl', 'mCS_no_scrollbar_y', 'mCS_no_scrollbar_x', 'mCS_y_hidden', 'mCS_x_hidden', 'mCSB_draggerContainer', 'mCSB_buttonUp', 'mCSB_buttonDown', 'mCSB_buttonLeft', 'mCSB_buttonRight'],
        u = { init: function (t) {
        var t = e.extend(!0, {}, i, t),
            o = f.call(this);if (t.live) {
          var s = t.liveSelector || this.selector || n,
              c = e(s);if ('off' === t.live) return void m(s);l[s] = setTimeout(function () {
            c.mCustomScrollbar(t), 'once' === t.live && c.length && m(s);
          }, 500);
        } else m(s);return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? 'x' : p(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, 'object' != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = { enable: !0, scrollAmount: 'auto', axis: 'y', preventDefault: !1, deltaFactor: 'auto', normalizeDelta: !1, invert: !1 }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = g(t.scrollButtons.scrollType), h(t), e(o).each(function () {
          var o = e(this);if (!o.data(a)) {
            o.data(a, { idx: ++r, opt: t, scrollRatio: { y: null, x: null }, overflowed: null, contentReset: { y: null, x: null }, bindEvents: !1, tweenRunning: !1, sequential: {}, langDir: o.css('direction'), cbOffsets: null, trigger: null, poll: { size: { o: 0, n: 0 }, img: { o: 0, n: 0 }, change: { o: 0, n: 0 } } });var n = o.data(a),
                i = n.opt,
                l = o.data('mcs-axis'),
                s = o.data('mcs-scrollbar-position'),
                c = o.data('mcs-theme');l && (i.axis = l), s && (i.scrollbarPosition = s), c && (i.theme = c, h(i)), v.call(this), n && i.callbacks.onCreate && 'function' == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this), e('#mCSB_' + n.idx + '_container img:not(.' + d[2] + ')').addClass(d[2]), u.update.call(null, o);
          }
        });
      }, update: function (t, o) {
        var n = t || f.call(this);return e(n).each(function () {
          var t = e(this);if (t.data(a)) {
            var n = t.data(a),
                i = n.opt,
                r = e('#mCSB_' + n.idx + '_container'),
                l = e('#mCSB_' + n.idx),
                s = [e('#mCSB_' + n.idx + '_dragger_vertical'), e('#mCSB_' + n.idx + '_dragger_horizontal')];if (!r.length) return;n.tweenRunning && Q(t), o && n && i.callbacks.onBeforeUpdate && 'function' == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this), t.hasClass(d[3]) && t.removeClass(d[3]), t.hasClass(d[4]) && t.removeClass(d[4]), l.css('max-height', 'none'), l.height() !== t.height() && l.css('max-height', t.height()), _.call(this), 'y' === i.axis || i.advanced.autoExpandHorizontalScroll || r.css('width', x(r)), n.overflowed = y.call(this), M.call(this), i.autoDraggerLength && S.call(this), b.call(this), T.call(this);var c = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];'x' !== i.axis && (n.overflowed[0] ? s[0].height() > s[0].parent().height() ? B.call(this) : (G(t, c[0].toString(), { dir: 'y', dur: 0, overwrite: 'none' }), n.contentReset.y = null) : (B.call(this), 'y' === i.axis ? k.call(this) : 'yx' === i.axis && n.overflowed[1] && G(t, c[1].toString(), { dir: 'x', dur: 0, overwrite: 'none' }))), 'y' !== i.axis && (n.overflowed[1] ? s[1].width() > s[1].parent().width() ? B.call(this) : (G(t, c[1].toString(), { dir: 'x', dur: 0, overwrite: 'none' }), n.contentReset.x = null) : (B.call(this), 'x' === i.axis ? k.call(this) : 'yx' === i.axis && n.overflowed[0] && G(t, c[0].toString(), { dir: 'y', dur: 0, overwrite: 'none' }))), o && n && (2 === o && i.callbacks.onImageLoad && 'function' == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) : 3 === o && i.callbacks.onSelectorChange && 'function' == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) : i.callbacks.onUpdate && 'function' == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)), N.call(this);
          }
        });
      }, scrollTo: function (t, o) {
        if ('undefined' != typeof t && null != t) {
          var n = f.call(this);return e(n).each(function () {
            var n = e(this);if (n.data(a)) {
              var i = n.data(a),
                  r = i.opt,
                  l = { trigger: 'external', scrollInertia: r.scrollInertia, scrollEasing: 'mcsEaseInOut', moveDragger: !1, timeout: 60, callbacks: !0, onStart: !0, onUpdate: !0, onComplete: !0 },
                  s = e.extend(!0, {}, l, o),
                  c = Y.call(this, t),
                  d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;c[0] = X.call(this, c[0], 'y'), c[1] = X.call(this, c[1], 'x'), s.moveDragger && (c[0] *= i.scrollRatio.y, c[1] *= i.scrollRatio.x), s.dur = ne() ? 0 : d, setTimeout(function () {
                null !== c[0] && 'undefined' != typeof c[0] && 'x' !== r.axis && i.overflowed[0] && (s.dir = 'y', s.overwrite = 'all', G(n, c[0].toString(), s)), null !== c[1] && 'undefined' != typeof c[1] && 'y' !== r.axis && i.overflowed[1] && (s.dir = 'x', s.overwrite = 'none', G(n, c[1].toString(), s));
              }, s.timeout);
            }
          });
        }
      }, stop: function () {
        var t = f.call(this);return e(t).each(function () {
          var t = e(this);t.data(a) && Q(t);
        });
      }, disable: function (t) {
        var o = f.call(this);return e(o).each(function () {
          var o = e(this);if (o.data(a)) {
            o.data(a);N.call(this, 'remove'), k.call(this), t && B.call(this), M.call(this, !0), o.addClass(d[3]);
          }
        });
      }, destroy: function () {
        var t = f.call(this);return e(t).each(function () {
          var n = e(this);if (n.data(a)) {
            var i = n.data(a),
                r = i.opt,
                l = e('#mCSB_' + i.idx),
                s = e('#mCSB_' + i.idx + '_container'),
                c = e('.mCSB_' + i.idx + '_scrollbar');r.live && m(r.liveSelector || e(t).selector), N.call(this, 'remove'), k.call(this), B.call(this), n.removeData(a), $(this, 'mcs'), c.remove(), s.find('img.' + d[2]).removeClass(d[2]), l.replaceWith(s.contents()), n.removeClass(o + ' _' + a + '_' + i.idx + ' ' + d[6] + ' ' + d[7] + ' ' + d[5] + ' ' + d[3]).addClass(d[4]);
          }
        });
      } },
        f = function () {
      return 'object' != typeof e(this) || e(this).length < 1 ? n : this;
    },
        h = function (t) {
      var o = ['rounded', 'rounded-dark', 'rounded-dots', 'rounded-dots-dark'],
          a = ['rounded-dots', 'rounded-dots-dark', '3d', '3d-dark', '3d-thick', '3d-thick-dark', 'inset', 'inset-dark', 'inset-2', 'inset-2-dark', 'inset-3', 'inset-3-dark'],
          n = ['minimal', 'minimal-dark'],
          i = ['minimal', 'minimal-dark'],
          r = ['minimal', 'minimal-dark'];t.autoDraggerLength = e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength, t.autoExpandScrollbar = e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar, t.scrollButtons.enable = e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? 'outside' : t.scrollbarPosition;
    },
        m = function (e) {
      l[e] && (clearTimeout(l[e]), $(l, e));
    },
        p = function (e) {
      return 'yx' === e || 'xy' === e || 'auto' === e ? 'yx' : 'x' === e || 'horizontal' === e ? 'x' : 'y';
    },
        g = function (e) {
      return 'stepped' === e || 'pixels' === e || 'step' === e || 'click' === e ? 'stepped' : 'stepless';
    },
        v = function () {
      var t = e(this),
          n = t.data(a),
          i = n.opt,
          r = i.autoExpandScrollbar ? ' ' + d[1] + '_expand' : '',
          l = ['<div id=\'mCSB_' + n.idx + '_scrollbar_vertical\' class=\'mCSB_scrollTools mCSB_' + n.idx + '_scrollbar mCS-' + i.theme + ' mCSB_scrollTools_vertical' + r + '\'><div class=\'' + d[12] + '\'><div id=\'mCSB_' + n.idx + '_dragger_vertical\' class=\'mCSB_dragger\' style=\'position:absolute;\'><div class=\'mCSB_dragger_bar\' /></div><div class=\'mCSB_draggerRail\' /></div></div>', '<div id=\'mCSB_' + n.idx + '_scrollbar_horizontal\' class=\'mCSB_scrollTools mCSB_' + n.idx + '_scrollbar mCS-' + i.theme + ' mCSB_scrollTools_horizontal' + r + '\'><div class=\'' + d[12] + '\'><div id=\'mCSB_' + n.idx + '_dragger_horizontal\' class=\'mCSB_dragger\' style=\'position:absolute;\'><div class=\'mCSB_dragger_bar\' /></div><div class=\'mCSB_draggerRail\' /></div></div>'],
          s = 'yx' === i.axis ? 'mCSB_vertical_horizontal' : 'x' === i.axis ? 'mCSB_horizontal' : 'mCSB_vertical',
          c = 'yx' === i.axis ? l[0] + l[1] : 'x' === i.axis ? l[1] : l[0],
          u = 'yx' === i.axis ? '<div id=\'mCSB_' + n.idx + '_container_wrapper\' class=\'mCSB_container_wrapper\' />' : '',
          f = i.autoHideScrollbar ? ' ' + d[6] : '',
          h = 'x' !== i.axis && 'rtl' === n.langDir ? ' ' + d[7] : '';i.setWidth && t.css('width', i.setWidth), i.setHeight && t.css('height', i.setHeight), i.setLeft = 'y' !== i.axis && 'rtl' === n.langDir ? '989999px' : i.setLeft, t.addClass(o + ' _' + a + '_' + n.idx + f + h).wrapInner('<div id=\'mCSB_' + n.idx + '\' class=\'mCustomScrollBox mCS-' + i.theme + ' ' + s + '\'><div id=\'mCSB_' + n.idx + '_container\' class=\'mCSB_container\' style=\'position:relative; top:' + i.setTop + '; left:' + i.setLeft + ';\' dir=\'' + n.langDir + '\' /></div>');var m = e('#mCSB_' + n.idx),
          p = e('#mCSB_' + n.idx + '_container');'y' === i.axis || i.advanced.autoExpandHorizontalScroll || p.css('width', x(p)), 'outside' === i.scrollbarPosition ? ('static' === t.css('position') && t.css('position', 'relative'), t.css('overflow', 'visible'), m.addClass('mCSB_outside').after(c)) : (m.addClass('mCSB_inside').append(c), p.wrap(u)), w.call(this);var g = [e('#mCSB_' + n.idx + '_dragger_vertical'), e('#mCSB_' + n.idx + '_dragger_horizontal')];g[0].css('min-height', g[0].height()), g[1].css('min-width', g[1].width());
    },
        x = function (t) {
      var o = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function () {
        return e(this).outerWidth(!0);
      }).get())],
          a = t.parent().width();return o[0] > a ? o[0] : o[1] > a ? o[1] : '100%';
    },
        _ = function () {
      var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e('#mCSB_' + o.idx + '_container');if (n.advanced.autoExpandHorizontalScroll && 'y' !== n.axis) {
        i.css({ width: 'auto', 'min-width': 0, 'overflow-x': 'scroll' });var r = Math.ceil(i[0].scrollWidth);3 === n.advanced.autoExpandHorizontalScroll || 2 !== n.advanced.autoExpandHorizontalScroll && r > i.parent().width() ? i.css({ width: r, 'min-width': '100%', 'overflow-x': 'inherit' }) : i.css({ 'overflow-x': 'inherit', position: 'absolute' }).wrap('<div class=\'mCSB_h_wrapper\' style=\'position:relative; left:0; width:999999px;\' />').css({ width: Math.ceil(i[0].getBoundingClientRect().right + .4) - Math.floor(i[0].getBoundingClientRect().left), 'min-width': '100%', position: 'relative' }).unwrap();
      }
    },
        w = function () {
      var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e('.mCSB_' + o.idx + '_scrollbar:first'),
          r = oe(n.scrollButtons.tabindex) ? 'tabindex=\'' + n.scrollButtons.tabindex + '\'' : '',
          l = ['<a href=\'#\' class=\'' + d[13] + '\' ' + r + ' />', '<a href=\'#\' class=\'' + d[14] + '\' ' + r + ' />', '<a href=\'#\' class=\'' + d[15] + '\' ' + r + ' />', '<a href=\'#\' class=\'' + d[16] + '\' ' + r + ' />'],
          s = ['x' === n.axis ? l[2] : l[0], 'x' === n.axis ? l[3] : l[1], l[2], l[3]];n.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next('.mCSB_scrollTools').prepend(s[2]).append(s[3]);
    },
        S = function () {
      var t = e(this),
          o = t.data(a),
          n = e('#mCSB_' + o.idx),
          i = e('#mCSB_' + o.idx + '_container'),
          r = [e('#mCSB_' + o.idx + '_dragger_vertical'), e('#mCSB_' + o.idx + '_dragger_horizontal')],
          l = [n.height() / i.outerHeight(!1), n.width() / i.outerWidth(!1)],
          c = [parseInt(r[0].css('min-height')), Math.round(l[0] * r[0].parent().height()), parseInt(r[1].css('min-width')), Math.round(l[1] * r[1].parent().width())],
          d = s && c[1] < c[0] ? c[0] : c[1],
          u = s && c[3] < c[2] ? c[2] : c[3];r[0].css({ height: d, 'max-height': r[0].parent().height() - 10 }).find('.mCSB_dragger_bar').css({ 'line-height': c[0] + 'px' }), r[1].css({ width: u, 'max-width': r[1].parent().width() - 10 });
    },
        b = function () {
      var t = e(this),
          o = t.data(a),
          n = e('#mCSB_' + o.idx),
          i = e('#mCSB_' + o.idx + '_container'),
          r = [e('#mCSB_' + o.idx + '_dragger_vertical'), e('#mCSB_' + o.idx + '_dragger_horizontal')],
          l = [i.outerHeight(!1) - n.height(), i.outerWidth(!1) - n.width()],
          s = [l[0] / (r[0].parent().height() - r[0].height()), l[1] / (r[1].parent().width() - r[1].width())];o.scrollRatio = { y: s[0], x: s[1] };
    },
        C = function (e, t, o) {
      var a = o ? d[0] + '_expanded' : '',
          n = e.closest('.mCSB_scrollTools');'active' === t ? (e.toggleClass(d[0] + ' ' + a), n.toggleClass(d[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ('hide' === t ? (e.removeClass(d[0]), n.removeClass(d[1])) : (e.addClass(d[0]), n.addClass(d[1])));
    },
        y = function () {
      var t = e(this),
          o = t.data(a),
          n = e('#mCSB_' + o.idx),
          i = e('#mCSB_' + o.idx + '_container'),
          r = null == o.overflowed ? i.height() : i.outerHeight(!1),
          l = null == o.overflowed ? i.width() : i.outerWidth(!1),
          s = i[0].scrollHeight,
          c = i[0].scrollWidth;return s > r && (r = s), c > l && (l = c), [r > n.height(), l > n.width()];
    },
        B = function () {
      var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e('#mCSB_' + o.idx),
          r = e('#mCSB_' + o.idx + '_container'),
          l = [e('#mCSB_' + o.idx + '_dragger_vertical'), e('#mCSB_' + o.idx + '_dragger_horizontal')];if (Q(t), ('x' !== n.axis && !o.overflowed[0] || 'y' === n.axis && o.overflowed[0]) && (l[0].add(r).css('top', 0), G(t, '_resetY')), 'y' !== n.axis && !o.overflowed[1] || 'x' === n.axis && o.overflowed[1]) {
        var s = dx = 0;'rtl' === o.langDir && (s = i.width() - r.outerWidth(!1), dx = Math.abs(s / o.scrollRatio.x)), r.css('left', s), l[1].css('left', dx), G(t, '_resetX');
      }
    },
        T = function () {
      function t() {
        r = setTimeout(function () {
          e.event.special.mousewheel ? (clearTimeout(r), W.call(o[0])) : t();
        }, 100);
      }var o = e(this),
          n = o.data(a),
          i = n.opt;if (!n.bindEvents) {
        if (I.call(this), i.contentTouchScroll && D.call(this), E.call(this), i.mouseWheel.enable) {
          var r;t();
        }P.call(this), U.call(this), i.advanced.autoScrollOnFocus && H.call(this), i.scrollButtons.enable && F.call(this), i.keyboard.enable && q.call(this), n.bindEvents = !0;
      }
    },
        k = function () {
      var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = a + '_' + o.idx,
          r = '.mCSB_' + o.idx + '_scrollbar',
          l = e('#mCSB_' + o.idx + ',#mCSB_' + o.idx + '_container,#mCSB_' + o.idx + '_container_wrapper,' + r + ' .' + d[12] + ',#mCSB_' + o.idx + '_dragger_vertical,#mCSB_' + o.idx + '_dragger_horizontal,' + r + '>a'),
          s = e('#mCSB_' + o.idx + '_container');n.advanced.releaseDraggableSelectors && l.add(e(n.advanced.releaseDraggableSelectors)), n.advanced.extraDraggableSelectors && l.add(e(n.advanced.extraDraggableSelectors)), o.bindEvents && (e(document).add(e(!A() || top.document)).unbind('.' + i), l.each(function () {
        e(this).unbind('.' + i);
      }), clearTimeout(t[0]._focusTimeout), $(t[0], '_focusTimeout'), clearTimeout(o.sequential.step), $(o.sequential, 'step'), clearTimeout(s[0].onCompleteTimeout), $(s[0], 'onCompleteTimeout'), o.bindEvents = !1);
    },
        M = function (t) {
      var o = e(this),
          n = o.data(a),
          i = n.opt,
          r = e('#mCSB_' + n.idx + '_container_wrapper'),
          l = r.length ? r : e('#mCSB_' + n.idx + '_container'),
          s = [e('#mCSB_' + n.idx + '_scrollbar_vertical'), e('#mCSB_' + n.idx + '_scrollbar_horizontal')],
          c = [s[0].find('.mCSB_dragger'), s[1].find('.mCSB_dragger')];'x' !== i.axis && (n.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children('a')).css('display', 'block'), l.removeClass(d[8] + ' ' + d[10])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css('display', 'none'), l.removeClass(d[10])) : (s[0].css('display', 'none'), l.addClass(d[10])), l.addClass(d[8]))), 'y' !== i.axis && (n.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children('a')).css('display', 'block'), l.removeClass(d[9] + ' ' + d[11])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css('display', 'none'), l.removeClass(d[11])) : (s[1].css('display', 'none'), l.addClass(d[11])), l.addClass(d[9]))), n.overflowed[0] || n.overflowed[1] ? o.removeClass(d[5]) : o.addClass(d[5]);
    },
        O = function (t) {
      var o = t.type,
          a = t.target.ownerDocument !== document && null !== frameElement ? [e(frameElement).offset().top, e(frameElement).offset().left] : null,
          n = A() && t.target.ownerDocument !== top.document && null !== frameElement ? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left] : [0, 0];switch (o) {case 'pointerdown':case 'MSPointerDown':case 'pointermove':case 'MSPointerMove':case 'pointerup':case 'MSPointerUp':
          return a ? [t.originalEvent.pageY - a[0] + n[0], t.originalEvent.pageX - a[1] + n[1], !1] : [t.originalEvent.pageY, t.originalEvent.pageX, !1];case 'touchstart':case 'touchmove':case 'touchend':
          var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
              r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;return t.target.ownerDocument !== document ? [i.screenY, i.screenX, r > 1] : [i.pageY, i.pageX, r > 1];default:
          return a ? [t.pageY - a[0] + n[0], t.pageX - a[1] + n[1], !1] : [t.pageY, t.pageX, !1];}
    },
        I = function () {
      function t(e, t, a, n) {
        if (h[0].idleTimer = d.scrollInertia < 233 ? 250 : 0, o.attr('id') === f[1]) var i = 'x',
            s = (o[0].offsetLeft - t + n) * l.scrollRatio.x;else var i = 'y',
            s = (o[0].offsetTop - e + a) * l.scrollRatio.y;G(r, s.toString(), { dir: i, drag: !0 });
      }var o,
          n,
          i,
          r = e(this),
          l = r.data(a),
          d = l.opt,
          u = a + '_' + l.idx,
          f = ['mCSB_' + l.idx + '_dragger_vertical', 'mCSB_' + l.idx + '_dragger_horizontal'],
          h = e('#mCSB_' + l.idx + '_container'),
          m = e('#' + f[0] + ',#' + f[1]),
          p = d.advanced.releaseDraggableSelectors ? m.add(e(d.advanced.releaseDraggableSelectors)) : m,
          g = d.advanced.extraDraggableSelectors ? e(!A() || top.document).add(e(d.advanced.extraDraggableSelectors)) : e(!A() || top.document);m.bind('contextmenu.' + u, function (e) {
        e.preventDefault();
      }).bind('mousedown.' + u + ' touchstart.' + u + ' pointerdown.' + u + ' MSPointerDown.' + u, function (t) {
        if (t.stopImmediatePropagation(), t.preventDefault(), ee(t)) {
          c = !0, s && (document.onselectstart = function () {
            return !1;
          }), L.call(h, !1), Q(r), o = e(this);var a = o.offset(),
              l = O(t)[0] - a.top,
              u = O(t)[1] - a.left,
              f = o.height() + a.top,
              m = o.width() + a.left;f > l && l > 0 && m > u && u > 0 && (n = l, i = u), C(o, 'active', d.autoExpandScrollbar);
        }
      }).bind('touchmove.' + u, function (e) {
        e.stopImmediatePropagation(), e.preventDefault();var a = o.offset(),
            r = O(e)[0] - a.top,
            l = O(e)[1] - a.left;t(n, i, r, l);
      }), e(document).add(g).bind('mousemove.' + u + ' pointermove.' + u + ' MSPointerMove.' + u, function (e) {
        if (o) {
          var a = o.offset(),
              r = O(e)[0] - a.top,
              l = O(e)[1] - a.left;if (n === r && i === l) return;t(n, i, r, l);
        }
      }).add(p).bind('mouseup.' + u + ' touchend.' + u + ' pointerup.' + u + ' MSPointerUp.' + u, function () {
        o && (C(o, 'active', d.autoExpandScrollbar), o = null), c = !1, s && (document.onselectstart = null), L.call(h, !0);
      });
    },
        D = function () {
      function o(e) {
        if (!te(e) || c || O(e)[2]) return void (t = 0);t = 1, b = 0, C = 0, d = 1, y.removeClass('mCS_touch_action');var o = I.offset();u = O(e)[0] - o.top, f = O(e)[1] - o.left, z = [O(e)[0], O(e)[1]];
      }function n(e) {
        if (te(e) && !c && !O(e)[2] && (T.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!C || b) && d)) {
          g = K();var t = M.offset(),
              o = O(e)[0] - t.top,
              a = O(e)[1] - t.left,
              n = 'mcsLinearOut';if (E.push(o), W.push(a), z[2] = Math.abs(O(e)[0] - z[0]), z[3] = Math.abs(O(e)[1] - z[1]), B.overflowed[0]) var i = D[0].parent().height() - D[0].height(),
              r = u - o > 0 && o - u > -(i * B.scrollRatio.y) && (2 * z[3] < z[2] || 'yx' === T.axis);if (B.overflowed[1]) var l = D[1].parent().width() - D[1].width(),
              h = f - a > 0 && a - f > -(l * B.scrollRatio.x) && (2 * z[2] < z[3] || 'yx' === T.axis);r || h ? (U || e.preventDefault(), b = 1) : (C = 1, y.addClass('mCS_touch_action')), U && e.preventDefault(), w = 'yx' === T.axis ? [u - o, f - a] : 'x' === T.axis ? [null, f - a] : [u - o, null], I[0].idleTimer = 250, B.overflowed[0] && s(w[0], R, n, 'y', 'all', !0), B.overflowed[1] && s(w[1], R, n, 'x', L, !0);
        }
      }function i(e) {
        if (!te(e) || c || O(e)[2]) return void (t = 0);t = 1, e.stopImmediatePropagation(), Q(y), p = K();var o = M.offset();h = O(e)[0] - o.top, m = O(e)[1] - o.left, E = [], W = [];
      }function r(e) {
        if (te(e) && !c && !O(e)[2]) {
          d = 0, e.stopImmediatePropagation(), b = 0, C = 0, v = K();var t = M.offset(),
              o = O(e)[0] - t.top,
              a = O(e)[1] - t.left;if (!(v - g > 30)) {
            _ = 1e3 / (v - p);var n = 'mcsEaseOut',
                i = 2.5 > _,
                r = i ? [E[E.length - 2], W[W.length - 2]] : [0, 0];x = i ? [o - r[0], a - r[1]] : [o - h, a - m];var u = [Math.abs(x[0]), Math.abs(x[1])];_ = i ? [Math.abs(x[0] / 4), Math.abs(x[1] / 4)] : [_, _];var f = [Math.abs(I[0].offsetTop) - x[0] * l(u[0] / _[0], _[0]), Math.abs(I[0].offsetLeft) - x[1] * l(u[1] / _[1], _[1])];w = 'yx' === T.axis ? [f[0], f[1]] : 'x' === T.axis ? [null, f[1]] : [f[0], null], S = [4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia];var y = parseInt(T.contentTouchScroll) || 0;w[0] = u[0] > y ? w[0] : 0, w[1] = u[1] > y ? w[1] : 0, B.overflowed[0] && s(w[0], S[0], n, 'y', L, !1), B.overflowed[1] && s(w[1], S[1], n, 'x', L, !1);
          }
        }
      }function l(e, t) {
        var o = [1.5 * t, 2 * t, t / 1.5, t / 2];return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3];
      }function s(e, t, o, a, n, i) {
        e && G(y, e.toString(), { dur: t, scrollEasing: o, dir: a, overwrite: n, drag: i });
      }var d,
          u,
          f,
          h,
          m,
          p,
          g,
          v,
          x,
          _,
          w,
          S,
          b,
          C,
          y = e(this),
          B = y.data(a),
          T = B.opt,
          k = a + '_' + B.idx,
          M = e('#mCSB_' + B.idx),
          I = e('#mCSB_' + B.idx + '_container'),
          D = [e('#mCSB_' + B.idx + '_dragger_vertical'), e('#mCSB_' + B.idx + '_dragger_horizontal')],
          E = [],
          W = [],
          R = 0,
          L = 'yx' === T.axis ? 'none' : 'all',
          z = [],
          P = I.find('iframe'),
          H = ['touchstart.' + k + ' pointerdown.' + k + ' MSPointerDown.' + k, 'touchmove.' + k + ' pointermove.' + k + ' MSPointerMove.' + k, 'touchend.' + k + ' pointerup.' + k + ' MSPointerUp.' + k],
          U = void 0 !== document.body.style.touchAction && '' !== document.body.style.touchAction;I.bind(H[0], function (e) {
        o(e);
      }).bind(H[1], function (e) {
        n(e);
      }), M.bind(H[0], function (e) {
        i(e);
      }).bind(H[2], function (e) {
        r(e);
      }), P.length && P.each(function () {
        e(this).bind('load', function () {
          A(this) && e(this.contentDocument || this.contentWindow.document).bind(H[0], function (e) {
            o(e), i(e);
          }).bind(H[1], function (e) {
            n(e);
          }).bind(H[2], function (e) {
            r(e);
          });
        });
      });
    },
        E = function () {
      function o() {
        return window.getSelection ? window.getSelection().toString() : document.selection && 'Control' != document.selection.type ? document.selection.createRange().text : 0;
      }function n(e, t, o) {
        d.type = o && i ? 'stepped' : 'stepless', d.scrollAmount = 10, j(r, e, t, 'mcsLinearOut', o ? 60 : null);
      }var i,
          r = e(this),
          l = r.data(a),
          s = l.opt,
          d = l.sequential,
          u = a + '_' + l.idx,
          f = e('#mCSB_' + l.idx + '_container'),
          h = f.parent();f.bind('mousedown.' + u, function () {
        t || i || (i = 1, c = !0);
      }).add(document).bind('mousemove.' + u, function (e) {
        if (!t && i && o()) {
          var a = f.offset(),
              r = O(e)[0] - a.top + f[0].offsetTop,
              c = O(e)[1] - a.left + f[0].offsetLeft;r > 0 && r < h.height() && c > 0 && c < h.width() ? d.step && n('off', null, 'stepped') : ('x' !== s.axis && l.overflowed[0] && (0 > r ? n('on', 38) : r > h.height() && n('on', 40)), 'y' !== s.axis && l.overflowed[1] && (0 > c ? n('on', 37) : c > h.width() && n('on', 39)));
        }
      }).bind('mouseup.' + u + ' dragend.' + u, function () {
        t || (i && (i = 0, n('off', null)), c = !1);
      });
    },
        W = function () {
      function t(t, a) {
        if (Q(o), !z(o, t.target)) {
          var r = 'auto' !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : s && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100,
              d = i.scrollInertia;if ('x' === i.axis || 'x' === i.mouseWheel.axis) var u = 'x',
              f = [Math.round(r * n.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)],
              h = 'auto' !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.width() ? .9 * l.width() : f[0],
              m = Math.abs(e('#mCSB_' + n.idx + '_container')[0].offsetLeft),
              p = c[1][0].offsetLeft,
              g = c[1].parent().width() - c[1].width(),
              v = 'y' === i.mouseWheel.axis ? t.deltaY || a : t.deltaX;else var u = 'y',
              f = [Math.round(r * n.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)],
              h = 'auto' !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.height() ? .9 * l.height() : f[0],
              m = Math.abs(e('#mCSB_' + n.idx + '_container')[0].offsetTop),
              p = c[0][0].offsetTop,
              g = c[0].parent().height() - c[0].height(),
              v = t.deltaY || a;'y' === u && !n.overflowed[0] || 'x' === u && !n.overflowed[1] || ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v), i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== p || 0 > v && p !== g || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), t.deltaFactor < 5 && !i.mouseWheel.normalizeDelta && (h = t.deltaFactor, d = 17), G(o, (m - v * h).toString(), { dir: u, dur: d }));
        }
      }if (e(this).data(a)) {
        var o = e(this),
            n = o.data(a),
            i = n.opt,
            r = a + '_' + n.idx,
            l = e('#mCSB_' + n.idx),
            c = [e('#mCSB_' + n.idx + '_dragger_vertical'), e('#mCSB_' + n.idx + '_dragger_horizontal')],
            d = e('#mCSB_' + n.idx + '_container').find('iframe');d.length && d.each(function () {
          e(this).bind('load', function () {
            A(this) && e(this.contentDocument || this.contentWindow.document).bind('mousewheel.' + r, function (e, o) {
              t(e, o);
            });
          });
        }), l.bind('mousewheel.' + r, function (e, o) {
          t(e, o);
        });
      }
    },
        R = new Object(),
        A = function (t) {
      var o = !1,
          a = !1,
          n = null;if (void 0 === t ? a = '#empty' : void 0 !== e(t).attr('id') && (a = e(t).attr('id')), a !== !1 && void 0 !== R[a]) return R[a];if (t) {
        try {
          var i = t.contentDocument || t.contentWindow.document;n = i.body.innerHTML;
        } catch (r) {}o = null !== n;
      } else {
        try {
          var i = top.document;n = i.body.innerHTML;
        } catch (r) {}o = null !== n;
      }return a !== !1 && (R[a] = o), o;
    },
        L = function (e) {
      var t = this.find('iframe');if (t.length) {
        var o = e ? 'auto' : 'none';t.css('pointer-events', o);
      }
    },
        z = function (t, o) {
      var n = o.nodeName.toLowerCase(),
          i = t.data(a).opt.mouseWheel.disableOver,
          r = ['select', 'textarea'];return e.inArray(n, i) > -1 && !(e.inArray(n, r) > -1 && !e(o).is(':focus'));
    },
        P = function () {
      var t,
          o = e(this),
          n = o.data(a),
          i = a + '_' + n.idx,
          r = e('#mCSB_' + n.idx + '_container'),
          l = r.parent(),
          s = e('.mCSB_' + n.idx + '_scrollbar .' + d[12]);s.bind('mousedown.' + i + ' touchstart.' + i + ' pointerdown.' + i + ' MSPointerDown.' + i, function (o) {
        c = !0, e(o.target).hasClass('mCSB_dragger') || (t = 1);
      }).bind('touchend.' + i + ' pointerup.' + i + ' MSPointerUp.' + i, function () {
        c = !1;
      }).bind('click.' + i, function (a) {
        if (t && (t = 0, e(a.target).hasClass(d[12]) || e(a.target).hasClass('mCSB_draggerRail'))) {
          Q(o);var i = e(this),
              s = i.find('.mCSB_dragger');if (i.parent('.mCSB_scrollTools_horizontal').length > 0) {
            if (!n.overflowed[1]) return;var c = 'x',
                u = a.pageX > s.offset().left ? -1 : 1,
                f = Math.abs(r[0].offsetLeft) - u * (.9 * l.width());
          } else {
            if (!n.overflowed[0]) return;var c = 'y',
                u = a.pageY > s.offset().top ? -1 : 1,
                f = Math.abs(r[0].offsetTop) - u * (.9 * l.height());
          }G(o, f.toString(), { dir: c, scrollEasing: 'mcsEaseInOut' });
        }
      });
    },
        H = function () {
      var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = a + '_' + o.idx,
          r = e('#mCSB_' + o.idx + '_container'),
          l = r.parent();r.bind('focusin.' + i, function () {
        var o = e(document.activeElement),
            a = r.find('.mCustomScrollBox').length,
            i = 0;o.is(n.advanced.autoScrollOnFocus) && (Q(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = a ? (i + 17) * a : 0, t[0]._focusTimeout = setTimeout(function () {
          var e = [ae(o)[0], ae(o)[1]],
              a = [r[0].offsetTop, r[0].offsetLeft],
              s = [a[0] + e[0] >= 0 && a[0] + e[0] < l.height() - o.outerHeight(!1), a[1] + e[1] >= 0 && a[0] + e[1] < l.width() - o.outerWidth(!1)],
              c = 'yx' !== n.axis || s[0] || s[1] ? 'all' : 'none';'x' === n.axis || s[0] || G(t, e[0].toString(), { dir: 'y', scrollEasing: 'mcsEaseInOut', overwrite: c, dur: i }), 'y' === n.axis || s[1] || G(t, e[1].toString(), { dir: 'x', scrollEasing: 'mcsEaseInOut', overwrite: c, dur: i });
        }, t[0]._focusTimer));
      });
    },
        U = function () {
      var t = e(this),
          o = t.data(a),
          n = a + '_' + o.idx,
          i = e('#mCSB_' + o.idx + '_container').parent();i.bind('scroll.' + n, function () {
        0 === i.scrollTop() && 0 === i.scrollLeft() || e('.mCSB_' + o.idx + '_scrollbar').css('visibility', 'hidden');
      });
    },
        F = function () {
      var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = o.sequential,
          r = a + '_' + o.idx,
          l = '.mCSB_' + o.idx + '_scrollbar',
          s = e(l + '>a');s.bind('contextmenu.' + r, function (e) {
        e.preventDefault();
      }).bind('mousedown.' + r + ' touchstart.' + r + ' pointerdown.' + r + ' MSPointerDown.' + r + ' mouseup.' + r + ' touchend.' + r + ' pointerup.' + r + ' MSPointerUp.' + r + ' mouseout.' + r + ' pointerout.' + r + ' MSPointerOut.' + r + ' click.' + r, function (a) {
        function r(e, o) {
          i.scrollAmount = n.scrollButtons.scrollAmount, j(t, e, o);
        }if (a.preventDefault(), ee(a)) {
          var l = e(this).attr('class');switch (i.type = n.scrollButtons.scrollType, a.type) {case 'mousedown':case 'touchstart':case 'pointerdown':case 'MSPointerDown':
              if ('stepped' === i.type) return;c = !0, o.tweenRunning = !1, r('on', l);break;case 'mouseup':case 'touchend':case 'pointerup':case 'MSPointerUp':case 'mouseout':case 'pointerout':case 'MSPointerOut':
              if ('stepped' === i.type) return;c = !1, i.dir && r('off', l);break;case 'click':
              if ('stepped' !== i.type || o.tweenRunning) return;r('on', l);}
        }
      });
    },
        q = function () {
      function t(t) {
        function a(e, t) {
          r.type = i.keyboard.scrollType, r.scrollAmount = i.keyboard.scrollAmount, 'stepped' === r.type && n.tweenRunning || j(o, e, t);
        }switch (t.type) {case 'blur':
            n.tweenRunning && r.dir && a('off', null);break;case 'keydown':case 'keyup':
            var l = t.keyCode ? t.keyCode : t.which,
                s = 'on';if ('x' !== i.axis && (38 === l || 40 === l) || 'y' !== i.axis && (37 === l || 39 === l)) {
              if ((38 === l || 40 === l) && !n.overflowed[0] || (37 === l || 39 === l) && !n.overflowed[1]) return;'keyup' === t.type && (s = 'off'), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), a(s, l));
            } else if (33 === l || 34 === l) {
              if ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), 'keyup' === t.type) {
                Q(o);var f = 34 === l ? -1 : 1;if ('x' === i.axis || 'yx' === i.axis && n.overflowed[1] && !n.overflowed[0]) var h = 'x',
                    m = Math.abs(c[0].offsetLeft) - f * (.9 * d.width());else var h = 'y',
                    m = Math.abs(c[0].offsetTop) - f * (.9 * d.height());G(o, m.toString(), { dir: h, scrollEasing: 'mcsEaseInOut' });
              }
            } else if ((35 === l || 36 === l) && !e(document.activeElement).is(u) && ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), 'keyup' === t.type)) {
              if ('x' === i.axis || 'yx' === i.axis && n.overflowed[1] && !n.overflowed[0]) var h = 'x',
                  m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0;else var h = 'y',
                  m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;G(o, m.toString(), { dir: h, scrollEasing: 'mcsEaseInOut' });
            }}
      }var o = e(this),
          n = o.data(a),
          i = n.opt,
          r = n.sequential,
          l = a + '_' + n.idx,
          s = e('#mCSB_' + n.idx),
          c = e('#mCSB_' + n.idx + '_container'),
          d = c.parent(),
          u = 'input,textarea,select,datalist,keygen,[contenteditable=\'true\']',
          f = c.find('iframe'),
          h = ['blur.' + l + ' keydown.' + l + ' keyup.' + l];f.length && f.each(function () {
        e(this).bind('load', function () {
          A(this) && e(this.contentDocument || this.contentWindow.document).bind(h[0], function (e) {
            t(e);
          });
        });
      }), s.attr('tabindex', '0').bind(h[0], function (e) {
        t(e);
      });
    },
        j = function (t, o, n, i, r) {
      function l(e) {
        u.snapAmount && (f.scrollAmount = u.snapAmount instanceof Array ? 'x' === f.dir[0] ? u.snapAmount[1] : u.snapAmount[0] : u.snapAmount);var o = 'stepped' !== f.type,
            a = r ? r : e ? o ? p / 1.5 : g : 1e3 / 60,
            n = e ? o ? 7.5 : 40 : 2.5,
            s = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)],
            d = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x],
            m = 'x' === f.dir[0] ? s[1] + f.dir[1] * (d[1] * n) : s[0] + f.dir[1] * (d[0] * n),
            v = 'x' === f.dir[0] ? s[1] + f.dir[1] * parseInt(f.scrollAmount) : s[0] + f.dir[1] * parseInt(f.scrollAmount),
            x = 'auto' !== f.scrollAmount ? v : m,
            _ = i ? i : e ? o ? 'mcsLinearOut' : 'mcsEaseInOut' : 'mcsLinear',
            w = !!e;return e && 17 > a && (x = 'x' === f.dir[0] ? s[1] : s[0]), G(t, x.toString(), { dir: f.dir[0], scrollEasing: _, dur: a, onComplete: w }), e ? void (f.dir = !1) : (clearTimeout(f.step), void (f.step = setTimeout(function () {
          l();
        }, a)));
      }function s() {
        clearTimeout(f.step), $(f, 'step'), Q(t);
      }var c = t.data(a),
          u = c.opt,
          f = c.sequential,
          h = e('#mCSB_' + c.idx + '_container'),
          m = 'stepped' === f.type,
          p = u.scrollInertia < 26 ? 26 : u.scrollInertia,
          g = u.scrollInertia < 1 ? 17 : u.scrollInertia;switch (o) {case 'on':
          if (f.dir = [n === d[16] || n === d[15] || 39 === n || 37 === n ? 'x' : 'y', n === d[13] || n === d[15] || 38 === n || 37 === n ? -1 : 1], Q(t), oe(n) && 'stepped' === f.type) return;l(m);break;case 'off':
          s(), (m || c.tweenRunning && f.dir) && l(!0);}
    },
        Y = function (t) {
      var o = e(this).data(a).opt,
          n = [];return 'function' == typeof t && (t = t()), t instanceof Array ? n = t.length > 1 ? [t[0], t[1]] : 'x' === o.axis ? [null, t[0]] : [t[0], null] : (n[0] = t.y ? t.y : t.x || 'x' === o.axis ? null : t, n[1] = t.x ? t.x : t.y || 'y' === o.axis ? null : t), 'function' == typeof n[0] && (n[0] = n[0]()), 'function' == typeof n[1] && (n[1] = n[1]()), n;
    },
        X = function (t, o) {
      if (null != t && 'undefined' != typeof t) {
        var n = e(this),
            i = n.data(a),
            r = i.opt,
            l = e('#mCSB_' + i.idx + '_container'),
            s = l.parent(),
            c = typeof t;o || (o = 'x' === r.axis ? 'x' : 'y');var d = 'x' === o ? l.outerWidth(!1) - s.width() : l.outerHeight(!1) - s.height(),
            f = 'x' === o ? l[0].offsetLeft : l[0].offsetTop,
            h = 'x' === o ? 'left' : 'top';switch (c) {case 'function':
            return t();case 'object':
            var m = t.jquery ? t : e(t);if (!m.length) return;return 'x' === o ? ae(m)[1] : ae(m)[0];case 'string':case 'number':
            if (oe(t)) return Math.abs(t);if (-1 !== t.indexOf('%')) return Math.abs(d * parseInt(t) / 100);if (-1 !== t.indexOf('-=')) return Math.abs(f - parseInt(t.split('-=')[1]));if (-1 !== t.indexOf('+=')) {
              var p = f + parseInt(t.split('+=')[1]);return p >= 0 ? 0 : Math.abs(p);
            }if (-1 !== t.indexOf('px') && oe(t.split('px')[0])) return Math.abs(t.split('px')[0]);if ('top' === t || 'left' === t) return 0;if ('bottom' === t) return Math.abs(s.height() - l.outerHeight(!1));if ('right' === t) return Math.abs(s.width() - l.outerWidth(!1));if ('first' === t || 'last' === t) {
              var m = l.find(':' + t);return 'x' === o ? ae(m)[1] : ae(m)[0];
            }return e(t).length ? 'x' === o ? ae(e(t))[1] : ae(e(t))[0] : (l.css(h, t), void u.update.call(null, n[0]));}
      }
    },
        N = function (t) {
      function o() {
        return clearTimeout(f[0].autoUpdate), 0 === l.parents('html').length ? void (l = null) : void (f[0].autoUpdate = setTimeout(function () {
          return c.advanced.updateOnSelectorChange && (s.poll.change.n = i(), s.poll.change.n !== s.poll.change.o) ? (s.poll.change.o = s.poll.change.n, void r(3)) : c.advanced.updateOnContentResize && (s.poll.size.n = l[0].scrollHeight + l[0].scrollWidth + f[0].offsetHeight + l[0].offsetHeight + l[0].offsetWidth, s.poll.size.n !== s.poll.size.o) ? (s.poll.size.o = s.poll.size.n, void r(1)) : !c.advanced.updateOnImageLoad || 'auto' === c.advanced.updateOnImageLoad && 'y' === c.axis || (s.poll.img.n = f.find('img').length, s.poll.img.n === s.poll.img.o) ? void ((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && o()) : (s.poll.img.o = s.poll.img.n, void f.find('img').each(function () {
            n(this);
          }));
        }, c.advanced.autoUpdateTimeout));
      }function n(t) {
        function o(e, t) {
          return function () {
            return t.apply(e, arguments);
          };
        }function a() {
          this.onload = null, e(t).addClass(d[2]), r(2);
        }if (e(t).hasClass(d[2])) return void r();var n = new Image();n.onload = o(n, a), n.src = t.src;
      }function i() {
        c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = '*');var e = 0,
            t = f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange && t.length > 0 && t.each(function () {
          e += this.offsetHeight + this.offsetWidth;
        }), e;
      }function r(e) {
        clearTimeout(f[0].autoUpdate), u.update.call(null, l[0], e);
      }var l = e(this),
          s = l.data(a),
          c = s.opt,
          f = e('#mCSB_' + s.idx + '_container');return t ? (clearTimeout(f[0].autoUpdate), void $(f[0], 'autoUpdate')) : void o();
    },
        V = function (e, t, o) {
      return Math.round(e / t) * t - o;
    },
        Q = function (t) {
      var o = t.data(a),
          n = e('#mCSB_' + o.idx + '_container,#mCSB_' + o.idx + '_container_wrapper,#mCSB_' + o.idx + '_dragger_vertical,#mCSB_' + o.idx + '_dragger_horizontal');n.each(function () {
        Z.call(this);
      });
    },
        G = function (t, o, n) {
      function i(e) {
        return s && c.callbacks[e] && 'function' == typeof c.callbacks[e];
      }function r() {
        return [c.callbacks.alwaysTriggerOffsets || w >= S[0] + y, c.callbacks.alwaysTriggerOffsets || -B >= w];
      }function l() {
        var e = [h[0].offsetTop, h[0].offsetLeft],
            o = [x[0].offsetTop, x[0].offsetLeft],
            a = [h.outerHeight(!1), h.outerWidth(!1)],
            i = [f.height(), f.width()];t[0].mcs = { content: h, top: e[0], left: e[1], draggerTop: o[0], draggerLeft: o[1], topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(a[0]) - i[0])), leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(a[1]) - i[1])), direction: n.dir };
      }var s = t.data(a),
          c = s.opt,
          d = { trigger: 'internal', dir: 'y', scrollEasing: 'mcsEaseOut', drag: !1, dur: c.scrollInertia, overwrite: 'all', callbacks: !0, onStart: !0, onUpdate: !0, onComplete: !0 },
          n = e.extend(d, n),
          u = [n.dur, n.drag ? 0 : n.dur],
          f = e('#mCSB_' + s.idx),
          h = e('#mCSB_' + s.idx + '_container'),
          m = h.parent(),
          p = c.callbacks.onTotalScrollOffset ? Y.call(t, c.callbacks.onTotalScrollOffset) : [0, 0],
          g = c.callbacks.onTotalScrollBackOffset ? Y.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];if (s.trigger = n.trigger, 0 === m.scrollTop() && 0 === m.scrollLeft() || (e('.mCSB_' + s.idx + '_scrollbar').css('visibility', 'visible'), m.scrollTop(0).scrollLeft(0)), '_resetY' !== o || s.contentReset.y || (i('onOverflowYNone') && c.callbacks.onOverflowYNone.call(t[0]), s.contentReset.y = 1), '_resetX' !== o || s.contentReset.x || (i('onOverflowXNone') && c.callbacks.onOverflowXNone.call(t[0]), s.contentReset.x = 1), '_resetY' !== o && '_resetX' !== o) {
        if (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (i('onOverflowY') && c.callbacks.onOverflowY.call(t[0]), s.contentReset.x = null), !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (i('onOverflowX') && c.callbacks.onOverflowX.call(t[0]), s.contentReset.x = null), c.snapAmount) {
          var v = c.snapAmount instanceof Array ? 'x' === n.dir ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount;o = V(o, v, c.snapOffset);
        }switch (n.dir) {case 'x':
            var x = e('#mCSB_' + s.idx + '_dragger_horizontal'),
                _ = 'left',
                w = h[0].offsetLeft,
                S = [f.width() - h.outerWidth(!1), x.parent().width() - x.width()],
                b = [o, 0 === o ? 0 : o / s.scrollRatio.x],
                y = p[1],
                B = g[1],
                T = y > 0 ? y / s.scrollRatio.x : 0,
                k = B > 0 ? B / s.scrollRatio.x : 0;break;case 'y':
            var x = e('#mCSB_' + s.idx + '_dragger_vertical'),
                _ = 'top',
                w = h[0].offsetTop,
                S = [f.height() - h.outerHeight(!1), x.parent().height() - x.height()],
                b = [o, 0 === o ? 0 : o / s.scrollRatio.y],
                y = p[0],
                B = g[0],
                T = y > 0 ? y / s.scrollRatio.y : 0,
                k = B > 0 ? B / s.scrollRatio.y : 0;}b[1] < 0 || 0 === b[0] && 0 === b[1] ? b = [0, 0] : b[1] >= S[1] ? b = [S[0], S[1]] : b[0] = -b[0], t[0].mcs || (l(), i('onInit') && c.callbacks.onInit.call(t[0])), clearTimeout(h[0].onCompleteTimeout), J(x[0], _, Math.round(b[1]), u[1], n.scrollEasing), !s.tweenRunning && (0 === w && b[0] >= 0 || w === S[0] && b[0] <= S[0]) || J(h[0], _, Math.round(b[0]), u[0], n.scrollEasing, n.overwrite, { onStart: function () {
            n.callbacks && n.onStart && !s.tweenRunning && (i('onScrollStart') && (l(), c.callbacks.onScrollStart.call(t[0])), s.tweenRunning = !0, C(x), s.cbOffsets = r());
          }, onUpdate: function () {
            n.callbacks && n.onUpdate && i('whileScrolling') && (l(), c.callbacks.whileScrolling.call(t[0]));
          }, onComplete: function () {
            if (n.callbacks && n.onComplete) {
              'yx' === c.axis && clearTimeout(h[0].onCompleteTimeout);var e = h[0].idleTimer || 0;h[0].onCompleteTimeout = setTimeout(function () {
                i('onScroll') && (l(), c.callbacks.onScroll.call(t[0])), i('onTotalScroll') && b[1] >= S[1] - T && s.cbOffsets[0] && (l(), c.callbacks.onTotalScroll.call(t[0])), i('onTotalScrollBack') && b[1] <= k && s.cbOffsets[1] && (l(), c.callbacks.onTotalScrollBack.call(t[0])), s.tweenRunning = !1, h[0].idleTimer = 0, C(x, 'hide');
              }, e);
            }
          } });
      }
    },
        J = function (e, t, o, a, n, i, r) {
      function l() {
        S.stop || (x || m.call(), x = K() - v, s(), x >= S.time && (S.time = x > S.time ? x + f - (x - S.time) : x + f - 1, S.time < x + 1 && (S.time = x + 1)), S.time < a ? S.id = h(l) : g.call());
      }function s() {
        a > 0 ? (S.currVal = u(S.time, _, b, a, n), w[t] = Math.round(S.currVal) + 'px') : w[t] = o + 'px', p.call();
      }function c() {
        f = 1e3 / 60, S.time = x + f, h = window.requestAnimationFrame ? window.requestAnimationFrame : function (e) {
          return s(), setTimeout(e, .01);
        }, S.id = h(l);
      }function d() {
        null != S.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(S.id) : clearTimeout(S.id), S.id = null);
      }function u(e, t, o, a, n) {
        switch (n) {case 'linear':case 'mcsLinear':
            return o * e / a + t;case 'mcsLinearOut':
            return e /= a, e--, o * Math.sqrt(1 - e * e) + t;case 'easeInOutSmooth':
            return e /= a / 2, 1 > e ? o / 2 * e * e + t : (e--, -o / 2 * (e * (e - 2) - 1) + t);case 'easeInOutStrong':
            return e /= a / 2, 1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, o / 2 * (-Math.pow(2, -10 * e) + 2) + t);case 'easeInOut':case 'mcsEaseInOut':
            return e /= a / 2, 1 > e ? o / 2 * e * e * e + t : (e -= 2, o / 2 * (e * e * e + 2) + t);case 'easeOutSmooth':
            return e /= a, e--, -o * (e * e * e * e - 1) + t;case 'easeOutStrong':
            return o * (-Math.pow(2, -10 * e / a) + 1) + t;case 'easeOut':case 'mcsEaseOut':default:
            var i = (e /= a) * e,
                r = i * e;return t + o * (.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e);}
      }e._mTween || (e._mTween = { top: {}, left: {} });var f,
          h,
          r = r || {},
          m = r.onStart || function () {},
          p = r.onUpdate || function () {},
          g = r.onComplete || function () {},
          v = K(),
          x = 0,
          _ = e.offsetTop,
          w = e.style,
          S = e._mTween[t];'left' === t && (_ = e.offsetLeft);var b = o - _;S.stop = 0, 'none' !== i && d(), c();
    },
        K = function () {
      return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : new Date().getTime();
    },
        Z = function () {
      var e = this;e._mTween || (e._mTween = { top: {}, left: {} });for (var t = ['top', 'left'], o = 0; o < t.length; o++) {
        var a = t[o];e._mTween[a].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[a].id) : clearTimeout(e._mTween[a].id), e._mTween[a].id = null, e._mTween[a].stop = 1);
      }
    },
        $ = function (e, t) {
      try {
        delete e[t];
      } catch (o) {
        e[t] = null;
      }
    },
        ee = function (e) {
      return !(e.which && 1 !== e.which);
    },
        te = function (e) {
      var t = e.originalEvent.pointerType;return !(t && 'touch' !== t && 2 !== t);
    },
        oe = function (e) {
      return !isNaN(parseFloat(e)) && isFinite(e);
    },
        ae = function (e) {
      var t = e.parents('.mCSB_container');return [e.offset().top - t.offset().top, e.offset().left - t.offset().left];
    },
        ne = function () {
      function e() {
        var e = ['webkit', 'moz', 'ms', 'o'];if ('hidden' in document) return 'hidden';for (var t = 0; t < e.length; t++) if (e[t] + 'Hidden' in document) return e[t] + 'Hidden';return null;
      }var t = e();return t ? document[t] : !1;
    };e.fn[o] = function (t) {
      return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : 'object' != typeof t && t ? void e.error('Method ' + t + ' does not exist') : u.init.apply(this, arguments);
    }, e[o] = function (t) {
      return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : 'object' != typeof t && t ? void e.error('Method ' + t + ' does not exist') : u.init.apply(this, arguments);
    }, e[o].defaults = i, window[o] = !0, e(window).bind('load', function () {
      e(n)[o](), e.extend(e.expr[':'], { mcsInView: e.expr[':'].mcsInView || function (t) {
          var o,
              a,
              n = e(t),
              i = n.parents('.mCSB_container');if (i.length) return o = i.parent(), a = [i[0].offsetTop, i[0].offsetLeft], a[0] + ae(n)[0] >= 0 && a[0] + ae(n)[0] < o.height() - n.outerHeight(!1) && a[1] + ae(n)[1] >= 0 && a[1] + ae(n)[1] < o.width() - n.outerWidth(!1);
        }, mcsInSight: e.expr[':'].mcsInSight || function (t, o, a) {
          var n,
              i,
              r,
              l,
              s = e(t),
              c = s.parents('.mCSB_container'),
              d = 'exact' === a[3] ? [[1, 0], [1, 0]] : [[.9, .1], [.6, .4]];if (c.length) return n = [s.outerHeight(!1), s.outerWidth(!1)], r = [c[0].offsetTop + ae(s)[0], c[0].offsetLeft + ae(s)[1]], i = [c.parent()[0].offsetHeight, c.parent()[0].offsetWidth], l = [n[0] < i[0] ? d[0] : d[1], n[1] < i[1] ? d[0] : d[1]], r[0] - i[0] * l[0][0] < 0 && r[0] + n[0] - i[0] * l[0][1] >= 0 && r[1] - i[1] * l[1][0] < 0 && r[1] + n[1] - i[1] * l[1][1] >= 0;
        }, mcsOverflow: e.expr[':'].mcsOverflow || function (t) {
          var o = e(t).data(a);if (o) return o.overflowed[0] || o.overflowed[1];
        } });
    });
  });
});
//# sourceMappingURL=jquery.mCustomScrollbar.min.js.map

/*
 * jQuery mmenu v5.7.8
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-NC-4.0
 * http://creativecommons.org/licenses/by-nc/4.0/
 */
!function (e) {
  function n() {
    e[t].glbl || (r = { $wndw: e(window), $docu: e(document), $html: e('html'), $body: e('body') }, s = {}, a = {}, o = {}, e.each([s, a, o], function (e, n) {
      n.add = function (e) {
        e = e.split(' ');for (var t = 0, i = e.length; t < i; t++) n[e[t]] = n.mm(e[t]);
      };
    }), s.mm = function (e) {
      return 'mm-' + e;
    }, s.add('wrapper menu panels panel nopanel current highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen'), s.umm = function (e) {
      return 'mm-' == e.slice(0, 3) && (e = e.slice(3)), e;
    }, a.mm = function (e) {
      return 'mm-' + e;
    }, a.add('parent child'), o.mm = function (e) {
      return e + '.mm';
    }, o.add('transitionend webkitTransitionEnd click scroll keydown mousedown mouseup touchstart touchmove touchend orientationchange'), e[t]._c = s, e[t]._d = a, e[t]._e = o, e[t].glbl = r);
  }var t = 'mmenu',
      i = '5.7.8';if (!(e[t] && e[t].version > i)) {
    e[t] = function (e, n, t) {
      this.$menu = e, this._api = ['bind', 'getInstance', 'update', 'initPanels', 'openPanel', 'closePanel', 'closeAllPanels', 'setSelected'], this.opts = n, this.conf = t, this.vars = {}, this.cbck = {}, 'function' == typeof this.___deprecated && this.___deprecated(), this._initMenu(), this._initAnchors();var i = this.$pnls.children();return this._initAddons(), this.initPanels(i), 'function' == typeof this.___debug && this.___debug(), this;
    }, e[t].version = i, e[t].addons = {}, e[t].uniqueId = 0, e[t].defaults = { extensions: [], initMenu: function () {}, initPanels: function () {}, navbar: { add: !0, title: 'Menu', titleLink: 'panel' }, onClick: { setSelected: !0 }, slidingSubmenus: !0 }, e[t].configuration = { classNames: { divider: 'Divider', inset: 'Inset', panel: 'Panel', selected: 'Selected', spacer: 'Spacer', vertical: 'Vertical' }, clone: !1, openingInterval: 25, panelNodetype: 'ul, ol, div', transitionDuration: 400 }, e[t].prototype = { init: function (e) {
        this.initPanels(e);
      }, getInstance: function () {
        return this;
      }, update: function () {
        this.trigger('update');
      }, initPanels: function (e) {
        e = e.not('.' + s.nopanel), e = this._initPanels(e), this.opts.initPanels.call(this, e), this.trigger('initPanels', e), this.trigger('update');
      }, openPanel: function (n) {
        var i = n.parent(),
            a = this;if (i.hasClass(s.vertical)) {
          var o = i.parents('.' + s.subopened);if (o.length) return void this.openPanel(o.first());i.addClass(s.opened), this.trigger('openPanel', n), this.trigger('openingPanel', n), this.trigger('openedPanel', n);
        } else {
          if (n.hasClass(s.current)) return;var r = this.$pnls.children('.' + s.panel),
              l = r.filter('.' + s.current);r.removeClass(s.highest).removeClass(s.current).not(n).not(l).not('.' + s.vertical).addClass(s.hidden), e[t].support.csstransitions || l.addClass(s.hidden), n.hasClass(s.opened) ? n.nextAll('.' + s.opened).addClass(s.highest).removeClass(s.opened).removeClass(s.subopened) : (n.addClass(s.highest), l.addClass(s.subopened)), n.removeClass(s.hidden).addClass(s.current), a.trigger('openPanel', n), setTimeout(function () {
            n.removeClass(s.subopened).addClass(s.opened), a.trigger('openingPanel', n), a.__transitionend(n, function () {
              a.trigger('openedPanel', n);
            }, a.conf.transitionDuration);
          }, this.conf.openingInterval);
        }
      }, closePanel: function (e) {
        var n = e.parent();n.hasClass(s.vertical) && (n.removeClass(s.opened), this.trigger('closePanel', e), this.trigger('closingPanel', e), this.trigger('closedPanel', e));
      }, closeAllPanels: function () {
        this.$menu.find('.' + s.listview).children().removeClass(s.selected).filter('.' + s.vertical).removeClass(s.opened);var e = this.$pnls.children('.' + s.panel),
            n = e.first();this.$pnls.children('.' + s.panel).not(n).removeClass(s.subopened).removeClass(s.opened).removeClass(s.current).removeClass(s.highest).addClass(s.hidden), this.openPanel(n);
      }, togglePanel: function (e) {
        var n = e.parent();n.hasClass(s.vertical) && this[n.hasClass(s.opened) ? 'closePanel' : 'openPanel'](e);
      }, setSelected: function (e) {
        this.$menu.find('.' + s.listview).children('.' + s.selected).removeClass(s.selected), e.addClass(s.selected), this.trigger('setSelected', e);
      }, bind: function (e, n) {
        e = 'init' == e ? 'initPanels' : e, this.cbck[e] = this.cbck[e] || [], this.cbck[e].push(n);
      }, trigger: function () {
        var e = this,
            n = Array.prototype.slice.call(arguments),
            t = n.shift();if (t = 'init' == t ? 'initPanels' : t, this.cbck[t]) for (var i = 0, s = this.cbck[t].length; i < s; i++) this.cbck[t][i].apply(e, n);
      }, _initMenu: function () {
        this.conf.clone && (this.$orig = this.$menu, this.$menu = this.$orig.clone(!0), this.$menu.add(this.$menu.find('[id]')).filter('[id]').each(function () {
          e(this).attr('id', s.mm(e(this).attr('id')));
        })), this.opts.initMenu.call(this, this.$menu, this.$orig), this.$menu.attr('id', this.$menu.attr('id') || this.__getUniqueId()), this.$pnls = e('<div class="' + s.panels + '" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu), this.$menu.parent().addClass(s.wrapper);var n = [s.menu];this.opts.slidingSubmenus || n.push(s.vertical), this.opts.extensions = this.opts.extensions.length ? 'mm-' + this.opts.extensions.join(' mm-') : '', this.opts.extensions && n.push(this.opts.extensions), this.$menu.addClass(n.join(' ')), this.trigger('_initMenu');
      }, _initPanels: function (n) {
        var i = this,
            o = this.__findAddBack(n, 'ul, ol');this.__refactorClass(o, this.conf.classNames.inset, 'inset').addClass(s.nolistview + ' ' + s.nopanel), o.not('.' + s.nolistview).addClass(s.listview);var r = this.__findAddBack(n, '.' + s.listview).children();this.__refactorClass(r, this.conf.classNames.selected, 'selected'), this.__refactorClass(r, this.conf.classNames.divider, 'divider'), this.__refactorClass(r, this.conf.classNames.spacer, 'spacer'), this.__refactorClass(this.__findAddBack(n, '.' + this.conf.classNames.panel), this.conf.classNames.panel, 'panel');var l = e(),
            d = n.add(n.find('.' + s.panel)).add(this.__findAddBack(n, '.' + s.listview).children().children(this.conf.panelNodetype)).not('.' + s.nopanel);this.__refactorClass(d, this.conf.classNames.vertical, 'vertical'), this.opts.slidingSubmenus || d.addClass(s.vertical), d.each(function () {
          var n = e(this),
              t = n;n.is('ul, ol') ? (n.wrap('<div class="' + s.panel + '" />'), t = n.parent()) : t.addClass(s.panel);var a = n.attr('id');n.removeAttr('id'), t.attr('id', a || i.__getUniqueId()), n.hasClass(s.vertical) && (n.removeClass(i.conf.classNames.vertical), t.add(t.parent()).addClass(s.vertical)), l = l.add(t);
        });var c = e('.' + s.panel, this.$menu);l.each(function (n) {
          var o,
              r,
              l = e(this),
              d = l.parent(),
              c = d.children('a, span').first();if (d.is('.' + s.panels) || (d.data(a.child, l), l.data(a.parent, d)), d.children('.' + s.next).length || d.parent().is('.' + s.listview) && (o = l.attr('id'), r = e('<a class="' + s.next + '" href="#' + o + '" data-target="#' + o + '" />').insertBefore(c), c.is('span') && r.addClass(s.fullsubopen)), !l.children('.' + s.navbar).length && !d.hasClass(s.vertical)) {
            d.parent().is('.' + s.listview) ? d = d.closest('.' + s.panel) : (c = d.closest('.' + s.panel).find('a[href="#' + l.attr('id') + '"]').first(), d = c.closest('.' + s.panel));var h = !1,
                u = e('<div class="' + s.navbar + '" />');if (i.opts.navbar.add && l.addClass(s.hasnavbar), d.length) {
              switch (o = d.attr('id'), i.opts.navbar.titleLink) {case 'anchor':
                  h = c.attr('href');break;case 'panel':case 'parent':
                  h = '#' + o;break;default:
                  h = !1;}u.append('<a class="' + s.btn + ' ' + s.prev + '" href="#' + o + '" data-target="#' + o + '" />').append(e('<a class="' + s.title + '"' + (h ? ' href="' + h + '"' : '') + ' />').text(c.text())).prependTo(l);
            } else i.opts.navbar.title && u.append('<a class="' + s.title + '">' + e[t].i18n(i.opts.navbar.title) + '</a>').prependTo(l);
          }
        });var h = this.__findAddBack(n, '.' + s.listview).children('.' + s.selected).removeClass(s.selected).last().addClass(s.selected);h.add(h.parentsUntil('.' + s.menu, 'li')).filter('.' + s.vertical).addClass(s.opened).end().each(function () {
          e(this).parentsUntil('.' + s.menu, '.' + s.panel).not('.' + s.vertical).first().addClass(s.opened).parentsUntil('.' + s.menu, '.' + s.panel).not('.' + s.vertical).first().addClass(s.opened).addClass(s.subopened);
        }), h.children('.' + s.panel).not('.' + s.vertical).addClass(s.opened).parentsUntil('.' + s.menu, '.' + s.panel).not('.' + s.vertical).first().addClass(s.opened).addClass(s.subopened);var u = c.filter('.' + s.opened);return u.length || (u = l.first()), u.addClass(s.opened).last().addClass(s.current), l.not('.' + s.vertical).not(u.last()).addClass(s.hidden).end().filter(function () {
          return !e(this).parent().hasClass(s.panels);
        }).appendTo(this.$pnls), this.trigger('_initPanels', l), l;
      }, _initAnchors: function () {
        var n = this;r.$body.on(o.click + '-oncanvas', 'a[href]', function (i) {
          var a = e(this),
              o = !1,
              r = n.$menu.find(a).length;for (var l in e[t].addons) if (e[t].addons[l].clickAnchor.call(n, a, r)) {
            o = !0;break;
          }var d = a.attr('href');if (!o && r && d.length > 1 && '#' == d.slice(0, 1)) try {
            var c = e(d, n.$menu);c.is('.' + s.panel) && (o = !0, n[a.parent().hasClass(s.vertical) ? 'togglePanel' : 'openPanel'](c));
          } catch (h) {}if (o && i.preventDefault(), !o && r && a.is('.' + s.listview + ' > li > a') && !a.is('[rel="external"]') && !a.is('[target="_blank"]')) {
            n.__valueOrFn(n.opts.onClick.setSelected, a) && n.setSelected(e(i.target).parent());var u = n.__valueOrFn(n.opts.onClick.preventDefault, a, '#' == d.slice(0, 1));u && i.preventDefault(), n.__valueOrFn(n.opts.onClick.close, a, u) && n.close();
          }
        }), this.trigger('_initAnchors');
      }, _initAddons: function () {
        var n;for (n in e[t].addons) e[t].addons[n].add.call(this), e[t].addons[n].add = function () {};for (n in e[t].addons) e[t].addons[n].setup.call(this);this.trigger('_initAddons');
      }, _getOriginalMenuId: function () {
        var e = this.$menu.attr('id');return e && e.length && this.conf.clone && (e = s.umm(e)), e;
      }, __api: function () {
        var n = this,
            t = {};return e.each(this._api, function (e) {
          var i = this;t[i] = function () {
            var e = n[i].apply(n, arguments);return 'undefined' == typeof e ? t : e;
          };
        }), t;
      }, __valueOrFn: function (e, n, t) {
        return 'function' == typeof e ? e.call(n[0]) : 'undefined' == typeof e && 'undefined' != typeof t ? t : e;
      }, __refactorClass: function (e, n, t) {
        return e.filter('.' + n).removeClass(n).addClass(s[t]);
      }, __findAddBack: function (e, n) {
        return e.find(n).add(e.filter(n));
      }, __filterListItems: function (e) {
        return e.not('.' + s.divider).not('.' + s.hidden);
      }, __transitionend: function (n, t, i) {
        var s = !1,
            a = function (i) {
          if ('undefined' != typeof i) {
            if (!e(i.target).is(n)) return !1;n.unbind(o.transitionend), n.unbind(o.webkitTransitionEnd);
          }s || t.call(n[0]), s = !0;
        };n.on(o.transitionend, a), n.on(o.webkitTransitionEnd, a), setTimeout(a, 1.1 * i);
      }, __getUniqueId: function () {
        return s.mm(e[t].uniqueId++);
      } }, e.fn[t] = function (i, s) {
      n(), i = e.extend(!0, {}, e[t].defaults, i), s = e.extend(!0, {}, e[t].configuration, s);var a = e();return this.each(function () {
        var n = e(this);if (!n.data(t)) {
          var o = new e[t](n, i, s);o.$menu.data(t, o.__api()), a = a.add(o.$menu);
        }
      }), a;
    }, e[t].i18n = function () {
      var n = {};return function (t) {
        switch (typeof t) {case 'object':
            return e.extend(n, t), n;case 'string':
            return n[t] || t;case 'undefined':default:
            return n;}
      };
    }(), e[t].support = { touch: 'ontouchstart' in window || navigator.msMaxTouchPoints || !1, csstransitions: function () {
        if ('undefined' != typeof Modernizr && 'undefined' != typeof Modernizr.csstransitions) return Modernizr.csstransitions;var e = document.body || document.documentElement,
            n = e.style,
            t = 'transition';if ('string' == typeof n[t]) return !0;var i = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];t = t.charAt(0).toUpperCase() + t.substr(1);for (var s = 0; s < i.length; s++) if ('string' == typeof n[i[s] + t]) return !0;return !1;
      }(), csstransforms: function () {
        return 'undefined' == typeof Modernizr || 'undefined' == typeof Modernizr.csstransforms || Modernizr.csstransforms;
      }(), csstransforms3d: function () {
        return 'undefined' == typeof Modernizr || 'undefined' == typeof Modernizr.csstransforms3d || Modernizr.csstransforms3d;
      }() };var s, a, o, r;
  }
}(jQuery), /*	
           * jQuery mmenu offCanvas add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'offCanvas';e[n].addons[t] = { setup: function () {
      if (this.opts[t]) {
        var s = this.opts[t],
            a = this.conf[t];o = e[n].glbl, this._api = e.merge(this._api, ['open', 'close', 'setPage']), 'top' != s.position && 'bottom' != s.position || (s.zposition = 'front'), 'string' != typeof a.pageSelector && (a.pageSelector = '> ' + a.pageNodetype), o.$allMenus = (o.$allMenus || e()).add(this.$menu), this.vars.opened = !1;var r = [i.offcanvas];'left' != s.position && r.push(i.mm(s.position)), 'back' != s.zposition && r.push(i.mm(s.zposition)), this.$menu.addClass(r.join(' ')).parent().removeClass(i.wrapper), e[n].support.csstransforms || this.$menu.addClass(i['no-csstransforms']), e[n].support.csstransforms3d || this.$menu.addClass(i['no-csstransforms3d']), this.setPage(o.$page), this._initBlocker(), this['_initWindow_' + t](), this.$menu[a.menuInjectMethod + 'To'](a.menuWrapperSelector);var l = window.location.hash;if (l) {
          var d = this._getOriginalMenuId();d && d == l.slice(1) && this.open();
        }
      }
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('offcanvas slideout blocking modal background opening blocker page no-csstransforms3d'), s.add('style'), a.add('resize');
    }, clickAnchor: function (e, n) {
      var s = this;if (this.opts[t]) {
        var a = this._getOriginalMenuId();if (a && e.is('[href="#' + a + '"]')) {
          if (n) return !0;var r = e.closest('.' + i.menu);if (r.length) {
            var l = r.data('mmenu');if (l && l.close) return l.close(), s.__transitionend(r, function () {
              s.open();
            }, s.conf.transitionDuration), !0;
          }return this.open(), !0;
        }if (o.$page) return a = o.$page.first().attr('id'), a && e.is('[href="#' + a + '"]') ? (this.close(), !0) : void 0;
      }
    } }, e[n].defaults[t] = { position: 'left', zposition: 'back', blockUI: !0, moveBackground: !0 }, e[n].configuration[t] = { pageNodetype: 'div', pageSelector: null, noPageSelector: [], wrapPageIfNeeded: !0, menuWrapperSelector: 'body', menuInjectMethod: 'prepend' }, e[n].prototype.open = function () {
    if (!this.vars.opened) {
      var e = this;this._openSetup(), setTimeout(function () {
        e._openFinish();
      }, this.conf.openingInterval), this.trigger('open');
    }
  }, e[n].prototype._openSetup = function () {
    var n = this,
        r = this.opts[t];this.closeAllOthers(), o.$page.each(function () {
      e(this).data(s.style, e(this).attr('style') || '');
    }), o.$wndw.trigger(a.resize + '-' + t, [!0]);var l = [i.opened];r.blockUI && l.push(i.blocking), 'modal' == r.blockUI && l.push(i.modal), r.moveBackground && l.push(i.background), 'left' != r.position && l.push(i.mm(this.opts[t].position)), 'back' != r.zposition && l.push(i.mm(this.opts[t].zposition)), this.opts.extensions && l.push(this.opts.extensions), o.$html.addClass(l.join(' ')), setTimeout(function () {
      n.vars.opened = !0;
    }, this.conf.openingInterval), this.$menu.addClass(i.current + ' ' + i.opened);
  }, e[n].prototype._openFinish = function () {
    var e = this;this.__transitionend(o.$page.first(), function () {
      e.trigger('opened');
    }, this.conf.transitionDuration), o.$html.addClass(i.opening), this.trigger('opening');
  }, e[n].prototype.close = function () {
    if (this.vars.opened) {
      var n = this;this.__transitionend(o.$page.first(), function () {
        n.$menu.removeClass(i.current + ' ' + i.opened);var a = [i.opened, i.blocking, i.modal, i.background, i.mm(n.opts[t].position), i.mm(n.opts[t].zposition)];n.opts.extensions && a.push(n.opts.extensions), o.$html.removeClass(a.join(' ')), o.$page.each(function () {
          e(this).attr('style', e(this).data(s.style));
        }), n.vars.opened = !1, n.trigger('closed');
      }, this.conf.transitionDuration), o.$html.removeClass(i.opening), this.trigger('close'), this.trigger('closing');
    }
  }, e[n].prototype.closeAllOthers = function () {
    o.$allMenus.not(this.$menu).each(function () {
      var t = e(this).data(n);t && t.close && t.close();
    });
  }, e[n].prototype.setPage = function (n) {
    var s = this,
        a = this.conf[t];n && n.length || (n = o.$body.find(a.pageSelector), a.noPageSelector.length && (n = n.not(a.noPageSelector.join(', '))), n.length > 1 && a.wrapPageIfNeeded && (n = n.wrapAll('<' + this.conf[t].pageNodetype + ' />').parent())), n.each(function () {
      e(this).attr('id', e(this).attr('id') || s.__getUniqueId());
    }), n.addClass(i.page + ' ' + i.slideout), o.$page = n, this.trigger('setPage', n);
  }, e[n].prototype['_initWindow_' + t] = function () {
    o.$wndw.off(a.keydown + '-' + t).on(a.keydown + '-' + t, function (e) {
      if (o.$html.hasClass(i.opened) && 9 == e.keyCode) return e.preventDefault(), !1;
    });var e = 0;o.$wndw.off(a.resize + '-' + t).on(a.resize + '-' + t, function (n, t) {
      if (1 == o.$page.length && (t || o.$html.hasClass(i.opened))) {
        var s = o.$wndw.height();(t || s != e) && (e = s, o.$page.css('minHeight', s));
      }
    });
  }, e[n].prototype._initBlocker = function () {
    var n = this;this.opts[t].blockUI && (o.$blck || (o.$blck = e('<div id="' + i.blocker + '" class="' + i.slideout + '" />')), o.$blck.appendTo(o.$body).off(a.touchstart + '-' + t + ' ' + a.touchmove + '-' + t).on(a.touchstart + '-' + t + ' ' + a.touchmove + '-' + t, function (e) {
      e.preventDefault(), e.stopPropagation(), o.$blck.trigger(a.mousedown + '-' + t);
    }).off(a.mousedown + '-' + t).on(a.mousedown + '-' + t, function (e) {
      e.preventDefault(), o.$html.hasClass(i.modal) || (n.closeAllOthers(), n.close());
    }));
  };var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu scrollBugFix add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'scrollBugFix';e[n].addons[t] = { setup: function () {
      var s = this,
          r = this.opts[t];this.conf[t];if (o = e[n].glbl, e[n].support.touch && this.opts.offCanvas && this.opts.offCanvas.blockUI && ('boolean' == typeof r && (r = { fix: r }), 'object' != typeof r && (r = {}), r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r), r.fix)) {
        var l = this.$menu.attr('id'),
            d = !1;this.bind('opening', function () {
          this.$pnls.children('.' + i.current).scrollTop(0);
        }), o.$docu.on(a.touchmove, function (e) {
          s.vars.opened && e.preventDefault();
        }), o.$body.on(a.touchstart, '#' + l + '> .' + i.panels + '> .' + i.current, function (e) {
          s.vars.opened && (d || (d = !0, 0 === e.currentTarget.scrollTop ? e.currentTarget.scrollTop = 1 : e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight && (e.currentTarget.scrollTop -= 1), d = !1));
        }).on(a.touchmove, '#' + l + '> .' + i.panels + '> .' + i.current, function (n) {
          s.vars.opened && e(this)[0].scrollHeight > e(this).innerHeight() && n.stopPropagation();
        }), o.$wndw.on(a.orientationchange, function () {
          s.$pnls.children('.' + i.current).scrollTop(0).css({ '-webkit-overflow-scrolling': 'auto' }).css({ '-webkit-overflow-scrolling': 'touch' });
        });
      }
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e;
    }, clickAnchor: function (e, n) {} }, e[n].defaults[t] = { fix: !0 };var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu autoHeight add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'autoHeight';e[n].addons[t] = { setup: function () {
      if (this.opts.offCanvas) {
        var s = this.opts[t];this.conf[t];if (o = e[n].glbl, 'boolean' == typeof s && s && (s = { height: 'auto' }), 'string' == typeof s && (s = { height: s }), 'object' != typeof s && (s = {}), s = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], s), 'auto' == s.height || 'highest' == s.height) {
          this.$menu.addClass(i.autoheight);var a = function (n) {
            if (this.vars.opened) {
              var t = parseInt(this.$pnls.css('top'), 10) || 0,
                  a = parseInt(this.$pnls.css('bottom'), 10) || 0,
                  o = 0;this.$menu.addClass(i.measureheight), 'auto' == s.height ? (n = n || this.$pnls.children('.' + i.current), n.is('.' + i.vertical) && (n = n.parents('.' + i.panel).not('.' + i.vertical).first()), o = n.outerHeight()) : 'highest' == s.height && this.$pnls.children().each(function () {
                var n = e(this);n.is('.' + i.vertical) && (n = n.parents('.' + i.panel).not('.' + i.vertical).first()), o = Math.max(o, n.outerHeight());
              }), this.$menu.height(o + t + a).removeClass(i.measureheight);
            }
          };this.bind('opening', a), 'highest' == s.height && this.bind('initPanels', a), 'auto' == s.height && (this.bind('update', a), this.bind('openPanel', a), this.bind('closePanel', a));
        }
      }
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('autoheight measureheight'), a.add('resize');
    }, clickAnchor: function (e, n) {} }, e[n].defaults[t] = { height: 'default' };var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu backButton add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'backButton';e[n].addons[t] = { setup: function () {
      if (this.opts.offCanvas) {
        var s = this,
            a = this.opts[t];this.conf[t];if (o = e[n].glbl, 'boolean' == typeof a && (a = { close: a }), 'object' != typeof a && (a = {}), a = e.extend(!0, {}, e[n].defaults[t], a), a.close) {
          var r = '#' + s.$menu.attr('id');this.bind('opened', function (e) {
            location.hash != r && history.pushState(null, document.title, r);
          }), e(window).on('popstate', function (e) {
            o.$html.hasClass(i.opened) ? (e.stopPropagation(), s.close()) : location.hash == r && (e.stopPropagation(), s.open());
          });
        }
      }
    }, add: function () {
      return window.history && window.history.pushState ? (i = e[n]._c, s = e[n]._d, void (a = e[n]._e)) : void (e[n].addons[t].setup = function () {});
    }, clickAnchor: function (e, n) {} }, e[n].defaults[t] = { close: !1 };var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu columns add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'columns';e[n].addons[t] = { setup: function () {
      var s = this.opts[t];this.conf[t];if (o = e[n].glbl, 'boolean' == typeof s && (s = { add: s }), 'number' == typeof s && (s = { add: !0, visible: s }), 'object' != typeof s && (s = {}), 'number' == typeof s.visible && (s.visible = { min: s.visible, max: s.visible }), s = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], s), s.add) {
        s.visible.min = Math.max(1, Math.min(6, s.visible.min)), s.visible.max = Math.max(s.visible.min, Math.min(6, s.visible.max)), this.$menu.addClass(i.columns);for (var a = this.opts.offCanvas ? this.$menu.add(o.$html) : this.$menu, r = [], l = 0; l <= s.visible.max; l++) r.push(i.columns + '-' + l);r = r.join(' ');var d = function (e) {
          u.call(this, this.$pnls.children('.' + i.current));
        },
            c = function () {
          var e = this.$pnls.children('.' + i.panel).filter('.' + i.opened).length;e = Math.min(s.visible.max, Math.max(s.visible.min, e)), a.removeClass(r).addClass(i.columns + '-' + e);
        },
            h = function () {
          this.opts.offCanvas && o.$html.removeClass(r);
        },
            u = function (n) {
          this.$pnls.children('.' + i.panel).removeClass(r).filter('.' + i.subopened).removeClass(i.hidden).add(n).slice(-s.visible.max).each(function (n) {
            e(this).addClass(i.columns + '-' + n);
          });
        };this.bind('open', c), this.bind('close', h), this.bind('initPanels', d), this.bind('openPanel', u), this.bind('openingPanel', c), this.bind('openedPanel', c), this.opts.offCanvas || c.call(this);
      }
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('columns');
    }, clickAnchor: function (n, s) {
      if (!this.opts[t].add) return !1;if (s) {
        var a = n.attr('href');if (a.length > 1 && '#' == a.slice(0, 1)) try {
          var o = e(a, this.$menu);if (o.is('.' + i.panel)) for (var r = parseInt(n.closest('.' + i.panel).attr('class').split(i.columns + '-')[1].split(' ')[0], 10) + 1; r !== !1;) {
            var l = this.$pnls.children('.' + i.columns + '-' + r);if (!l.length) {
              r = !1;break;
            }r++, l.removeClass(i.subopened).removeClass(i.opened).removeClass(i.current).removeClass(i.highest).addClass(i.hidden);
          }
        } catch (d) {}
      }
    } }, e[n].defaults[t] = { add: !1, visible: { min: 1, max: 3 } };var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu counters add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'counters';e[n].addons[t] = { setup: function () {
      var a = this,
          r = this.opts[t];this.conf[t];o = e[n].glbl, 'boolean' == typeof r && (r = { add: r, update: r }), 'object' != typeof r && (r = {}), r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r), this.bind('initPanels', function (n) {
        this.__refactorClass(e('em', n), this.conf.classNames[t].counter, 'counter');
      }), r.add && this.bind('initPanels', function (n) {
        var t;switch (r.addTo) {case 'panels':
            t = n;break;default:
            t = n.filter(r.addTo);}t.each(function () {
          var n = e(this).data(s.parent);n && (n.children('em.' + i.counter).length || n.prepend(e('<em class="' + i.counter + '" />')));
        });
      }), r.update && this.bind('update', function () {
        this.$pnls.find('.' + i.panel).each(function () {
          var n = e(this),
              t = n.data(s.parent);if (t) {
            var o = t.children('em.' + i.counter);o.length && (n = n.children('.' + i.listview), n.length && o.html(a.__filterListItems(n.children()).length));
          }
        });
      });
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('counter search noresultsmsg');
    }, clickAnchor: function (e, n) {} }, e[n].defaults[t] = { add: !1, addTo: 'panels', update: !1 }, e[n].configuration.classNames[t] = { counter: 'Counter' };var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu dividers add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'dividers';e[n].addons[t] = { setup: function () {
      var s = this,
          r = this.opts[t];this.conf[t];if (o = e[n].glbl, 'boolean' == typeof r && (r = { add: r, fixed: r }), 'object' != typeof r && (r = {}), r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r), this.bind('initPanels', function (n) {
        this.__refactorClass(e('li', this.$menu), this.conf.classNames[t].collapsed, 'collapsed');
      }), r.add && this.bind('initPanels', function (n) {
        var t;switch (r.addTo) {case 'panels':
            t = n;break;default:
            t = n.filter(r.addTo);}e('.' + i.divider, t).remove(), t.find('.' + i.listview).not('.' + i.vertical).each(function () {
          var n = '';s.__filterListItems(e(this).children()).each(function () {
            var t = e.trim(e(this).children('a, span').text()).slice(0, 1).toLowerCase();t != n && t.length && (n = t, e('<li class="' + i.divider + '">' + t + '</li>').insertBefore(this));
          });
        });
      }), r.collapse && this.bind('initPanels', function (n) {
        e('.' + i.divider, n).each(function () {
          var n = e(this),
              t = n.nextUntil('.' + i.divider, '.' + i.collapsed);t.length && (n.children('.' + i.subopen).length || (n.wrapInner('<span />'), n.prepend('<a href="#" class="' + i.subopen + ' ' + i.fullsubopen + '" />')));
        });
      }), r.fixed) {
        var l = function (n) {
          n = n || this.$pnls.children('.' + i.current);var t = n.find('.' + i.divider).not('.' + i.hidden);if (t.length) {
            this.$menu.addClass(i.hasdividers);var s = n.scrollTop() || 0,
                a = '';n.is(':visible') && n.find('.' + i.divider).not('.' + i.hidden).each(function () {
              e(this).position().top + s < s + 1 && (a = e(this).text());
            }), this.$fixeddivider.text(a);
          } else this.$menu.removeClass(i.hasdividers);
        };this.$fixeddivider = e('<ul class="' + i.listview + ' ' + i.fixeddivider + '"><li class="' + i.divider + '"></li></ul>').prependTo(this.$pnls).children(), this.bind('openPanel', l), this.bind('update', l), this.bind('initPanels', function (n) {
          n.off(a.scroll + '-dividers ' + a.touchmove + '-dividers').on(a.scroll + '-dividers ' + a.touchmove + '-dividers', function (n) {
            l.call(s, e(this));
          });
        });
      }
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('collapsed uncollapsed fixeddivider hasdividers'), a.add('scroll');
    }, clickAnchor: function (e, n) {
      if (this.opts[t].collapse && n) {
        var s = e.parent();if (s.is('.' + i.divider)) {
          var a = s.nextUntil('.' + i.divider, '.' + i.collapsed);return s.toggleClass(i.opened), a[s.hasClass(i.opened) ? 'addClass' : 'removeClass'](i.uncollapsed), !0;
        }
      }return !1;
    } }, e[n].defaults[t] = { add: !1, addTo: 'panels', fixed: !1, collapse: !1 }, e[n].configuration.classNames[t] = { collapsed: 'Collapsed' };var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu drag add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  function n(e, n, t) {
    return e < n && (e = n), e > t && (e = t), e;
  }function t(t, i, s) {
    var r,
        l,
        d,
        c,
        h,
        u = this,
        f = {},
        p = 0,
        v = !1,
        m = !1,
        g = 0,
        b = 0;switch (this.opts.offCanvas.position) {case 'left':case 'right':
        f.events = 'panleft panright', f.typeLower = 'x', f.typeUpper = 'X', m = 'width';break;case 'top':case 'bottom':
        f.events = 'panup pandown', f.typeLower = 'y', f.typeUpper = 'Y', m = 'height';}switch (this.opts.offCanvas.position) {case 'right':case 'bottom':
        f.negative = !0, c = function (e) {
          e >= s.$wndw[m]() - t.maxStartPos && (p = 1);
        };break;default:
        f.negative = !1, c = function (e) {
          e <= t.maxStartPos && (p = 1);
        };}switch (this.opts.offCanvas.position) {case 'left':
        f.open_dir = 'right', f.close_dir = 'left';break;case 'right':
        f.open_dir = 'left', f.close_dir = 'right';break;case 'top':
        f.open_dir = 'down', f.close_dir = 'up';break;case 'bottom':
        f.open_dir = 'up', f.close_dir = 'down';}switch (this.opts.offCanvas.zposition) {case 'front':
        h = function () {
          return this.$menu;
        };break;default:
        h = function () {
          return e('.' + o.slideout);
        };}var _ = this.__valueOrFn(t.node, this.$menu, s.$page);'string' == typeof _ && (_ = e(_));var C = new Hammer(_[0], this.opts[a].vendors.hammer);C.on('panstart', function (e) {
      c(e.center[f.typeLower]), s.$slideOutNodes = h(), v = f.open_dir;
    }).on(f.events + ' panend', function (e) {
      p > 0 && e.preventDefault();
    }).on(f.events, function (e) {
      if (r = e['delta' + f.typeUpper], f.negative && (r = -r), r != g && (v = r >= g ? f.open_dir : f.close_dir), g = r, g > t.threshold && 1 == p) {
        if (s.$html.hasClass(o.opened)) return;p = 2, u._openSetup(), u.trigger('opening'), s.$html.addClass(o.dragging), b = n(s.$wndw[m]() * i[m].perc, i[m].min, i[m].max);
      }2 == p && (l = n(g, 10, b) - ('front' == u.opts.offCanvas.zposition ? b : 0), f.negative && (l = -l), d = 'translate' + f.typeUpper + '(' + l + 'px )', s.$slideOutNodes.css({ '-webkit-transform': '-webkit-' + d, transform: d }));
    }).on('panend', function (e) {
      2 == p && (s.$html.removeClass(o.dragging), s.$slideOutNodes.css('transform', ''), u[v == f.open_dir ? '_openFinish' : 'close']()), p = 0;
    });
  }function i(n, t, i, s) {
    var l = this;n.each(function () {
      var n = e(this),
          t = n.data(r.parent);if (t && (t = t.closest('.' + o.panel), t.length)) {
        var i = new Hammer(n[0], l.opts[a].vendors.hammer);i.on('panright', function (e) {
          l.openPanel(t);
        });
      }
    });
  }var s = 'mmenu',
      a = 'drag';e[s].addons[a] = { setup: function () {
      if (this.opts.offCanvas) {
        var n = this.opts[a],
            o = this.conf[a];d = e[s].glbl, 'boolean' == typeof n && (n = { menu: n, panels: n }), 'object' != typeof n && (n = {}), 'boolean' == typeof n.menu && (n.menu = { open: n.menu }), 'object' != typeof n.menu && (n.menu = {}), 'boolean' == typeof n.panels && (n.panels = { close: n.panels }), 'object' != typeof n.panels && (n.panels = {}), n = this.opts[a] = e.extend(!0, {}, e[s].defaults[a], n), n.menu.open && t.call(this, n.menu, o.menu, d), n.panels.close && this.bind('initPanels', function (e) {
          i.call(this, e, n.panels, o.panels, d);
        });
      }
    }, add: function () {
      return 'function' != typeof Hammer || Hammer.VERSION < 2 ? void (e[s].addons[a].setup = function () {}) : (o = e[s]._c, r = e[s]._d, l = e[s]._e, void o.add('dragging'));
    }, clickAnchor: function (e, n) {} }, e[s].defaults[a] = { menu: { open: !1, maxStartPos: 100, threshold: 50 }, panels: { close: !1 }, vendors: { hammer: {} } }, e[s].configuration[a] = { menu: { width: { perc: .8, min: 140, max: 440 }, height: { perc: .8, min: 140, max: 880 } }, panels: {} };var o, r, l, d;
}(jQuery), /*	
           * jQuery mmenu fixedElements add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'fixedElements';e[n].addons[t] = { setup: function () {
      if (this.opts.offCanvas) {
        var i = this.opts[t];this.conf[t];o = e[n].glbl, i = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], i);var s = function (e) {
          var n = this.conf.classNames[t].fixed;this.__refactorClass(e.find('.' + n), n, 'slideout').appendTo(o.$body);
        };s.call(this, o.$page), this.bind('setPage', s);
      }
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('fixed');
    }, clickAnchor: function (e, n) {} }, e[n].configuration.classNames[t] = { fixed: 'Fixed' };var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu dropdown add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'dropdown';e[n].addons[t] = { setup: function () {
      if (this.opts.offCanvas) {
        var r = this,
            l = this.opts[t],
            d = this.conf[t];if (o = e[n].glbl, 'boolean' == typeof l && l && (l = { drop: l }), 'object' != typeof l && (l = {}), 'string' == typeof l.position && (l.position = { of: l.position }), l = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], l), l.drop) {
          if ('string' != typeof l.position.of) {
            var c = this.$menu.attr('id');c && c.length && (this.conf.clone && (c = i.umm(c)), l.position.of = '[href="#' + c + '"]');
          }if ('string' == typeof l.position.of) {
            var h = e(l.position.of);if (h.length) {
              this.$menu.addClass(i.dropdown), l.tip && this.$menu.addClass(i.tip), l.event = l.event.split(' '), 1 == l.event.length && (l.event[1] = l.event[0]), 'hover' == l.event[0] && h.on(a.mouseenter + '-dropdown', function () {
                r.open();
              }), 'hover' == l.event[1] && this.$menu.on(a.mouseleave + '-dropdown', function () {
                r.close();
              }), this.bind('opening', function () {
                this.$menu.data(s.style, this.$menu.attr('style') || ''), o.$html.addClass(i.dropdown);
              }), this.bind('closed', function () {
                this.$menu.attr('style', this.$menu.data(s.style)), o.$html.removeClass(i.dropdown);
              });var u = function (s, a) {
                var r = a[0],
                    c = a[1],
                    u = 'x' == s ? 'scrollLeft' : 'scrollTop',
                    f = 'x' == s ? 'outerWidth' : 'outerHeight',
                    p = 'x' == s ? 'left' : 'top',
                    v = 'x' == s ? 'right' : 'bottom',
                    m = 'x' == s ? 'width' : 'height',
                    g = 'x' == s ? 'maxWidth' : 'maxHeight',
                    b = null,
                    _ = o.$wndw[u](),
                    C = h.offset()[p] -= _,
                    y = C + h[f](),
                    $ = o.$wndw[m](),
                    w = d.offset.button[s] + d.offset.viewport[s];if (l.position[s]) switch (l.position[s]) {case 'left':case 'bottom':
                    b = 'after';break;case 'right':case 'top':
                    b = 'before';}null === b && (b = C + (y - C) / 2 < $ / 2 ? 'after' : 'before');var x, k;return 'after' == b ? (x = 'x' == s ? C : y, k = $ - (x + w), r[p] = x + d.offset.button[s], r[v] = 'auto', c.push(i['x' == s ? 'tipleft' : 'tiptop'])) : (x = 'x' == s ? y : C, k = x - w, r[v] = 'calc( 100% - ' + (x - d.offset.button[s]) + 'px )', r[p] = 'auto', c.push(i['x' == s ? 'tipright' : 'tipbottom'])), r[g] = Math.min(e[n].configuration[t][m].max, k), [r, c];
              },
                  f = function (e) {
                if (this.vars.opened) {
                  this.$menu.attr('style', this.$menu.data(s.style));var n = [{}, []];n = u.call(this, 'y', n), n = u.call(this, 'x', n), this.$menu.css(n[0]), l.tip && this.$menu.removeClass(i.tipleft + ' ' + i.tipright + ' ' + i.tiptop + ' ' + i.tipbottom).addClass(n[1].join(' '));
                }
              };this.bind('opening', f), o.$wndw.on(a.resize + '-dropdown', function (e) {
                f.call(r);
              }), this.opts.offCanvas.blockUI || o.$wndw.on(a.scroll + '-dropdown', function (e) {
                f.call(r);
              });
            }
          }
        }
      }
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('dropdown tip tipleft tipright tiptop tipbottom'), a.add('mouseenter mouseleave resize scroll');
    }, clickAnchor: function (e, n) {} }, e[n].defaults[t] = { drop: !1, event: 'click', position: {}, tip: !0 }, e[n].configuration[t] = { offset: { button: { x: -10, y: 10 }, viewport: { x: 20, y: 20 } }, height: { max: 880 }, width: { max: 440 } };var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu iconPanels add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'iconPanels';e[n].addons[t] = { setup: function () {
      var s = this,
          a = this.opts[t];this.conf[t];if (o = e[n].glbl, 'boolean' == typeof a && (a = { add: a }), 'number' == typeof a && (a = { add: !0, visible: a }), 'object' != typeof a && (a = {}), a = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], a), a.visible++, a.add) {
        this.$menu.addClass(i.iconpanel);for (var r = [], l = 0; l <= a.visible; l++) r.push(i.iconpanel + '-' + l);r = r.join(' ');var d = function (n) {
          n.hasClass(i.vertical) || s.$pnls.children('.' + i.panel).removeClass(r).filter('.' + i.subopened).removeClass(i.hidden).add(n).not('.' + i.vertical).slice(-a.visible).each(function (n) {
            e(this).addClass(i.iconpanel + '-' + n);
          });
        };this.bind('openPanel', d), this.bind('initPanels', function (n) {
          d.call(s, s.$pnls.children('.' + i.current)), n.not('.' + i.vertical).each(function () {
            e(this).children('.' + i.subblocker).length || e(this).prepend('<a href="#' + e(this).closest('.' + i.panel).attr('id') + '" class="' + i.subblocker + '" />');
          });
        });
      }
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('iconpanel subblocker');
    }, clickAnchor: function (e, n) {} }, e[n].defaults[t] = { add: !1, visible: 3 };var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu keyboardNavigation add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  function n(n, t) {
    n || (n = this.$pnls.children('.' + a.current));var i = e();'default' == t && (i = n.children('.' + a.listview).find('a[href]').not(':hidden'), i.length || (i = n.find(d).not(':hidden')), i.length || (i = this.$menu.children('.' + a.navbar).find(d).not(':hidden'))), i.length || (i = this.$menu.children('.' + a.tabstart)), i.first().focus();
  }function t(e) {
    e || (e = this.$pnls.children('.' + a.current));var n = this.$pnls.children('.' + a.panel),
        t = n.not(e);t.find(d).attr('tabindex', -1), e.find(d).attr('tabindex', 0), e.find('input.mm-toggle, input.mm-check').attr('tabindex', -1);
  }var i = 'mmenu',
      s = 'keyboardNavigation';e[i].addons[s] = { setup: function () {
      var o = this,
          r = this.opts[s];this.conf[s];if (l = e[i].glbl, 'boolean' != typeof r && 'string' != typeof r || (r = { enable: r }), 'object' != typeof r && (r = {}), r = this.opts[s] = e.extend(!0, {}, e[i].defaults[s], r), r.enable) {
        r.enhance && this.$menu.addClass(a.keyboardfocus);var c = e('<input class="' + a.tabstart + '" tabindex="0" type="text" />'),
            h = e('<input class="' + a.tabend + '" tabindex="0" type="text" />');this.bind('initPanels', function () {
          this.$menu.prepend(c).append(h).children('.' + a.navbar).find(d).attr('tabindex', 0);
        }), this.bind('open', function () {
          t.call(this), this.__transitionend(this.$menu, function () {
            n.call(o, null, r.enable);
          }, this.conf.transitionDuration);
        }), this.bind('openPanel', function (e) {
          t.call(this, e), this.__transitionend(e, function () {
            n.call(o, e, r.enable);
          }, this.conf.transitionDuration);
        }), this['_initWindow_' + s](r.enhance);
      }
    }, add: function () {
      a = e[i]._c, o = e[i]._d, r = e[i]._e, a.add('tabstart tabend keyboardfocus'), r.add('focusin keydown');
    }, clickAnchor: function (e, n) {} }, e[i].defaults[s] = { enable: !1, enhance: !1 }, e[i].configuration[s] = {}, e[i].prototype['_initWindow_' + s] = function (n) {
    l.$wndw.off(r.keydown + '-offCanvas'), l.$wndw.off(r.focusin + '-' + s).on(r.focusin + '-' + s, function (n) {
      if (l.$html.hasClass(a.opened)) {
        var t = e(n.target);t.is('.' + a.tabend) && t.parent().find('.' + a.tabstart).focus();
      }
    }), l.$wndw.off(r.keydown + '-' + s).on(r.keydown + '-' + s, function (n) {
      var t = e(n.target),
          i = t.closest('.' + a.menu);if (i.length) {
        i.data('mmenu');if (t.is('input, textarea')) ;else switch (n.keyCode) {case 13:
            (t.is('.mm-toggle') || t.is('.mm-check')) && t.trigger(r.click);break;case 32:case 37:case 38:case 39:case 40:
            n.preventDefault();}
      }
    }), n && l.$wndw.on(r.keydown + '-' + s, function (n) {
      var t = e(n.target),
          i = t.closest('.' + a.menu);if (i.length) {
        var s = i.data('mmenu');if (t.is('input, textarea')) switch (n.keyCode) {case 27:
            t.val('');} else switch (n.keyCode) {case 8:
            var r = t.closest('.' + a.panel).data(o.parent);r && r.length && s.openPanel(r.closest('.' + a.panel));break;case 27:
            i.hasClass(a.offcanvas) && s.close();}
      }
    });
  };var a,
      o,
      r,
      l,
      d = 'input, select, textarea, button, label, a[href]';
}(jQuery), /*	
           * jQuery mmenu lazySubmenus add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'lazySubmenus';e[n].addons[t] = { setup: function () {
      var a = this.opts[t];this.conf[t];o = e[n].glbl, 'boolean' == typeof a && (a = { load: a }), 'object' != typeof a && (a = {}), a = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], a), a.load && (this.$menu.find('li').find('li').children(this.conf.panelNodetype).each(function () {
        e(this).parent().addClass(i.lazysubmenu).data(s.lazysubmenu, this).end().remove();
      }), this.bind('openingPanel', function (n) {
        var t = n.find('.' + i.lazysubmenu);t.length && (t.each(function () {
          e(this).append(e(this).data(s.lazysubmenu)).removeData(s.lazysubmenu).removeClass(i.lazysubmenu);
        }), this.initPanels(n));
      }));
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('lazysubmenu'), s.add('lazysubmenu');
    }, clickAnchor: function (e, n) {} }, e[n].defaults[t] = { load: !1 }, e[n].configuration[t] = {};var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu navbar add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'navbars';e[n].addons[t] = { setup: function () {
      var s = this,
          a = this.opts[t],
          r = this.conf[t];if (o = e[n].glbl, 'undefined' != typeof a) {
        a instanceof Array || (a = [a]);var l = {};if (a.length) {
          e.each(a, function (o) {
            var d = a[o];'boolean' == typeof d && d && (d = {}), 'object' != typeof d && (d = {}), 'undefined' == typeof d.content && (d.content = ['prev', 'title']), d.content instanceof Array || (d.content = [d.content]), d = e.extend(!0, {}, s.opts.navbar, d);var c = d.position,
                h = d.height;'number' != typeof h && (h = 1), h = Math.min(4, Math.max(1, h)), 'bottom' != c && (c = 'top'), l[c] || (l[c] = 0), l[c]++;var u = e('<div />').addClass(i.navbar + ' ' + i.navbar + '-' + c + ' ' + i.navbar + '-' + c + '-' + l[c] + ' ' + i.navbar + '-size-' + h);l[c] += h - 1;for (var f = 0, p = 0, v = d.content.length; p < v; p++) {
              var m = e[n].addons[t][d.content[p]] || !1;m ? f += m.call(s, u, d, r) : (m = d.content[p], m instanceof e || (m = e(d.content[p])), u.append(m));
            }f += Math.ceil(u.children().not('.' + i.btn).length / h), f > 1 && u.addClass(i.navbar + '-content-' + f), u.children('.' + i.btn).length && u.addClass(i.hasbtns), u.prependTo(s.$menu);
          });for (var d in l) s.$menu.addClass(i.hasnavbar + '-' + d + '-' + l[d]);
        }
      }
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('close hasbtns');
    }, clickAnchor: function (e, n) {} }, e[n].configuration[t] = { breadcrumbSeparator: '/' }, e[n].configuration.classNames[t] = {};var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu navbar add-on breadcrumbs content
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'navbars',
      i = 'breadcrumbs';e[n].addons[t][i] = function (t, i, s) {
    var a = e[n]._c,
        o = e[n]._d;a.add('breadcrumbs separator');var r = e('<span class="' + a.breadcrumbs + '" />').appendTo(t);this.bind('initPanels', function (n) {
      n.removeClass(a.hasnavbar).each(function () {
        for (var n = [], t = e(this), i = e('<span class="' + a.breadcrumbs + '"></span>'), r = e(this).children().first(), l = !0; r && r.length;) {
          r.is('.' + a.panel) || (r = r.closest('.' + a.panel));var d = r.children('.' + a.navbar).children('.' + a.title).text();n.unshift(l ? '<span>' + d + '</span>' : '<a href="#' + r.attr('id') + '">' + d + '</a>'), l = !1, r = r.data(o.parent);
        }i.append(n.join('<span class="' + a.separator + '">' + s.breadcrumbSeparator + '</span>')).appendTo(t.children('.' + a.navbar));
      });
    });var l = function () {
      r.html(this.$pnls.children('.' + a.current).children('.' + a.navbar).children('.' + a.breadcrumbs).html());
    };return this.bind('openPanel', l), this.bind('initPanels', l), 0;
  };
}(jQuery), /*	
           * jQuery mmenu navbar add-on close content
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'navbars',
      i = 'close';e[n].addons[t][i] = function (t, i) {
    var s = e[n]._c,
        a = e[n].glbl,
        o = e('<a class="' + s.close + ' ' + s.btn + '" href="#" />').appendTo(t),
        r = function (e) {
      o.attr('href', '#' + e.attr('id'));
    };return r.call(this, a.$page), this.bind('setPage', r), -1;
  };
}(jQuery), /*
           * jQuery mmenu navbar add-on next content
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'navbars',
      i = 'next';e[n].addons[t][i] = function (i, s) {
    var a,
        o,
        r,
        l = e[n]._c,
        d = e('<a class="' + l.next + ' ' + l.btn + '" href="#" />').appendTo(i),
        c = function (e) {
      e = e || this.$pnls.children('.' + l.current);var n = e.find('.' + this.conf.classNames[t].panelNext);a = n.attr('href'), r = n.attr('aria-owns'), o = n.html(), d[a ? 'attr' : 'removeAttr']('href', a), d[r ? 'attr' : 'removeAttr']('aria-owns', r), d[a || o ? 'removeClass' : 'addClass'](l.hidden), d.html(o);
    };return this.bind('openPanel', c), this.bind('initPanels', function () {
      c.call(this);
    }), -1;
  }, e[n].configuration.classNames[t].panelNext = 'Next';
}(jQuery), /*
           * jQuery mmenu navbar add-on prev content
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'navbars',
      i = 'prev';e[n].addons[t][i] = function (i, s) {
    var a = e[n]._c,
        o = e('<a class="' + a.prev + ' ' + a.btn + '" href="#" />').appendTo(i);this.bind('initPanels', function (e) {
      e.removeClass(a.hasnavbar).children('.' + a.navbar).addClass(a.hidden);
    });var r,
        l,
        d,
        c = function (e) {
      if (e = e || this.$pnls.children('.' + a.current), !e.hasClass(a.vertical)) {
        var n = e.find('.' + this.conf.classNames[t].panelPrev);n.length || (n = e.children('.' + a.navbar).children('.' + a.prev)), r = n.attr('href'), d = n.attr('aria-owns'), l = n.html(), o[r ? 'attr' : 'removeAttr']('href', r), o[d ? 'attr' : 'removeAttr']('aria-owns', d), o[r || l ? 'removeClass' : 'addClass'](a.hidden), o.html(l);
      }
    };return this.bind('openPanel', c), this.bind('initPanels', function () {
      c.call(this);
    }), -1;
  }, e[n].configuration.classNames[t].panelPrev = 'Prev';
}(jQuery), /*	
           * jQuery mmenu navbar add-on searchfield content
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'navbars',
      i = 'searchfield';e[n].addons[t][i] = function (t, i) {
    var s = e[n]._c,
        a = e('<div class="' + s.search + '" />').appendTo(t);return 'object' != typeof this.opts.searchfield && (this.opts.searchfield = {}), this.opts.searchfield.add = !0, this.opts.searchfield.addTo = a, 0;
  };
}(jQuery), /*	
           * jQuery mmenu navbar add-on title content
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'navbars',
      i = 'title';e[n].addons[t][i] = function (i, s) {
    var a,
        o,
        r = e[n]._c,
        l = e('<a class="' + r.title + '" />').appendTo(i),
        d = function (e) {
      if (e = e || this.$pnls.children('.' + r.current), !e.hasClass(r.vertical)) {
        var n = e.find('.' + this.conf.classNames[t].panelTitle);n.length || (n = e.children('.' + r.navbar).children('.' + r.title)), a = n.attr('href'), o = n.html() || s.title, l[a ? 'attr' : 'removeAttr']('href', a), l[a || o ? 'removeClass' : 'addClass'](r.hidden), l.html(o);
      }
    };return this.bind('openPanel', d), this.bind('initPanels', function (e) {
      d.call(this);
    }), 0;
  }, e[n].configuration.classNames[t].panelTitle = 'Title';
}(jQuery), /*	
           * jQuery mmenu RTL add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'rtl';e[n].addons[t] = { setup: function () {
      var s = this.opts[t];this.conf[t];o = e[n].glbl, 'object' != typeof s && (s = { use: s }), s = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], s), 'boolean' != typeof s.use && (s.use = 'rtl' == (o.$html.attr('dir') || '').toLowerCase()), s.use && this.$menu.addClass(i.rtl);
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('rtl');
    }, clickAnchor: function (e, n) {} }, e[n].defaults[t] = { use: 'detect' };var i, s, a, o;
}(jQuery), /*
           * jQuery mmenu screenReader add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  function n(e, n, t) {
    e.prop('aria-' + n, t)[t ? 'attr' : 'removeAttr']('aria-' + n, t);
  }function t(e) {
    return '<span class="' + a.sronly + '">' + e + '</span>';
  }var i = 'mmenu',
      s = 'screenReader';e[i].addons[s] = { setup: function () {
      var o = this.opts[s],
          r = this.conf[s];if (l = e[i].glbl, 'boolean' == typeof o && (o = { aria: o, text: o }), 'object' != typeof o && (o = {}), o = this.opts[s] = e.extend(!0, {}, e[i].defaults[s], o), o.aria) {
        if (this.opts.offCanvas) {
          var d = function () {
            n(this.$menu, 'hidden', !1);
          },
              c = function () {
            n(this.$menu, 'hidden', !0);
          };this.bind('open', d), this.bind('close', c), n(this.$menu, 'hidden', !0);
        }var h = function () {},
            u = function (e) {
          var t = this.$menu.children('.' + a.navbar),
              i = t.children('.' + a.prev),
              s = t.children('.' + a.next),
              r = t.children('.' + a.title);n(i, 'hidden', i.is('.' + a.hidden)), n(s, 'hidden', s.is('.' + a.hidden)), o.text && n(r, 'hidden', !i.is('.' + a.hidden)), n(this.$pnls.children('.' + a.panel).not(e), 'hidden', !0), n(e, 'hidden', !1);
        };this.bind('update', h), this.bind('openPanel', h), this.bind('openPanel', u);var f = function (t) {
          var i;t = t || this.$menu;var s = t.children('.' + a.navbar),
              r = s.children('.' + a.prev),
              l = s.children('.' + a.next);s.children('.' + a.title);n(r, 'haspopup', !0), n(l, 'haspopup', !0), i = t.is('.' + a.panel) ? t.find('.' + a.prev + ', .' + a.next) : r.add(l), i.each(function () {
            n(e(this), 'owns', e(this).attr('href').replace('#', ''));
          }), o.text && t.is('.' + a.panel) && (i = t.find('.' + a.listview).find('.' + a.fullsubopen).parent().children('span'), n(i, 'hidden', !0));
        };this.bind('initPanels', f), this.bind('_initAddons', f);
      }if (o.text) {
        var p = function (n) {
          var s;n = n || this.$menu;var o = n.children('.' + a.navbar);o.each(function () {
            var n = e(this),
                o = e[i].i18n(r.text.closeSubmenu);s = n.children('.' + a.title), s.length && (o += ' (' + s.text() + ')'), n.children('.' + a.prev).html(t(o));
          }), o.children('.' + a.close).html(t(e[i].i18n(r.text.closeMenu))), n.is('.' + a.panel) && n.find('.' + a.listview).children('li').children('.' + a.next).each(function () {
            var n = e(this),
                o = e[i].i18n(r.text[n.parent().is('.' + a.vertical) ? 'toggleSubmenu' : 'openSubmenu']);s = n.nextAll('span, a').first(), s.length && (o += ' (' + s.text() + ')'), n.html(t(o));
          });
        };this.bind('initPanels', p), this.bind('_initAddons', p);
      }
    }, add: function () {
      a = e[i]._c, o = e[i]._d, r = e[i]._e, a.add('sronly');
    }, clickAnchor: function (e, n) {} }, e[i].defaults[s] = { aria: !1, text: !1 }, e[i].configuration[s] = { text: { closeMenu: 'Close menu', closeSubmenu: 'Close submenu', openSubmenu: 'Open submenu', toggleSubmenu: 'Toggle submenu' } };var a, o, r, l;
}(jQuery), /*	
           * jQuery mmenu searchfield add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  function n(e) {
    switch (e) {case 9:case 16:case 17:case 18:case 37:case 38:case 39:case 40:
        return !0;}return !1;
  }var t = 'mmenu',
      i = 'searchfield';e[t].addons[i] = { setup: function () {
      var l = this,
          d = this.opts[i],
          c = this.conf[i];r = e[t].glbl, 'boolean' == typeof d && (d = { add: d }), 'object' != typeof d && (d = {}), 'boolean' == typeof d.resultsPanel && (d.resultsPanel = { add: d.resultsPanel }), d = this.opts[i] = e.extend(!0, {}, e[t].defaults[i], d), c = this.conf[i] = e.extend(!0, {}, e[t].configuration[i], c), this.bind('close', function () {
        this.$menu.find('.' + s.search).find('input').blur();
      }), this.bind('initPanels', function (r) {
        if (d.add) {
          var h;switch (d.addTo) {case 'panels':
              h = r;break;default:
              h = this.$menu.find(d.addTo);}if (h.each(function () {
            var n = e(this);if (!n.is('.' + s.panel) || !n.is('.' + s.vertical)) {
              if (!n.children('.' + s.search).length) {
                var i = l.__valueOrFn(c.clear, n),
                    a = l.__valueOrFn(c.form, n),
                    r = l.__valueOrFn(c.input, n),
                    h = l.__valueOrFn(c.submit, n),
                    u = e('<' + (a ? 'form' : 'div') + ' class="' + s.search + '" />'),
                    f = e('<input placeholder="' + e[t].i18n(d.placeholder) + '" type="text" autocomplete="off" />');u.append(f);var p;if (r) for (p in r) f.attr(p, r[p]);if (i && e('<a class="' + s.btn + ' ' + s.clear + '" href="#" />').appendTo(u).on(o.click + '-searchfield', function (e) {
                  e.preventDefault(), f.val('').trigger(o.keyup + '-searchfield');
                }), a) {
                  for (p in a) u.attr(p, a[p]);h && !i && e('<a class="' + s.btn + ' ' + s.next + '" href="#" />').appendTo(u).on(o.click + '-searchfield', function (e) {
                    e.preventDefault(), u.submit();
                  });
                }n.hasClass(s.search) ? n.replaceWith(u) : n.prepend(u).addClass(s.hassearch);
              }if (d.noResults) {
                var v = n.closest('.' + s.panel).length;if (v || (n = l.$pnls.children('.' + s.panel).first()), !n.children('.' + s.noresultsmsg).length) {
                  var m = n.children('.' + s.listview).first();e('<div class="' + s.noresultsmsg + ' ' + s.hidden + '" />').append(e[t].i18n(d.noResults))[m.length ? 'insertAfter' : 'prependTo'](m.length ? m : n);
                }
              }
            }
          }), d.search) {
            if (d.resultsPanel.add) {
              d.showSubPanels = !1;var u = this.$pnls.children('.' + s.resultspanel);u.length || (u = e('<div class="' + s.panel + ' ' + s.resultspanel + ' ' + s.hidden + '" />').appendTo(this.$pnls).append('<div class="' + s.navbar + ' ' + s.hidden + '"><a class="' + s.title + '">' + e[t].i18n(d.resultsPanel.title) + '</a></div>').append('<ul class="' + s.listview + '" />').append(this.$pnls.find('.' + s.noresultsmsg).first().clone()), this.initPanels(u));
            }this.$menu.find('.' + s.search).each(function () {
              var t,
                  r,
                  c = e(this),
                  h = c.closest('.' + s.panel).length;h ? (t = c.closest('.' + s.panel), r = t) : (t = e('.' + s.panel, l.$menu), r = l.$menu), d.resultsPanel.add && (t = t.not(u));var f = c.children('input'),
                  p = l.__findAddBack(t, '.' + s.listview).children('li'),
                  v = p.filter('.' + s.divider),
                  m = l.__filterListItems(p),
                  g = 'a',
                  b = g + ', span',
                  _ = '',
                  C = function () {
                var n = f.val().toLowerCase();if (n != _) {
                  if (_ = n, d.resultsPanel.add && u.children('.' + s.listview).empty(), t.scrollTop(0), m.add(v).addClass(s.hidden).find('.' + s.fullsubopensearch).removeClass(s.fullsubopen + ' ' + s.fullsubopensearch), m.each(function () {
                    var n = e(this),
                        t = g;(d.showTextItems || d.showSubPanels && n.find('.' + s.next)) && (t = b);var i = n.data(a.searchtext) || n.children(t).text();i.toLowerCase().indexOf(_) > -1 && n.add(n.prevAll('.' + s.divider).first()).removeClass(s.hidden);
                  }), d.showSubPanels && t.each(function (n) {
                    var t = e(this);l.__filterListItems(t.find('.' + s.listview).children()).each(function () {
                      var n = e(this),
                          t = n.data(a.child);n.removeClass(s.nosubresults), t && t.find('.' + s.listview).children().removeClass(s.hidden);
                    });
                  }), d.resultsPanel.add) {
                    if ('' === _) this.closeAllPanels(), this.openPanel(this.$pnls.children('.' + s.subopened).last());else {
                      var i = e();t.each(function () {
                        var n = l.__filterListItems(e(this).find('.' + s.listview).children()).not('.' + s.hidden).clone(!0);n.length && (d.resultsPanel.dividers && (i = i.add('<li class="' + s.divider + '">' + e(this).children('.' + s.navbar).text() + '</li>')), i = i.add(n));
                      }), i.find('.' + s.next).remove(), u.children('.' + s.listview).append(i), this.openPanel(u);
                    }
                  } else e(t.get().reverse()).each(function (n) {
                    var t = e(this),
                        i = t.data(a.parent);i && (l.__filterListItems(t.find('.' + s.listview).children()).length ? (i.hasClass(s.hidden) && i.children('.' + s.next).not('.' + s.fullsubopen).addClass(s.fullsubopen).addClass(s.fullsubopensearch), i.removeClass(s.hidden).removeClass(s.nosubresults).prevAll('.' + s.divider).first().removeClass(s.hidden)) : h || (t.hasClass(s.opened) && setTimeout(function () {
                      l.openPanel(i.closest('.' + s.panel));
                    }, (n + 1) * (1.5 * l.conf.openingInterval)), i.addClass(s.nosubresults)));
                  });r.find('.' + s.noresultsmsg)[m.not('.' + s.hidden).length ? 'addClass' : 'removeClass'](s.hidden), this.update();
                }
              };f.off(o.keyup + '-' + i + ' ' + o.change + '-' + i).on(o.keyup + '-' + i, function (e) {
                n(e.keyCode) || C.call(l);
              }).on(o.change + '-' + i, function (e) {
                C.call(l);
              });var y = c.children('.' + s.btn);y.length && f.on(o.keyup + '-' + i, function (e) {
                y[f.val().length ? 'removeClass' : 'addClass'](s.hidden);
              }), f.trigger(o.keyup + '-' + i);
            });
          }
        }
      });
    }, add: function () {
      s = e[t]._c, a = e[t]._d, o = e[t]._e, s.add('clear search hassearch resultspanel noresultsmsg noresults nosubresults fullsubopensearch'), a.add('searchtext'), o.add('change keyup');
    }, clickAnchor: function (e, n) {} }, e[t].defaults[i] = { add: !1, addTo: 'panels', placeholder: 'Search', noResults: 'No results found.', resultsPanel: { add: !1, dividers: !0, title: 'Search results' }, search: !0, showTextItems: !1, showSubPanels: !0 }, e[t].configuration[i] = { clear: !1, form: !1, input: !1, submit: !1 };var s, a, o, r;
}(jQuery), /*	
           * jQuery mmenu sectionIndexer add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'sectionIndexer';e[n].addons[t] = { setup: function () {
      var s = this,
          r = this.opts[t];this.conf[t];o = e[n].glbl, 'boolean' == typeof r && (r = { add: r }), 'object' != typeof r && (r = {}), r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r), this.bind('initPanels', function (n) {
        if (r.add) {
          var t;switch (r.addTo) {case 'panels':
              t = n;break;default:
              t = e(r.addTo, this.$menu).filter('.' + i.panel);}t.find('.' + i.divider).closest('.' + i.panel).addClass(i.hasindexer);
        }if (!this.$indexer && this.$pnls.children('.' + i.hasindexer).length) {
          this.$indexer = e('<div class="' + i.indexer + '" />').prependTo(this.$pnls).append('<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>'), this.$indexer.children().on(a.mouseover + '-sectionindexer ' + i.touchstart + '-sectionindexer', function (n) {
            var t = e(this).attr('href').slice(1),
                a = s.$pnls.children('.' + i.current),
                o = a.find('.' + i.listview),
                r = !1,
                l = a.scrollTop();a.scrollTop(0), o.children('.' + i.divider).not('.' + i.hidden).each(function () {
              r === !1 && t == e(this).text().slice(0, 1).toLowerCase() && (r = e(this).position().top);
            }), a.scrollTop(r !== !1 ? r : l);
          });var o = function (e) {
            s.$menu[(e.hasClass(i.hasindexer) ? 'add' : 'remove') + 'Class'](i.hasindexer);
          };this.bind('openPanel', o), o.call(this, this.$pnls.children('.' + i.current));
        }
      });
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('indexer hasindexer'), a.add('mouseover touchstart');
    }, clickAnchor: function (e, n) {
      if (e.parent().is('.' + i.indexer)) return !0;
    } }, e[n].defaults[t] = { add: !1, addTo: 'panels' };var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu setSelected add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'setSelected';e[n].addons[t] = { setup: function () {
      var a = this,
          r = this.opts[t];this.conf[t];if (o = e[n].glbl, 'boolean' == typeof r && (r = { hover: r, parent: r }), 'object' != typeof r && (r = {}), r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r), 'detect' == r.current) {
        var l = function (e) {
          e = e.split('?')[0].split('#')[0];var n = a.$menu.find('a[href="' + e + '"], a[href="' + e + '/"]');n.length ? a.setSelected(n.parent(), !0) : (e = e.split('/').slice(0, -1), e.length && l(e.join('/')));
        };l(window.location.href);
      } else r.current || this.bind('initPanels', function (e) {
        e.find('.' + i.listview).children('.' + i.selected).removeClass(i.selected);
      });if (r.hover && this.$menu.addClass(i.hoverselected), r.parent) {
        this.$menu.addClass(i.parentselected);var d = function (e) {
          this.$pnls.find('.' + i.listview).find('.' + i.next).removeClass(i.selected);for (var n = e.data(s.parent); n && n.length;) n = n.not('.' + i.vertical).children('.' + i.next).addClass(i.selected).end().closest('.' + i.panel).data(s.parent);
        };this.bind('openedPanel', d), this.bind('initPanels', function (e) {
          d.call(this, this.$pnls.children('.' + i.current));
        });
      }
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('hoverselected parentselected');
    }, clickAnchor: function (e, n) {} }, e[n].defaults[t] = { current: !0, hover: !1, parent: !1 };var i, s, a, o;
}(jQuery), /*	
           * jQuery mmenu toggles add-on
           * mmenu.frebsite.nl
           *
           * Copyright (c) Fred Heusschen
           */
function (e) {
  var n = 'mmenu',
      t = 'toggles';e[n].addons[t] = { setup: function () {
      var s = this;this.opts[t], this.conf[t];o = e[n].glbl, this.bind('initPanels', function (n) {
        this.__refactorClass(e('input', n), this.conf.classNames[t].toggle, 'toggle'), this.__refactorClass(e('input', n), this.conf.classNames[t].check, 'check'), e('input.' + i.toggle + ', input.' + i.check, n).each(function () {
          var n = e(this),
              t = n.closest('li'),
              a = n.hasClass(i.toggle) ? 'toggle' : 'check',
              o = n.attr('id') || s.__getUniqueId();t.children('label[for="' + o + '"]').length || (n.attr('id', o), t.prepend(n), e('<label for="' + o + '" class="' + i[a] + '"></label>').insertBefore(t.children('a, span').last()));
        });
      });
    }, add: function () {
      i = e[n]._c, s = e[n]._d, a = e[n]._e, i.add('toggle check');
    }, clickAnchor: function (e, n) {} }, e[n].configuration.classNames[t] = { toggle: 'Toggle', check: 'Check' };var i, s, a, o;
}(jQuery);
//# sourceMappingURL=jquery.mmenu.all.min.js.map

/*! JsRender v0.9.83 (Beta): http://jsviews.com/#jsrender */
/*! **VERSION FOR WEB** (For NODE.JS see http://jsviews.com/download/jsrender-node.js) */
!function (e, t) {
  var n = t.jQuery;'object' == typeof exports ? module.exports = n ? e(t, n) : function (n) {
    if (n && !n.fn) throw 'Provide jQuery or null';return e(t, n);
  } : 'function' == typeof define && define.amd ? define(function () {
    return e(t);
  }) : e(t, !1);
}(function (e, t) {
  'use strict';
  function n(e, t) {
    return function () {
      var n,
          r = this,
          i = r.base;return r.base = e, n = t.apply(r, arguments), r.base = i, n;
    };
  }function r(e, t) {
    return ee(t) && (t = n(e ? e._d ? e : n(s, e) : s, t), t._d = 1), t;
  }function i(e, t) {
    for (var n in t.props) Ve.test(n) && (e[n] = r(e[n], t.props[n]));
  }function o(e) {
    return e;
  }function s() {
    return '';
  }function a(e) {
    try {
      throw console.log('JsRender dbg breakpoint: ' + e), 'dbg breakpoint';
    } catch (t) {}return this.base ? this.baseApply(arguments) : e;
  }function d(e) {
    this.name = (t.link ? 'JsViews' : 'JsRender') + ' Error', this.message = e || this.name;
  }function u(e, t) {
    for (var n in t) e[n] = t[n];return e;
  }function l(e, t, n) {
    return e ? te(e) ? l.apply(X, e) : (ae.delimiters = [e, t, ge = n ? n.charAt(0) : ge], le = e.charAt(0), pe = e.charAt(1), ce = t.charAt(0), fe = t.charAt(1), e = '\\' + le + '(\\' + ge + ')?\\' + pe, t = '\\' + ce + '\\' + fe, G = '(?:(\\w+(?=[\\/\\s\\' + ce + ']))|(\\w+)?(:)|(>)|(\\*))\\s*((?:[^\\' + ce + ']|\\' + ce + '(?!\\' + fe + '))*?)', se.rTag = '(?:' + G + ')', G = new RegExp('(?:' + e + G + '(\\/)?|\\' + le + '(\\' + ge + ')?\\' + pe + '(?:(?:\\/(\\w+))\\s*|!--[\\s\\S]*?--))' + t, 'g'), se.rTmpl = new RegExp('<.*>|([^\\\\]|^)[{}]|' + e + '.*' + t), ue) : ae.delimiters;
  }function p(e, t) {
    t || e === !0 || (t = e, e = void 0);var n,
        r,
        i,
        o,
        s = this,
        a = !t || 'root' === t;if (e) {
      if (o = t && s.type === t && s, !o) if (n = s.views, s._.useKey) {
        for (r in n) if (o = t ? n[r].get(e, t) : n[r]) break;
      } else for (r = 0, i = n.length; !o && r < i; r++) o = t ? n[r].get(e, t) : n[r];
    } else if (a) for (; s.parent;) o = s, s = s.parent;else for (; s && !o;) o = s.type === t ? s : void 0, s = s.parent;return o;
  }function c() {
    var e = this.get('item');return e ? e.index : void 0;
  }function f() {
    return this.index;
  }function g(t, n) {
    var r,
        i,
        o = this,
        s = o.ctx;if (s && (s = s[t]), void 0 === s && (s = ie[t]), s && s._cp) {
      if (n) return i = se._ceo(s[1].deps), i.unshift(s[0]), i._cp = !0, i;s = X.getCtx(s);
    }return s && ee(s) && !s._wrp && (r = function () {
      return s.apply(this && this !== e ? this : o, arguments);
    }, r._wrp = o, u(r, s)), r || s;
  }function v(e) {
    return e && (e.fn ? e : this.getRsc('templates', e) || ne(e));
  }function h(e, t, n, r) {
    var o,
        s,
        a = 'number' == typeof n && t.tmpl.bnds[n - 1],
        d = t.linkCtx;return void 0 !== r ? n = r = { props: {}, args: [r] } : a && (n = a(t.data, t, se)), s = n.args[0], (e || a) && (o = d && d.tag, o || (o = u(new se._tg(), { _: { inline: !d, bnd: a, unlinked: !0 }, tagName: ':', cvt: e, flow: !0, tagCtx: n }), d && (d.tag = o, o.linkCtx = d), n.ctx = B(n.ctx, (d ? d.view : t).ctx)), o._er = r && s, i(o, n), n.view = t, o.ctx = n.ctx || o.ctx || {}, n.ctx = void 0, s = o.cvtArgs('true' !== e && e)[0], s = a && t._.onRender ? t._.onRender(s, t, o) : s), void 0 != s ? s : '';
  }function m(e) {
    var t = this,
        n = t.tagCtx,
        r = n.view,
        i = n.args;return e = e || t.convert, e = e && ('' + e === e ? r.getRsc('converters', e) || S('Unknown converter: \'' + e + '\'') : e), i = i.length || n.index ? e ? i.slice() : i : [r.data], e && (e.depends && (t.depends = se.getDeps(t.depends, t, e.depends, e)), i[0] = e.apply(t, i)), i;
  }function w(e, t) {
    for (var n, r, i = this; void 0 === n && i;) r = i.tmpl && i.tmpl[e], n = r && r[t], i = i.parent;return n || X[e][t];
  }function x(e, n, r, o, s, a) {
    n = n || W;var d,
        u,
        l,
        p,
        c,
        f,
        g,
        v,
        h,
        m,
        w,
        x,
        _,
        b,
        y,
        k,
        j,
        C,
        T,
        A,
        V = '',
        R = n.linkCtx || 0,
        $ = n.ctx,
        M = r || n.tmpl,
        F = 'number' == typeof o && n.tmpl.bnds[o - 1];for ('tag' === e._is ? (d = e, e = d.tagName, o = d.tagCtxs, l = d.template) : (u = n.getRsc('tags', e) || S('Unknown tag: {{' + e + '}} '), l = u.template), void 0 !== a ? (V += a, o = a = [{ props: {}, args: [] }]) : F && (o = F(n.data, n, se)), v = o.length, g = 0; g < v; g++) m = o[g], (!R || !R.tag || g && !R.tag._.inline || d._er) && ((x = M.tmpls && m.tmpl) && (x = m.content = M.tmpls[x - 1]), m.index = g, m.tmpl = x, m.render = E, m.view = n, m.ctx = B(m.ctx, $)), (r = m.props.tmpl) && (m.tmpl = n.getTmpl(r)), d || (d = new u._ctr(), _ = !!d.init, d.parent = f = $ && $.tag, d.tagCtxs = o, T = d.dataMap, R && (d._.inline = !1, R.tag = d, d.linkCtx = R), (d._.bnd = F || R.fn) ? d._.arrVws = {} : d.dataBoundOnly && S('{^{' + e + '}} tag must be data-bound')), o = d.tagCtxs, T = d.dataMap, m.tag = d, T && o && (m.map = o[g].map), d.flow || (w = m.ctx = m.ctx || {}, p = d.parents = w.parentTags = $ && B(w.parentTags, $.parentTags) || {}, f && (p[f.tagName] = f), p[d.tagName] = w.tag = d);if (!(d._er = a)) {
      for (i(d, o[0]), d.rendering = {}, g = 0; g < v; g++) m = d.tagCtx = o[g], j = m.props, k = d.cvtArgs(), (b = j.dataMap || T) && (k.length || j.dataMap) && (y = m.map, y && y.src === k[0] && !s || (y && y.src && y.unmap(), y = m.map = b.map(k[0], j, void 0, !d._.bnd)), k = [y.tgt]), d.ctx = m.ctx, g || (_ && (C = d.template, d.init(m, R, d.ctx), _ = void 0), R && (R.attr = d.attr = R.attr || d.attr), c = d.attr, d._.noVws = c && c !== Ne), h = void 0, d.render && (h = d.render.apply(d, k), n.linked && h && d.linkedElem && !Re.test(h) && (h = N(t.templates(h), k[0], void 0, void 0, n, void 0, void 0, d))), k.length || (k = [n]), void 0 === h && (A = k[0], d.contentCtx && (A = d.contentCtx(A)), h = m.render(A, !0) || (s ? void 0 : '')), V = V ? V + (h || '') : h;d.rendering = void 0;
    }return d.tagCtx = o[0], d.ctx = d.tagCtx.ctx, d._.noVws && d._.inline && (V = 'text' === c ? re.html(V) : ''), F && n._.onRender ? n._.onRender(V, n, d) : V;
  }function _(e, t, n, r, i, o, s, a) {
    var d,
        u,
        l,
        p = this,
        f = 'array' === t;p.content = a, p.views = f ? [] : {}, p.parent = n, p.type = t || 'top', p.data = r, p.tmpl = i, l = p._ = { key: 0, useKey: f ? 0 : 1, id: '' + Me++, onRender: s, bnds: {} }, p.linked = !!s, n ? (d = n.views, u = n._, u.useKey ? (d[l.key = '_' + u.useKey++] = p, p.index = Oe, p.getIndex = c) : d.length === (l.key = p.index = o) ? d.push(p) : d.splice(o, 0, p), p.ctx = e || n.ctx) : p.ctx = e;
  }function b(e) {
    var t, n, r;for (t in Ke) n = t + 's', e[n] && (r = e[n], e[n] = {}, X[n](r, e));
  }function y(e, t, n) {
    function i() {
      var t = this;t._ = { inline: !0, unlinked: !0 }, t.tagName = e;
    }var o,
        s,
        a,
        d = new se._tg();if (ee(t) ? t = { depends: t.depends, render: t } : '' + t === t && (t = { template: t }), s = t.baseTag) {
      t.flow = !!t.flow, t.baseTag = s = '' + s === s ? n && n.tags[s] || oe[s] : s, d = u(d, s);for (a in t) d[a] = r(s[a], t[a]);
    } else d = u(d, t);return void 0 !== (o = d.template) && (d.template = '' + o === o ? ne[o] || ne(o) : o), d.init !== !1 && ((i.prototype = d).constructor = d._ctr = i), n && (d._parentTmpl = n), d;
  }function k(e) {
    return this.base.apply(this, e);
  }function j(e, n, r, i) {
    function o(n) {
      var o, a;if ('' + n === n || n.nodeType > 0 && (s = n)) {
        if (!s) if (/^\.\/[^\\:*?"<>]*$/.test(n)) (a = ne[e = e || n]) ? n = a : s = document.getElementById(n);else if (t.fn && !se.rTmpl.test(n)) try {
          s = t(document).find(n)[0];
        } catch (d) {}s && (i ? n = s.innerHTML : (o = s.getAttribute(Se), o ? o !== Ie ? (n = ne[o], delete ne[o]) : t.fn && (n = t.data(s)[Ie]) : (e = e || (t.fn ? Ie : n), n = j(e, s.innerHTML, r, i)), n.tmplName = e = e || o, e !== Ie && (ne[e] = n), s.setAttribute(Se, e), t.fn && t.data(s, Ie, n))), s = void 0;
      } else n.fn || (n = void 0);return n;
    }var s,
        a,
        d = n = n || '';if (0 === i && (i = void 0, d = o(d)), i = i || (n.markup ? n : {}), i.tmplName = e, r && (i._parentTmpl = r), !d && n.markup && (d = o(n.markup)) && d.fn && (d = d.markup), void 0 !== d) return d.fn || n.fn ? d.fn && (a = d) : (n = V(d, i), O(d.replace(ye, '\\$&'), n)), a || (a = u(function () {
      return a.render.apply(a, arguments);
    }, n), b(a)), e && !r && e !== Ie && (Ue[e] = a), a;
  }function C(e, n) {
    return t.isFunction(e) ? e.call(n) : e;
  }function T(e) {
    var t,
        n = [],
        r = e.length;for (t = 0; t < r; t++) n.push(e[t].unmap());return n;
  }function A(e, n) {
    function r(e) {
      l.apply(this, e);
    }function i() {
      return new r(arguments);
    }function o(e, t) {
      var n,
          r,
          i,
          o,
          s,
          a = c.length;for (n = 0; n < a; n++) o = c[n], r = void 0, o + '' !== o && (r = o, o = r.getter), void 0 === (s = e[o]) && r && void 0 !== (i = r.defaultVal) && (s = C(i, e)), t(s, r && p[r.type], o);
    }function s(t) {
      t = t + '' === t ? JSON.parse(t) : t;var n,
          r,
          i,
          s = t,
          u = [];if (te(t)) {
        for (t = t || [], r = t.length, n = 0; n < r; n++) u.push(this.map(t[n]));return u._is = e, u.unmap = d, u.merge = a, u;
      }if (t) {
        o(t, function (e, t) {
          t && (e = t.map(e)), u.push(e);
        }), s = this.apply(this, u);for (i in t) i === Y || _[i] || (s[i] = t[i]);
      }return s;
    }function a(e) {
      e = e + '' === e ? JSON.parse(e) : e;var t,
          n,
          r,
          s,
          a,
          d,
          u,
          l,
          p,
          c,
          f = this;if (te(f)) {
        for (l = {}, c = [], r = e.length, s = f.length, t = 0; t < r; t++) {
          for (p = e[t], u = !1, n = 0; n < s && !u; n++) l[n] || (d = f[n], g && (l[n] = u = g + '' === g ? p[g] && (_[g] ? d[g]() : d[g]) === p[g] : g(d, p)));u ? (d.merge(p), c.push(d)) : c.push(i.map(p));
        }return void (x ? x(f).refresh(c, !0) : f.splice.apply(f, [0, f.length].concat(c)));
      }o(e, function (e, t, n) {
        t ? f[n]().merge(e) : f[n](e);
      });for (a in e) a === Y || _[a] || (f[a] = e[a]);
    }function d() {
      var e,
          n,
          r,
          i,
          o,
          s,
          a = this;if (te(a)) return T(a);for (e = {}, i = c.length, r = 0; r < i; r++) n = c[r], o = void 0, n + '' !== n && (o = n, n = o.getter), s = a[n](), e[n] = o && s && p[o.type] ? te(s) ? T(s) : s.unmap() : s;for (n in a) '_is' === n || _[n] || n === Y || '_' === n.charAt(0) && _[n.slice(1)] || t.isFunction(a[n]) || (e[n] = a[n]);return e;
    }var u,
        l,
        p = this,
        c = n.getters,
        f = n.extend,
        g = n.id,
        v = t.extend({ _is: e || 'unnamed', unmap: d, merge: a }, f),
        h = '',
        m = '',
        w = c ? c.length : 0,
        x = t.observable,
        _ = {};for (r.prototype = v, u = 0; u < w; u++) !function (e) {
      e = e.getter || e, _[e] = u + 1;var t = '_' + e;h += (h ? ',' : '') + e, m += 'this.' + t + ' = ' + e + ';\n', v[e] = v[e] || function (n) {
        return arguments.length ? void (x ? x(this).setProperty(e, n) : this[t] = n) : this[t];
      }, x && (v[e].set = v[e].set || function (e) {
        this[t] = e;
      });
    }(c[u]);return l = new Function(h, m.slice(0, -1)), l.prototype = v, v.constructor = l, i.map = s, i.getters = c, i.extend = f, i.id = g, i;
  }function V(e, n) {
    var r,
        i = de._wm || {},
        o = u({ tmpls: [], links: {}, bnds: [], _is: 'template', render: E }, n);return o.markup = e, n.htmlTag || (r = Ce.exec(e), o.htmlTag = r ? r[1].toLowerCase() : ''), r = i[o.htmlTag], r && r !== i.div && (o.markup = t.trim(o.markup)), o;
  }function R(e, t) {
    function n(i, o, s) {
      var a, d, u, l;if (i && typeof i === Fe && !i.nodeType && !i.markup && !i.getTgt && !('viewModel' === e && i.getters || i.extend)) {
        for (u in i) n(u, i[u], o);return o || X;
      }return void 0 === o && (o = i, i = void 0), i && '' + i !== i && (s = o, o = i, i = void 0), l = s ? 'viewModel' === e ? s : s[r] = s[r] || {} : n, d = t.compile, null === o ? i && delete l[i] : (o = d ? d.call(l, i, o, s, 0) : o, i && (l[i] = o)), d && o && (o._is = e), o && (a = se.onStore[e]) && a(i, o, d), o;
    }var r = e + 's';X[r] = n;
  }function $(e) {
    ue[e] = function (t) {
      return arguments.length ? (ae[e] = t, ue) : ae[e];
    };
  }function M(e) {
    function t(t, n) {
      this.tgt = e.getTgt(t, n);
    }return ee(e) && (e = { getTgt: e }), e.baseMap && (e = u(u({}, e.baseMap), e)), e.map = function (e, n) {
      return new t(e, n);
    }, e;
  }function E(e, t, n, r, i, o) {
    var s,
        a,
        d,
        u,
        l,
        p,
        c,
        f,
        g = r,
        v = '';if (t === !0 ? (n = t, t = void 0) : typeof t !== Fe && (t = void 0), (d = this.tag) ? (l = this, g = g || l.view, u = g.getTmpl(d.template || l.tmpl), arguments.length || (e = g)) : u = this, u) {
      if (!r && e && 'view' === e._is && (g = e), g && e === g && (e = g.data), p = !g, he = he || p, g || ((t = t || {}).root = e), !he || de.useViews || u.useViews || g && g !== W) v = N(u, e, t, n, g, i, o, d);else {
        if (g ? (c = g.data, f = g.index, g.index = Oe) : (g = W, g.data = e, g.ctx = t), te(e) && !n) for (s = 0, a = e.length; s < a; s++) g.index = s, g.data = e[s], v += u.fn(e[s], g, se);else g.data = e, v += u.fn(e, g, se);g.data = c, g.index = f;
      }p && (he = void 0);
    }return v;
  }function N(e, t, n, r, i, o, s, a) {
    function d(e) {
      b = u({}, n), b[x] = e;
    }var l,
        p,
        c,
        f,
        g,
        v,
        h,
        m,
        w,
        x,
        b,
        y,
        k = '';if (a && (w = a.tagName, y = a.tagCtx, n = n ? B(n, a.ctx) : a.ctx, e === i.content ? h = e !== i.ctx._wrp ? i.ctx._wrp : void 0 : e !== y.content ? e === a.template ? (h = y.tmpl, n._wrp = y.content) : h = y.content || i.content : h = i.content, y.props.link === !1 && (n = n || {}, n.link = !1), (x = y.props.itemVar) && ('~' !== x.charAt(0) && I('Use itemVar=\'~myItem\''), x = x.slice(1))), i && (s = s || i._.onRender, n = B(n, i.ctx)), o === !0 && (v = !0, o = 0), s && (n && n.link === !1 || a && a._.noVws) && (s = void 0), m = s, s === !0 && (m = void 0, s = i._.onRender), n = e.helpers ? B(e.helpers, n) : n, b = n, te(t) && !r) for (c = v ? i : void 0 !== o && i || new _(n, 'array', i, t, e, o, s, h), i && i._.useKey && (c._.bnd = !a || a._.bnd && a), x && (c.it = x), x = c.it, l = 0, p = t.length; l < p; l++) x && d(t[l]), f = new _(b, 'item', c, t[l], e, (o || 0) + l, s, c.content), g = e.fn(t[l], f, se), k += c._.onRender ? c._.onRender(g, f) : g;else x && d(t), c = v ? i : new _(b, w || 'data', i, t, e, o, s, h), a && !a.flow && (c.tag = a, a.view = c), k += e.fn(t, c, se);return m ? m(k, c) : k;
  }function F(e, t, n) {
    var r = void 0 !== n ? ee(n) ? n.call(t.data, e, t) : n || '' : '{Error: ' + e.message + '}';return ae.onError && void 0 !== (n = ae.onError.call(t.data, e, n && r, t)) && (r = n), t && !t.linkCtx ? re.html(r) : r;
  }function S(e) {
    throw new se.Err(e);
  }function I(e) {
    S('Syntax error\n' + e);
  }function O(e, t, n, r, i) {
    function o(t) {
      t -= v, t && m.push(e.substr(v, t).replace(_e, '\\n'));
    }function s(t, n) {
      t && (t += '}}', I((n ? '{{' + n + '}} block has {{/' + t + ' without {{' + t : 'Unmatched or missing {{/' + t) + ', in template:\n' + e));
    }function a(a, d, u, c, g, x, _, b, y, k, j, C) {
      (_ && d || y && !u || b && ':' === b.slice(-1) || k) && I(a), x && (g = ':', c = Ne), y = y || n && !i;var T = (d || n) && [[]],
          A = '',
          V = '',
          R = '',
          $ = '',
          M = '',
          E = '',
          N = '',
          F = '',
          S = !y && !g;u = u || (b = b || '#data', g), o(C), v = C + a.length, _ ? f && m.push(['*', '\n' + b.replace(/^:/, 'ret+= ').replace(be, '$1') + ';\n']) : u ? ('else' === u && (je.test(b) && I('for "{{else if expr}}" use "{{else expr}}"'), T = w[7] && [[]], w[8] = e.substring(w[8], C), w = h.pop(), m = w[2], S = !0), b && K(b.replace(_e, ' '), T, t).replace(ke, function (e, t, n, r, i, o, s, a) {
        return r = '\'' + i + '\':', s ? (V += o + ',', $ += '\'' + a + '\',') : n ? (R += r + 'j._cp(' + o + ',"' + a + '",view),', E += r + '\'' + a + '\',') : t ? N += o : ('trigger' === i && (F += o), A += r + o + ',', M += r + '\'' + a + '\',', p = p || Ve.test(i)), '';
      }).slice(0, -1), T && T[0] && T.pop(), l = [u, c || !!r || p || '', S && [], q($ || (':' === u ? '\'#data\',' : ''), M, E), q(V || (':' === u ? 'data,' : ''), A, R), N, F, T || 0], m.push(l), S && (h.push(w), w = l, w[8] = v)) : j && (s(j !== w[0] && 'else' !== w[0] && j, w[0]), w[8] = e.substring(w[8], C), w = h.pop()), s(!w && j), m = w[2];
    }var d,
        u,
        l,
        p,
        c,
        f = ae.allowCode || t && t.allowCode || ue.allowCode === !0,
        g = [],
        v = 0,
        h = [],
        m = g,
        w = [,, g];if (f && t._is && (t.allowCode = f), n && (void 0 !== r && (e = e.slice(0, -r.length - 2) + ce), e = le + e + fe), s(h[0] && h[0][2].pop()[0]), e.replace(G, a), o(e.length), (v = g[g.length - 1]) && s('' + v !== v && +v[8] === v[8] && v[0]), n) {
      for (u = P(g, e, n), c = [], d = g.length; d--;) c.unshift(g[d][7]);U(u, c);
    } else u = P(g, t);return u;
  }function U(e, t) {
    var n,
        r,
        i = 0,
        o = t.length;for (e.deps = [], e.paths = []; i < o; i++) {
      e.paths.push(r = t[i]);for (n in r) '_jsvto' !== n && r.hasOwnProperty(n) && r[n].length && !r[n].skp && (e.deps = e.deps.concat(r[n]));
    }
  }function q(e, t, n) {
    return [e.slice(0, -1), t.slice(0, -1), n.slice(0, -1)];
  }function J(e, t) {
    return '\n\t' + (t ? t + ':{' : '') + 'args:[' + e[0] + ']' + (e[1] || !t ? ',\n\tprops:{' + e[1] + '}' : '') + (e[2] ? ',\n\tctx:{' + e[2] + '}' : '');
  }function K(e, t, n) {
    function r(r, m, w, x, _, b, y, k, j, C, T, A, V, R, $, M, E, N, F, S) {
      function U(e, n, r, s, a, d, p, c) {
        var f = '.' === r;if (r && (_ = _.slice(n.length), /^\.?constructor$/.test(c || _) && I(e), f || (e = (s ? 'view.hlp("' + s + '")' : a ? 'view' : 'data') + (c ? (d ? '.' + d : s ? '' : a ? '' : '.' + r) + (p || '') : (c = s ? '' : a ? d || '' : r, '')), e += c ? '.' + c : '', e = n + ('view.data' === e.slice(0, 9) ? e.slice(5) : e)), u)) {
          if (K = 'linkTo' === i ? o = t._jsvto = t._jsvto || [] : l.bd, P = f && K[K.length - 1]) {
            if (P._jsv) {
              for (; P.sb;) P = P.sb;P.bnd && (_ = '^' + _.slice(1)), P.sb = _, P.bnd = P.bnd || '^' === _.charAt(0);
            }
          } else K.push(_);h[g] = F + (f ? 1 : 0);
        }return e;
      }x && !k && (_ = x + _), b = b || '', w = w || m || A, _ = _ || j, C = C || E || '';var q,
          J,
          K,
          P,
          B,
          L = ')';if ('[' === C && (C = '[j._sq(', L = ')]'), !y || d || a) {
        if (u && M && !d && !a && (!i || s || o) && (q = h[g - 1], S.length - 1 > F - (q || 0))) {
          if (q = S.slice(q, F + r.length), J !== !0) if (K = o || p[g - 1].bd, P = K[K.length - 1], P && P.prm) {
            for (; P.sb && P.sb.prm;) P = P.sb;B = P.sb = { path: P.sb, bnd: P.bnd };
          } else K.push(B = { path: K.pop() });M = pe + ':' + q + ' onerror=\'\'' + ce, J = f[M], J || (f[M] = !0, f[M] = J = O(M, n, !0)), J !== !0 && B && (B._jsv = J, B.prm = l.bd, B.bnd = B.bnd || B.path && B.path.indexOf('^') >= 0);
        }return d ? (d = !V, d ? r : A + '"') : a ? (a = !R, a ? r : A + '"') : (w ? (h[g] = F++, l = p[++g] = { bd: [] }, w) : '') + (N ? g ? '' : (c = S.slice(c, F), (i ? (i = s = o = !1, '\b') : '\b,') + c + (c = F + r.length, u && t.push(l.bd = []), '\b')) : k ? (g && I(e), u && t.pop(), i = _, s = x, c = F + r.length, u && (u = l.bd = t[i] = [], u.skp = !x), _ + ':') : _ ? _.split('^').join('.').replace(we, U) + (C ? (l = p[++g] = { bd: [] }, v[g] = L, C) : b) : b ? b : $ ? ($ = v[g] || $, v[g] = !1, l = p[--g], $ + (C ? (l = p[++g], v[g] = L, C) : '')) : T ? (v[g] || I(e), ',') : m ? '' : (d = V, a = R, '"'));
      }I(e);
    }var i,
        o,
        s,
        a,
        d,
        u = t && t[0],
        l = { bd: u },
        p = { 0: l },
        c = 0,
        f = (n ? n.links : u && (u.links = u.links || {})) || W.tmpl.links,
        g = 0,
        v = {},
        h = {},
        m = (e + (n ? ' ' : '')).replace(xe, r);return !g && m || I(e);
  }function P(e, t, n) {
    var r,
        i,
        o,
        s,
        a,
        d,
        u,
        l,
        p,
        c,
        f,
        g,
        v,
        h,
        m,
        w,
        x,
        _,
        b,
        y,
        k,
        j,
        C,
        T,
        A,
        R,
        $,
        M,
        E,
        N,
        F = 0,
        S = de.useViews || t.useViews || t.tags || t.templates || t.helpers || t.converters,
        O = '',
        q = {},
        K = e.length;for ('' + t === t ? (_ = n ? 'data-link="' + t.replace(_e, ' ').slice(1, -1) + '"' : t, t = 0) : (_ = t.tmplName || 'unnamed', t.allowCode && (q.allowCode = !0), t.debug && (q.debug = !0), f = t.bnds, x = t.tmpls), r = 0; r < K; r++) if (i = e[r], '' + i === i) O += '\n+"' + i + '"';else if (o = i[0], '*' === o) O += ';\n' + i[1] + '\nret=ret';else {
      if (s = i[1], k = !n && i[2], a = J(i[3], 'params') + '},' + J(v = i[4]), M = i[5], N = i[6], j = i[8] && i[8].replace(be, '$1'), (A = 'else' === o) ? g && g.push(i[7]) : (F = 0, f && (g = i[7]) && (g = [g], F = f.push(1))), S = S || v[1] || v[2] || g || /view.(?!index)/.test(v[0]), (R = ':' === o) ? s && (o = s === Ne ? '>' : s + o) : (k && (b = V(j, q), b.tmplName = _ + '/' + o, b.useViews = b.useViews || S, P(k, b), S = b.useViews, x.push(b)), A || (y = o, S = S || o && (!oe[o] || !oe[o].flow), T = O, O = ''), C = e[r + 1], C = C && 'else' === C[0]), E = M ? ';\ntry{\nret+=' : '\n+', h = '', m = '', R && (g || N || s && s !== Ne)) {
        if ($ = new Function('data,view,j,u', ' // ' + _ + ' ' + F + ' ' + o + '\nreturn {' + a + '};'), $._er = M, $._tag = o, n) return $;U($, g), w = 'c("' + s + '",view,', c = !0, h = w + F + ',', m = ')';
      }if (O += R ? (n ? (M ? 'try{\n' : '') + 'return ' : E) + (c ? (c = void 0, S = p = !0, w + (g ? (f[F - 1] = $, F) : '{' + a + '}') + ')') : '>' === o ? (u = !0, 'h(' + v[0] + ')') : (l = !0, '((v=' + v[0] + ')!=null?v:' + (n ? 'null)' : '"")'))) : (d = !0, '\n{view:view,tmpl:' + (k ? x.length : '0') + ',' + a + '},'), y && !C) {
        if (O = '[' + O.slice(0, -1) + ']', w = 't("' + y + '",view,this,', n || g) {
          if (O = new Function('data,view,j,u', ' // ' + _ + ' ' + F + ' ' + y + '\nreturn ' + O + ';'), O._er = M, O._tag = y, g && U(f[F - 1] = O, g), n) return O;h = w + F + ',undefined,', m = ')';
        }O = T + E + w + (F || O) + ')', g = 0, y = 0;
      }M && (S = !0, O += ';\n}catch(e){ret' + (n ? 'urn ' : '+=') + h + 'j._err(e,view,' + M + ')' + m + ';}' + (n ? '' : 'ret=ret'));
    }O = '// ' + _ + '\nvar v' + (d ? ',t=j._tag' : '') + (p ? ',c=j._cnvt' : '') + (u ? ',h=j._html' : '') + (n ? ';\n' : ',ret=""\n') + (q.debug ? 'debugger;' : '') + O + (n ? '\n' : ';\nreturn ret;'), ae.debugMode !== !1 && (O = 'try {\n' + O + '\n}catch(e){\nreturn j._err(e, view);\n}');try {
      O = new Function('data,view,j,u', O);
    } catch (B) {
      I('Compiled template code:\n\n' + O + '\n: "' + B.message + '"');
    }return t && (t.fn = O, t.useViews = !!S), O;
  }function B(e, t) {
    return e && e !== t ? t ? u(u({}, t), e) : e : t && u({}, t);
  }function L(e) {
    return Ee[e] || (Ee[e] = '&#' + e.charCodeAt(0) + ';');
  }function Q(e) {
    var t,
        n,
        r = [];if (typeof e === Fe) for (t in e) n = e[t], t !== Y && e.hasOwnProperty(t) && !ee(n) && r.push({ key: t, prop: n });return r;
  }function H(e, n, r) {
    var i = this.jquery && (this[0] || S('Unknown template')),
        o = i.getAttribute(Se);return E.call(o ? t.data(i)[Ie] : ne(i), e, n, r);
  }function D(e) {
    return void 0 != e ? Ae.test(e) && ('' + e).replace($e, L) || e : '';
  }var Z = t === !1;t = t && t.fn ? t : e.jQuery;var z,
      G,
      W,
      X,
      Y,
      ee,
      te,
      ne,
      re,
      ie,
      oe,
      se,
      ae,
      de,
      ue,
      le,
      pe,
      ce,
      fe,
      ge,
      ve,
      he,
      me = 'v0.9.83',
      we = /^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
      xe = /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(!*?[#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?[#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=\s*[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g,
      _e = /[ \t]*(\r\n|\n|\r)/g,
      be = /\\(['"])/g,
      ye = /['"\\]/g,
      ke = /(?:\x08|^)(onerror:)?(?:(~?)(([\w$_\.]+):)?([^\x08]+))\x08(,)?([^\x08]+)/gi,
      je = /^if\s/,
      Ce = /<(\w+)[>\s]/,
      Te = /[\x00`><"'&=]/g,
      Ae = /[\x00`><\"'&=]/,
      Ve = /^on[A-Z]|^convert(Back)?$/,
      Re = /^\#\d+_`[\s\S]*\/\d+_`$/,
      $e = Te,
      Me = 0,
      Ee = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\0': '&#0;', '\'': '&#39;', '"': '&#34;', '`': '&#96;', '=': '&#61;' },
      Ne = 'html',
      Fe = 'object',
      Se = 'data-jsv-tmpl',
      Ie = 'jsvTmpl',
      Oe = 'For #index in nested block use #getIndex().',
      Ue = {},
      qe = e.jsrender,
      Je = qe && t && !t.render,
      Ke = { template: { compile: j }, tag: { compile: y }, viewModel: { compile: A }, helper: {}, converter: {} };if (X = { jsviews: me, sub: { View: _, Err: d, tmplFn: O, parse: K, extend: u, extendCtx: B, syntaxErr: I, onStore: {}, addSetting: $, settings: { allowCode: !1 }, advSet: s, _ths: i, _tg: function () {}, _cnvt: h, _tag: x, _er: S, _err: F, _html: D, _cp: o, _sq: function (e) {
        return 'constructor' === e && I(''), e;
      } }, settings: { delimiters: l, advanced: function (e) {
        return e ? (u(de, e), se.advSet(), ue) : de;
      } }, getCtx: o, map: M }, (d.prototype = new Error()).constructor = d, c.depends = function () {
    return [this.get('item'), 'index'];
  }, f.depends = 'index', _.prototype = { get: p, getIndex: f, getRsc: w, getTmpl: v, hlp: g, _is: 'view' }, se = X.sub, ue = X.settings, !(qe || t && t.render)) {
    for (z in Ke) R(z, Ke[z]);re = X.converters, ie = X.helpers, oe = X.tags, se._tg.prototype = { baseApply: k, cvtArgs: m }, W = se.topView = new _(), t ? (t.fn.render = H, Y = t.expando, t.observable && (u(se, t.views.sub), X.map = t.views.map)) : (t = {}, Z && (e.jsrender = t), t.renderFile = t.__express = t.compile = function () {
      throw 'Node.js: use npm jsrender, or jsrender-node.js';
    }, t.isFunction = function (e) {
      return 'function' == typeof e;
    }, t.isArray = Array.isArray || function (e) {
      return '[object Array]' === {}.toString.call(e);
    }, se._jq = function (e) {
      e !== t && (u(e, t), t = e, t.fn.render = H, delete t.jsrender, Y = t.expando);
    }, t.jsrender = me), ae = se.settings, ae.allowCode = !1, ee = t.isFunction, t.render = Ue, t.views = X, t.templates = ne = X.templates;for (ve in ae) $(ve);(ue.debugMode = function (e) {
      return void 0 === e ? ae.debugMode : (ae.debugMode = e, ae.onError = e + '' === e ? new Function('', 'return \'' + e + '\';') : ee(e) ? e : void 0, ue);
    })(!1), de = ae.advanced = { useViews: !1, _jsv: !1 }, oe({ 'if': { render: function (e) {
          var t = this,
              n = t.tagCtx,
              r = t.rendering.done || !e && (arguments.length || !n.index) ? '' : (t.rendering.done = !0, t.selected = n.index, n.render(n.view, !0));return r;
        }, flow: !0 }, 'for': { render: function (e) {
          var t,
              n = !arguments.length,
              r = this,
              i = r.tagCtx,
              o = '',
              s = 0;return r.rendering.done || (t = n ? i.view.data : e, void 0 !== t && (o += i.render(t, n), s += te(t) ? t.length : 1), (r.rendering.done = s) && (r.selected = i.index)), o;
        }, flow: !0 }, props: { baseTag: 'for', dataMap: M(Q), flow: !0 }, include: { flow: !0 }, '*': { render: o, flow: !0 }, ':*': { render: o, flow: !0 }, dbg: ie.dbg = re.dbg = a }), re({ html: D, attr: D, url: function (e) {
        return void 0 != e ? encodeURI('' + e) : null === e ? e : '';
      } });
  }return ae = se.settings, te = (t || qe).isArray, ue.delimiters('{{', '}}', '^'), Je && qe.views.sub._jq(t), t || qe;
}, window);
//# sourceMappingURL=jsrender.min.js.map
//# sourceMappingURL=jsrender.min.js.map

!function (e) {
  'use strict';
  function t(e, t) {
    if (this.createTextRange) {
      var a = this.createTextRange();a.collapse(!0), a.moveStart('character', e), a.moveEnd('character', t - e), a.select();
    } else this.setSelectionRange && (this.focus(), this.setSelectionRange(e, t));
  }function a(e) {
    var t = this.value.length;if (e = 'start' == e.toLowerCase() ? 'Start' : 'End', document.selection) {
      var a,
          i,
          n,
          l = document.selection.createRange();return a = l.duplicate(), a.expand('textedit'), a.setEndPoint('EndToEnd', l), i = a.text.length - l.text.length, n = i + l.text.length, 'Start' == e ? i : n;
    }return 'undefined' != typeof this['selection' + e] && (t = this['selection' + e]), t;
  }var i = { codes: { 46: 127, 188: 44, 109: 45, 190: 46, 191: 47, 192: 96, 220: 92, 222: 39, 221: 93, 219: 91, 173: 45, 187: 61, 186: 59, 189: 45, 110: 46 }, shifts: { 96: '~', 49: '!', 50: '@', 51: '#', 52: '$', 53: '%', 54: '^', 55: '&', 56: '*', 57: '(', 48: ')', 45: '_', 61: '+', 91: '{', 93: '}', 92: '|', 59: ':', 39: '"', 44: '<', 46: '>', 47: '?' } };e.fn.number = function (n, l, s, r) {
    r = 'undefined' == typeof r ? ',' : r, s = 'undefined' == typeof s ? '.' : s, l = 'undefined' == typeof l ? 0 : l;var u = '\\u' + ('0000' + s.charCodeAt(0).toString(16)).slice(-4),
        h = new RegExp('[^' + u + '0-9]', 'g'),
        o = new RegExp(u, 'g');return n === !0 ? this.is('input:text') ? this.on({ 'keydown.format': function (n) {
        var u = e(this),
            h = u.data('numFormat'),
            o = n.keyCode ? n.keyCode : n.which,
            c = '',
            v = a.apply(this, ['start']),
            d = a.apply(this, ['end']),
            p = '',
            f = !1;if (i.codes.hasOwnProperty(o) && (o = i.codes[o]), !n.shiftKey && o >= 65 && 90 >= o ? o += 32 : !n.shiftKey && o >= 69 && 105 >= o ? o -= 48 : n.shiftKey && i.shifts.hasOwnProperty(o) && (c = i.shifts[o]), '' == c && (c = String.fromCharCode(o)), 8 != o && 45 != o && 127 != o && c != s && !c.match(/[0-9]/)) {
          var g = n.keyCode ? n.keyCode : n.which;if (46 == g || 8 == g || 127 == g || 9 == g || 27 == g || 13 == g || (65 == g || 82 == g || 80 == g || 83 == g || 70 == g || 72 == g || 66 == g || 74 == g || 84 == g || 90 == g || 61 == g || 173 == g || 48 == g) && (n.ctrlKey || n.metaKey) === !0 || (86 == g || 67 == g || 88 == g) && (n.ctrlKey || n.metaKey) === !0 || g >= 35 && 39 >= g || g >= 112 && 123 >= g) return;return n.preventDefault(), !1;
        }if (0 == v && d == this.value.length ? 8 == o ? (v = d = 1, this.value = '', h.init = l > 0 ? -1 : 0, h.c = l > 0 ? -(l + 1) : 0, t.apply(this, [0, 0])) : c == s ? (v = d = 1, this.value = '0' + s + new Array(l + 1).join('0'), h.init = l > 0 ? 1 : 0, h.c = l > 0 ? -(l + 1) : 0) : 45 == o ? (v = d = 2, this.value = '-0' + s + new Array(l + 1).join('0'), h.init = l > 0 ? 1 : 0, h.c = l > 0 ? -(l + 1) : 0, t.apply(this, [2, 2])) : (h.init = l > 0 ? -1 : 0, h.c = l > 0 ? -l : 0) : h.c = d - this.value.length, h.isPartialSelection = v == d ? !1 : !0, l > 0 && c == s && v == this.value.length - l - 1) h.c++, h.init = Math.max(0, h.init), n.preventDefault(), f = this.value.length + h.c;else if (45 != o || 0 == v && 0 != this.value.indexOf('-')) {
          if (c == s) h.init = Math.max(0, h.init), n.preventDefault();else if (l > 0 && 127 == o && v == this.value.length - l - 1) n.preventDefault();else if (l > 0 && 8 == o && v == this.value.length - l) n.preventDefault(), h.c--, f = this.value.length + h.c;else if (l > 0 && 127 == o && v > this.value.length - l - 1) {
            if ('' === this.value) return;'0' != this.value.slice(v, v + 1) && (p = this.value.slice(0, v) + '0' + this.value.slice(v + 1), u.val(p)), n.preventDefault(), f = this.value.length + h.c;
          } else if (l > 0 && 8 == o && v > this.value.length - l) {
            if ('' === this.value) return;'0' != this.value.slice(v - 1, v) && (p = this.value.slice(0, v - 1) + '0' + this.value.slice(v), u.val(p)), n.preventDefault(), h.c--, f = this.value.length + h.c;
          } else 127 == o && this.value.slice(v, v + 1) == r ? n.preventDefault() : 8 == o && this.value.slice(v - 1, v) == r ? (n.preventDefault(), h.c--, f = this.value.length + h.c) : l > 0 && v == d && this.value.length > l + 1 && v > this.value.length - l - 1 && isFinite(+c) && !n.metaKey && !n.ctrlKey && !n.altKey && 1 === c.length && (p = d === this.value.length ? this.value.slice(0, v - 1) : this.value.slice(0, v) + this.value.slice(v + 1), this.value = p, f = v);
        } else n.preventDefault();f !== !1 && t.apply(this, [f, f]), u.data('numFormat', h);
      }, 'keyup.format': function (i) {
        var n,
            s = e(this),
            r = s.data('numFormat'),
            u = i.keyCode ? i.keyCode : i.which,
            h = a.apply(this, ['start']),
            o = a.apply(this, ['end']);0 !== h || 0 !== o || 189 !== u && 109 !== u || (s.val('-' + s.val()), h = 1, r.c = 1 - this.value.length, r.init = 1, s.data('numFormat', r), n = this.value.length + r.c, t.apply(this, [n, n])), '' === this.value || (48 > u || u > 57) && (96 > u || u > 105) && 8 !== u && 46 !== u && 110 !== u || (s.val(s.val()), l > 0 && (r.init < 1 ? (h = this.value.length - l - (r.init < 0 ? 1 : 0), r.c = h - this.value.length, r.init = 1, s.data('numFormat', r)) : h > this.value.length - l && 8 != u && (r.c++, s.data('numFormat', r))), 46 != u || r.isPartialSelection || (r.c++, s.data('numFormat', r)), n = this.value.length + r.c, t.apply(this, [n, n]));
      }, 'paste.format': function (t) {
        var a = e(this),
            i = t.originalEvent,
            n = null;return window.clipboardData && window.clipboardData.getData ? n = window.clipboardData.getData('Text') : i.clipboardData && i.clipboardData.getData && (n = i.clipboardData.getData('text/plain')), a.val(n), t.preventDefault(), !1;
      } }).each(function () {
      var t = e(this).data('numFormat', { c: -(l + 1), decimals: l, thousands_sep: r, dec_point: s, regex_dec_num: h, regex_dec: o, init: this.value.indexOf('.') ? !0 : !1 });'' !== this.value && t.val(t.val());
    }) : this.each(function () {
      var t = e(this),
          a = +t.text().replace(h, '').replace(o, '.');t.number(isFinite(a) ? +a : 0, l, s, r);
    }) : this.text(e.number.apply(window, arguments));
  };var n = null,
      l = null;e.isPlainObject(e.valHooks.text) ? (e.isFunction(e.valHooks.text.get) && (n = e.valHooks.text.get), e.isFunction(e.valHooks.text.set) && (l = e.valHooks.text.set)) : e.valHooks.text = {}, e.valHooks.text.get = function (t) {
    var a,
        i = e(t),
        l = i.data('numFormat');return l ? '' === t.value ? '' : (a = +t.value.replace(l.regex_dec_num, '').replace(l.regex_dec, '.'), (0 === t.value.indexOf('-') ? '-' : '') + (isFinite(a) ? a : 0)) : e.isFunction(n) ? n(t) : void 0;
  }, e.valHooks.text.set = function (t, a) {
    var i = e(t),
        n = i.data('numFormat');if (n) {
      var s = e.number(a, n.decimals, n.dec_point, n.thousands_sep);return e.isFunction(l) ? l(t, s) : t.value = s;
    }return e.isFunction(l) ? l(t, a) : void 0;
  }, e.number = function (e, t, a, i) {
    i = 'undefined' == typeof i ? '1000' !== new Number(1e3).toLocaleString() ? new Number(1e3).toLocaleString().charAt(1) : '' : i, a = 'undefined' == typeof a ? new Number(.1).toLocaleString().charAt(1) : a, t = isFinite(+t) ? Math.abs(t) : 0;var n = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4),
        l = '\\u' + ('0000' + i.charCodeAt(0).toString(16)).slice(-4);e = (e + '').replace('.', a).replace(new RegExp(l, 'g'), '').replace(new RegExp(n, 'g'), '.').replace(new RegExp('[^0-9+-Ee.]', 'g'), '');var s = isFinite(+e) ? +e : 0,
        r = '',
        u = function (e, t) {
      return '' + +(Math.round(('' + e).indexOf('e') > 0 ? e : e + 'e+' + t) + 'e-' + t);
    };return r = (t ? u(s, t) : '' + Math.round(s)).split('.'), r[0].length > 3 && (r[0] = r[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, i)), (r[1] || '').length < t && (r[1] = r[1] || '', r[1] += new Array(t - r[1].length + 1).join('0')), r.join(a);
  };
}(jQuery);
//# sourceMappingURL=jquery.number.min.js.map
//# sourceMappingURL=jquery.number.min.js.map

/*! jQuery UI - v1.11.4+CommonJS - 2015-08-28
* http://jqueryui.com
* Includes: widget.js
* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

(function (factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {

		// Node/CommonJS
		factory(require('jquery'));
	} else {

		// Browser globals
		factory(jQuery);
	}
})(function ($) {
	/*!
  * jQuery UI Widget 1.11.4
  * http://jqueryui.com
  *
  * Copyright jQuery Foundation and other contributors
  * Released under the MIT license.
  * http://jquery.org/license
  *
  * http://api.jqueryui.com/jQuery.widget/
  */

	var widget_uuid = 0,
	    widget_slice = Array.prototype.slice;

	$.cleanData = function (orig) {
		return function (elems) {
			var events, elem, i;
			for (i = 0; (elem = elems[i]) != null; i++) {
				try {

					// Only trigger remove when necessary to save time
					events = $._data(elem, 'events');
					if (events && events.remove) {
						$(elem).triggerHandler('remove');
					}

					// http://bugs.jquery.com/ticket/8235
				} catch (e) {}
			}
			orig(elems);
		};
	}($.cleanData);

	$.widget = function (name, base, prototype) {
		var fullName,
		    existingConstructor,
		    constructor,
		    basePrototype,

		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		    namespace = name.split('.')[0];

		name = name.split('.')[1];
		fullName = namespace + '-' + name;

		if (!prototype) {
			prototype = base;
			base = $.Widget;
		}

		// create selector for plugin
		$.expr[':'][fullName.toLowerCase()] = function (elem) {
			return !!$.data(elem, fullName);
		};

		$[namespace] = $[namespace] || {};
		existingConstructor = $[namespace][name];
		constructor = $[namespace][name] = function (options, element) {
			// allow instantiation without "new" keyword
			if (!this._createWidget) {
				return new constructor(options, element);
			}

			// allow instantiation without initializing for simple inheritance
			// must use "new" keyword (the code above always passes args)
			if (arguments.length) {
				this._createWidget(options, element);
			}
		};
		// extend with the existing constructor to carry over any static properties
		$.extend(constructor, existingConstructor, {
			version: prototype.version,
			// copy the object used to create the prototype in case we need to
			// redefine the widget later
			_proto: $.extend({}, prototype),
			// track widgets that inherit from this widget in case this widget is
			// redefined after a widget inherits from it
			_childConstructors: []
		});

		basePrototype = new base();
		// we need to make the options hash a property directly on the new instance
		// otherwise we'll modify the options hash on the prototype that we're
		// inheriting from
		basePrototype.options = $.widget.extend({}, basePrototype.options);
		$.each(prototype, function (prop, value) {
			if (!$.isFunction(value)) {
				proxiedPrototype[prop] = value;
				return;
			}
			proxiedPrototype[prop] = function () {
				var _super = function () {
					return base.prototype[prop].apply(this, arguments);
				},
				    _superApply = function (args) {
					return base.prototype[prop].apply(this, args);
				};
				return function () {
					var __super = this._super,
					    __superApply = this._superApply,
					    returnValue;

					this._super = _super;
					this._superApply = _superApply;

					returnValue = value.apply(this, arguments);

					this._super = __super;
					this._superApply = __superApply;

					return returnValue;
				};
			}();
		});
		constructor.prototype = $.widget.extend(basePrototype, {
			// TODO: remove support for widgetEventPrefix
			// always use the name + a colon as the prefix, e.g., draggable:start
			// don't prefix for widgets that aren't DOM-based
			widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
		}, proxiedPrototype, {
			constructor: constructor,
			namespace: namespace,
			widgetName: name,
			widgetFullName: fullName
		});

		// If this widget is being redefined then we need to find all widgets that
		// are inheriting from it and redefine all of them so that they inherit from
		// the new version of this widget. We're essentially trying to replace one
		// level in the prototype chain.
		if (existingConstructor) {
			$.each(existingConstructor._childConstructors, function (i, child) {
				var childPrototype = child.prototype;

				// redefine the child widget using the same prototype that was
				// originally used, but inherit from the new version of the base
				$.widget(childPrototype.namespace + '.' + childPrototype.widgetName, constructor, child._proto);
			});
			// remove the list of existing child constructors from the old constructor
			// so the old child constructors can be garbage collected
			delete existingConstructor._childConstructors;
		} else {
			base._childConstructors.push(constructor);
		}

		$.widget.bridge(name, constructor);

		return constructor;
	};

	$.widget.extend = function (target) {
		var input = widget_slice.call(arguments, 1),
		    inputIndex = 0,
		    inputLength = input.length,
		    key,
		    value;
		for (; inputIndex < inputLength; inputIndex++) {
			for (key in input[inputIndex]) {
				value = input[inputIndex][key];
				if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
					// Clone objects
					if ($.isPlainObject(value)) {
						target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend({}, value);
						// Copy everything else by reference
					} else {
						target[key] = value;
					}
				}
			}
		}
		return target;
	};

	$.widget.bridge = function (name, object) {
		var fullName = object.prototype.widgetFullName || name;
		$.fn[name] = function (options) {
			var isMethodCall = typeof options === 'string',
			    args = widget_slice.call(arguments, 1),
			    returnValue = this;

			if (isMethodCall) {
				this.each(function () {
					var methodValue,
					    instance = $.data(this, fullName);
					if (options === 'instance') {
						returnValue = instance;
						return false;
					}
					if (!instance) {
						return $.error('cannot call methods on ' + name + ' prior to initialization; ' + 'attempted to call method \'' + options + '\'');
					}
					if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
						return $.error('no such method \'' + options + '\' for ' + name + ' widget instance');
					}
					methodValue = instance[options].apply(instance, args);
					if (methodValue !== instance && methodValue !== undefined) {
						returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
						return false;
					}
				});
			} else {

				// Allow multiple hashes to be passed on init
				if (args.length) {
					options = $.widget.extend.apply(null, [options].concat(args));
				}

				this.each(function () {
					var instance = $.data(this, fullName);
					if (instance) {
						instance.option(options || {});
						if (instance._init) {
							instance._init();
						}
					} else {
						$.data(this, fullName, new object(options, this));
					}
				});
			}

			return returnValue;
		};
	};

	$.Widget = function () /* options, element */{};
	$.Widget._childConstructors = [];

	$.Widget.prototype = {
		widgetName: 'widget',
		widgetEventPrefix: '',
		defaultElement: '<div>',
		options: {
			disabled: false,

			// callbacks
			create: null
		},
		_createWidget: function (options, element) {
			element = $(element || this.defaultElement || this)[0];
			this.element = $(element);
			this.uuid = widget_uuid++;
			this.eventNamespace = '.' + this.widgetName + this.uuid;

			this.bindings = $();
			this.hoverable = $();
			this.focusable = $();

			if (element !== this) {
				$.data(element, this.widgetFullName, this);
				this._on(true, this.element, {
					remove: function (event) {
						if (event.target === element) {
							this.destroy();
						}
					}
				});
				this.document = $(element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element);
				this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
			}

			this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);

			this._create();
			this._trigger('create', null, this._getCreateEventData());
			this._init();
		},
		_getCreateOptions: $.noop,
		_getCreateEventData: $.noop,
		_create: $.noop,
		_init: $.noop,

		destroy: function () {
			this._destroy();
			// we can probably remove the unbind calls in 2.0
			// all event bindings should go through this._on()
			this.element.unbind(this.eventNamespace).removeData(this.widgetFullName)
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData($.camelCase(this.widgetFullName));
			this.widget().unbind(this.eventNamespace).removeAttr('aria-disabled').removeClass(this.widgetFullName + '-disabled ' + 'ui-state-disabled');

			// clean up events and states
			this.bindings.unbind(this.eventNamespace);
			this.hoverable.removeClass('ui-state-hover');
			this.focusable.removeClass('ui-state-focus');
		},
		_destroy: $.noop,

		widget: function () {
			return this.element;
		},

		option: function (key, value) {
			var options = key,
			    parts,
			    curOption,
			    i;

			if (arguments.length === 0) {
				// don't return a reference to the internal hash
				return $.widget.extend({}, this.options);
			}

			if (typeof key === 'string') {
				// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
				options = {};
				parts = key.split('.');
				key = parts.shift();
				if (parts.length) {
					curOption = options[key] = $.widget.extend({}, this.options[key]);
					for (i = 0; i < parts.length - 1; i++) {
						curOption[parts[i]] = curOption[parts[i]] || {};
						curOption = curOption[parts[i]];
					}
					key = parts.pop();
					if (arguments.length === 1) {
						return curOption[key] === undefined ? null : curOption[key];
					}
					curOption[key] = value;
				} else {
					if (arguments.length === 1) {
						return this.options[key] === undefined ? null : this.options[key];
					}
					options[key] = value;
				}
			}

			this._setOptions(options);

			return this;
		},
		_setOptions: function (options) {
			var key;

			for (key in options) {
				this._setOption(key, options[key]);
			}

			return this;
		},
		_setOption: function (key, value) {
			this.options[key] = value;

			if (key === 'disabled') {
				this.widget().toggleClass(this.widgetFullName + '-disabled', !!value);

				// If the widget is becoming disabled, then nothing is interactive
				if (value) {
					this.hoverable.removeClass('ui-state-hover');
					this.focusable.removeClass('ui-state-focus');
				}
			}

			return this;
		},

		enable: function () {
			return this._setOptions({ disabled: false });
		},
		disable: function () {
			return this._setOptions({ disabled: true });
		},

		_on: function (suppressDisabledCheck, element, handlers) {
			var delegateElement,
			    instance = this;

			// no suppressDisabledCheck flag, shuffle arguments
			if (typeof suppressDisabledCheck !== 'boolean') {
				handlers = element;
				element = suppressDisabledCheck;
				suppressDisabledCheck = false;
			}

			// no element argument, shuffle and use this.element
			if (!handlers) {
				handlers = element;
				element = this.element;
				delegateElement = this.widget();
			} else {
				element = delegateElement = $(element);
				this.bindings = this.bindings.add(element);
			}

			$.each(handlers, function (event, handler) {
				function handlerProxy() {
					// allow widgets to customize the disabled handling
					// - disabled as an array instead of boolean
					// - disabled class as method for disabling individual parts
					if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass('ui-state-disabled'))) {
						return;
					}
					return (typeof handler === 'string' ? instance[handler] : handler).apply(instance, arguments);
				}

				// copy the guid so direct unbinding works
				if (typeof handler !== 'string') {
					handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
				}

				var match = event.match(/^([\w:-]*)\s*(.*)$/),
				    eventName = match[1] + instance.eventNamespace,
				    selector = match[2];
				if (selector) {
					delegateElement.delegate(selector, eventName, handlerProxy);
				} else {
					element.bind(eventName, handlerProxy);
				}
			});
		},

		_off: function (element, eventName) {
			eventName = (eventName || '').split(' ').join(this.eventNamespace + ' ') + this.eventNamespace;
			element.unbind(eventName).undelegate(eventName);

			// Clear the stack to avoid memory leaks (#10056)
			this.bindings = $(this.bindings.not(element).get());
			this.focusable = $(this.focusable.not(element).get());
			this.hoverable = $(this.hoverable.not(element).get());
		},

		_delay: function (handler, delay) {
			function handlerProxy() {
				return (typeof handler === 'string' ? instance[handler] : handler).apply(instance, arguments);
			}
			var instance = this;
			return setTimeout(handlerProxy, delay || 0);
		},

		_hoverable: function (element) {
			this.hoverable = this.hoverable.add(element);
			this._on(element, {
				mouseenter: function (event) {
					$(event.currentTarget).addClass('ui-state-hover');
				},
				mouseleave: function (event) {
					$(event.currentTarget).removeClass('ui-state-hover');
				}
			});
		},

		_focusable: function (element) {
			this.focusable = this.focusable.add(element);
			this._on(element, {
				focusin: function (event) {
					$(event.currentTarget).addClass('ui-state-focus');
				},
				focusout: function (event) {
					$(event.currentTarget).removeClass('ui-state-focus');
				}
			});
		},

		_trigger: function (type, event, data) {
			var prop,
			    orig,
			    callback = this.options[type];

			data = data || {};
			event = $.Event(event);
			event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
			// the original event may come from any element
			// so we need to reset the target on the new event
			event.target = this.element[0];

			// copy original event properties over to the new event
			orig = event.originalEvent;
			if (orig) {
				for (prop in orig) {
					if (!(prop in event)) {
						event[prop] = orig[prop];
					}
				}
			}

			this.element.trigger(event, data);
			return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
		}
	};

	$.each({ show: 'fadeIn', hide: 'fadeOut' }, function (method, defaultEffect) {
		$.Widget.prototype['_' + method] = function (element, options, callback) {
			if (typeof options === 'string') {
				options = { effect: options };
			}
			var hasOptions,
			    effectName = !options ? method : options === true || typeof options === 'number' ? defaultEffect : options.effect || defaultEffect;
			options = options || {};
			if (typeof options === 'number') {
				options = { duration: options };
			}
			hasOptions = !$.isEmptyObject(options);
			options.complete = callback;
			if (options.delay) {
				element.delay(options.delay);
			}
			if (hasOptions && $.effects && $.effects.effect[effectName]) {
				element[method](options);
			} else if (effectName !== method && element[effectName]) {
				element[effectName](options.duration, options.easing, callback);
			} else {
				element.queue(function (next) {
					$(this)[method]();
					if (callback) {
						callback.call(element[0]);
					}
					next();
				});
			}
		};
	});

	var widget = $.widget;
});
//# sourceMappingURL=jquery.ui.widget.js.map

/*
 * jQuery Iframe Transport Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, require, window, document */

(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(require('jquery'));
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
})(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:

    var counter = 0;

    // The iframe transport accepts four additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s),
    //  can be a string or an array of strings.
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
    // options.initialIframeSrc: the URL of the initial iframe src,
    //  by default set to "javascript:false;"
    $.ajaxTransport('iframe', function (options) {
        if (options.async) {
            // javascript:false as initial iframe src
            // prevents warning popups on HTTPS in IE6:
            /*jshint scripturl: true */
            var initialIframeSrc = options.initialIframeSrc || 'javascript:false;',

            /*jshint scripturl: false */
            form,
                iframe,
                addParamChar;
            return {
                send: function (_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    form.attr('accept-charset', options.formAcceptCharset);
                    addParamChar = /\?/.test(options.url) ? '&' : '?';
                    // XDomainRequest only supports GET and POST:
                    if (options.type === 'DELETE') {
                        options.url = options.url + addParamChar + '_method=DELETE';
                        options.type = 'POST';
                    } else if (options.type === 'PUT') {
                        options.url = options.url + addParamChar + '_method=PUT';
                        options.type = 'POST';
                    } else if (options.type === 'PATCH') {
                        options.url = options.url + addParamChar + '_method=PATCH';
                        options.type = 'POST';
                    }
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    counter += 1;
                    iframe = $('<iframe src="' + initialIframeSrc + '" name="iframe-transport-' + counter + '"></iframe>').bind('load', function () {
                        var fileInputClones,
                            paramNames = $.isArray(options.paramName) ? options.paramName : [options.paramName];
                        iframe.unbind('load').bind('load', function () {
                            var response;
                            // Wrap in a try/catch block to catch exceptions thrown
                            // when trying to access cross-domain iframe contents:
                            try {
                                response = iframe.contents();
                                // Google Chrome and Firefox do not throw an
                                // exception when calling iframe.contents() on
                                // cross-domain requests, so we unify the response:
                                if (!response.length || !response[0].firstChild) {
                                    throw new Error();
                                }
                            } catch (e) {
                                response = undefined;
                            }
                            // The complete callback returns the
                            // iframe content document as response object:
                            completeCallback(200, 'success', { 'iframe': response });
                            // Fix for IE endless progress bar activity bug
                            // (happens on form submits to iframe targets):
                            $('<iframe src="' + initialIframeSrc + '"></iframe>').appendTo(form);
                            window.setTimeout(function () {
                                // Removing the form in a setTimeout call
                                // allows Chrome's developer tools to display
                                // the response result
                                form.remove();
                            }, 0);
                        });
                        form.prop('target', iframe.prop('name')).prop('action', options.url).prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>').prop('name', field.name).val(field.value).appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length && options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function (index) {
                                    $(this).prop('name', paramNames[index] || options.paramName);
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form.append(options.fileInput).prop('enctype', 'multipart/form-data')
                            // enctype must be set as encoding for IE:
                            .prop('encoding', 'multipart/form-data');
                            // Remove the HTML5 form attribute from the input(s):
                            options.fileInput.removeAttr('form');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                // Restore the original name and form properties:
                                $(input).prop('name', clone.prop('name')).attr('form', clone.attr('form'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe.unbind('load').prop('src', initialIframeSrc);
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, xml
    // and script.
    // Please note that the Content-Type for JSON responses has to be text/plain
    // or text/html, if the browser doesn't include application/json in the
    // Accept header, else IE will show a download dialog.
    // The Content-Type for XML responses on the other hand has to be always
    // application/xml or text/xml, so IE properly parses the XML response.
    // See also
    // https://github.com/blueimp/jQuery-File-Upload/wiki/Setup#content-type-negotiation
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return iframe && $(iframe[0].body).text();
            },
            'iframe json': function (iframe) {
                return iframe && $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function (iframe) {
                return iframe && $(iframe[0].body).html();
            },
            'iframe xml': function (iframe) {
                var xmlDoc = iframe && iframe[0];
                return xmlDoc && $.isXMLDoc(xmlDoc) ? xmlDoc : $.parseXML(xmlDoc.XMLDocument && xmlDoc.XMLDocument.xml || $(xmlDoc.body).html());
            },
            'iframe script': function (iframe) {
                return iframe && $.globalEval($(iframe[0].body).text());
            }
        }
    });
});
//# sourceMappingURL=jquery.iframe-transport.js.map
