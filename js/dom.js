(function() {
  'use strict';

  function DOM(elements) {
    if (!(this instanceof DOM))
      return new DOM (elements);
    this.element = document.querySelectorAll(elements);
  }


  DOM.prototype.on = function on(event, callback) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.addEventListener(event, callback, false);
    })
  };

  DOM.prototype.off = function off(event, callback) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.removeEventListener(event, callback, false);
    })
  };

  DOM.prototype.get = function get(index) {
    if (!index)
      return this.element[0];
    return this.element[index];
  };

  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.element, arguments);
  }

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments);
  }

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
  }

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
  }

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  }

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.element, arguments);
  }

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
  }

  DOM.isArray = function isArray(value) {
    return Object.prototype.toString.call( value ) === '[object Array]';
  }

  DOM.isObject = function isObject(value) {
    return Object.prototype.toString.call( value ) === '[object Object]';
  }

  DOM.isFunction = function isFunction(value) {
    return Object.prototype.toString.call( value ) === '[object Function]';
  }

  DOM.isNumber = function isNumber(value) {
    return Object.prototype.toString.call( value ) === '[object Number]';
  }

  DOM.isString = function isString(value) {
    return Object.prototype.toString.call( value ) === '[object String]';
  }

  DOM.isBoolean = function isBoolean(value) {
    return Object.prototype.toString.call( value ) === '[object Boolean]';
  }

  DOM.isNull = function isNull(value) {
    return Object.prototype.toString.call( value ) === '[object Null]'
    || Object.prototype.toString.call( value ) === '[object Undefined]';
  }

  window.DOM = DOM;
})();
