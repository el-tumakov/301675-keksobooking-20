'use strict';

(function () {
  var DEFAULT_POSITION = {
    top: '375px',
    left: '570px'
  };

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
    window.form.setFormSubmitListener();
    window.form.setResetButtonClickListener();

    window.data.loadData();

    mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
    mainPin.removeEventListener('keydown', mainPinKeydownEnterHandler);
  };

  var removeActiveStatus = function () {
    map.classList.add('map--faded');
    formAd.classList.add('ad-form--disabled');

    window.adMap.removePins();

    window.form.setFormsStatus(window.utils.setDisabled);
    window.form.disableCapacity();
    window.form.removeRoomNumberChangeListener();
    window.form.removeCapacityChangeListener();
    window.form.removeTimeFieldsetChangeListener();
    window.form.removeFormSubmitListener();
    window.form.removeResetButtonClickListener();
    window.form.setDefault();

    mainPin.style.top = DEFAULT_POSITION.top;
    mainPin.style.left = DEFAULT_POSITION.left;

    mainPin.addEventListener('mousedown', mainPinMousedownHandler);
    mainPin.addEventListener('keydown', mainPinKeydownEnterHandler);
  };

  var mainPinMousedownHandler = function (evt) {
    window.utils.isMainClickEvent(evt, setActiveStatus);
  };

  var mainPinKeydownEnterHandler = function (evt) {
    window.utils.isEnterEvent(evt, setActiveStatus);
  };

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  mainPin.addEventListener('keydown', mainPinKeydownEnterHandler);


  window.main = {
    removeActiveStatus: removeActiveStatus
  };
})();
