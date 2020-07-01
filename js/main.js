'use strict';

(function () {
  var DefaultPosition = {
    TOP: '375px',
    LEFT: '570px'
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

    window.data.load();

    window.filter.setFormChangeListener();

    window.images.setAvatarInputChangeListener();
    window.images.setAdInputChangeListener();

    mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
    mainPin.removeEventListener('keydown', mainPinKeydownEnterHandler);
  };

  var removeActiveStatus = function () {
    map.classList.add('map--faded');
    formAd.classList.add('ad-form--disabled');

    window.adMap.removePins();
    window.adMap.removeCard();

    window.form.setFormsStatus(window.utils.setDisabled);
    window.form.disableCapacity();
    window.form.removeRoomNumberChangeListener();
    window.form.removeCapacityChangeListener();
    window.form.removeTimeFieldsetChangeListener();
    window.form.removeFormSubmitListener();
    window.form.removeResetButtonClickListener();
    window.form.setDefault();

    window.filter.removeFormChangeListener();
    window.filter.setDefault();

    window.images.removeAvatarInputChangeListener();
    window.images.removeAdInputChangeListener();

    mainPin.style.top = DefaultPosition.TOP;
    mainPin.style.left = DefaultPosition.LEFT;

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
