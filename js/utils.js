'use strict';

(function () {
  var KeyboardKey = {
    ESC: 'Escape',
    ENTER: 'Enter'
  };
  var MouseKey = {
    MAIN: 0
  };


  var getRandomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
  };

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomArray = function (array) {
    var anotherArray = [];

    array.forEach(function (item) {
      if (window.utils.getRandomInteger(0, 1) === 1) {
        anotherArray.push(item);
      }
    });

    return anotherArray;
  };

  var removeChildren = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  var setDisabled = function (element) {
    element.setAttribute('disabled', 'disabled');
  };

  var removeDisabled = function (element) {
    element.removeAttribute('disabled');
  };

  var isKeydownEvent = function (evt, action, key) {
    if (evt.key === key) {
      evt.preventDefault();

      action();
    }
  };

  var isEscEvent = function (evt, action) {
    isKeydownEvent(evt, action, KeyboardKey.ESC);
  };

  var isEnterEvent = function (evt, action) {
    isKeydownEvent(evt, action, KeyboardKey.ENTER);
  };

  var isMainClickEvent = function (evt, action) {
    evt.preventDefault();

    if (evt.button === MouseKey.MAIN) {
      action(evt);
    }
  };


  window.utils = {
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    getRandomArray: getRandomArray,
    removeChildren: removeChildren,
    setDisabled: setDisabled,
    removeDisabled: removeDisabled,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isMainClickEvent: isMainClickEvent
  };
})();
