'use strict';

(function () {
  var map = document.querySelector('.map');
  var formAd = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');

  var setActiveStatus = function () {
    map.classList.remove('map--faded');
    formAd.classList.remove('ad-form--disabled');

    window.form.setFormsStatus(window.utils.removeDisabled);
    window.form.setTypeHousingChangeListener();
    window.form.disableCapacity();
    window.form.enableCapacity();
    window.form.checkValidityGuests();
    window.form.setRoomNumberChangeListener();
    window.form.setCapacityChangeListener();
    window.form.setTimeFieldsetChangeListener();

    window.adMap.addPins();
    window.adMap.setPinsListClickListener();

    mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
    mainPin.removeEventListener('keydown', mainPinKeydownEnterHandler);
  };

  var mainPinMousedownHandler = function (evt) {
    window.utils.isMainClickEvent(evt, setActiveStatus);
  };

  var mainPinKeydownEnterHandler = function (evt) {
    window.utils.isEnterEvent(evt, setActiveStatus);
  };

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  mainPin.addEventListener('keydown', mainPinKeydownEnterHandler);
})();
