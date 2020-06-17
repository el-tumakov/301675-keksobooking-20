'use strict';

(function () {
  var LIMITS_Y = {
    min: 130,
    max: 630
  };

  var map = document.querySelector('.map');
  var pin = document.querySelector('.map__pin--main');

  var dragPin = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var documentMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinCoords = {
        x: pin.offsetLeft - shift.x,
        y: pin.offsetTop - shift.y
      };

      if (pinCoords.x < -pin.offsetWidth / 2) {
        pinCoords.x = -pin.offsetWidth / 2;
      } else if (pinCoords.x > map.offsetWidth - (pin.offsetWidth / 2)) {
        pinCoords.x = map.offsetWidth - (pin.offsetWidth / 2);
      }

      if (pinCoords.y < LIMITS_Y.min - pin.offsetHeight) {
        pinCoords.y = LIMITS_Y.min - pin.offsetHeight;
      } else if (pinCoords.y > LIMITS_Y.max - pin.offsetHeight) {
        pinCoords.y = LIMITS_Y.max - pin.offsetHeight;
      }

      pin.style.top = pinCoords.y + 'px';
      pin.style.left = pinCoords.x + 'px';
    };

    var documentMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      window.form.setAddress();

      document.removeEventListener('mousemove', documentMouseMoveHandler);
      document.removeEventListener('mouseup', documentMouseUpHandler);
    };

    document.addEventListener('mousemove', documentMouseMoveHandler);
    document.addEventListener('mouseup', documentMouseUpHandler);
  };

  var pinMouseDownHandler = function (evt) {
    window.utils.isMainClickEvent(evt, dragPin);
  };

  pin.addEventListener('mousedown', pinMouseDownHandler);
})();
