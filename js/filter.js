'use strict';

(function () {
  var PINS_COUNT = 5;
  var Type = {
    ANY: 'any',
    PALACE: 'palace',
    FLAT: 'flat',
    HOUSE: 'house',
    BUNGALO: 'bungalo'
  };
  var Price = {
    ANY: 'any',
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };
  var Rooms = {
    ANY: 'any',
    1: 1,
    2: 2,
    3: 3
  };
  var Guests = {
    ANY: 'any',
    2: 2,
    1: 1,
    0: 0
  };
  var Default = {
    TYPE: Type.ANY,
    PRICE: Price.ANY,
    ROOMS: Rooms.ANY,
    GUESTS: Guests.ANY,
    FEATURE: false
  };

  var form = document.querySelector('.map__filters');
  var typeInput = form.querySelector('#housing-type');
  var priceInput = form.querySelector('#housing-price');
  var roomsInput = form.querySelector('#housing-rooms');
  var GuestsInput = form.querySelector('#housing-guests');
  var featureInputs = form.querySelectorAll('.map__checkbox');
  var data = [];

  var changeFilterType = function (type) {
    data = window.data.ads.filter(function (item) {
      if (item.offer.type === type) {
        return true;
      } else {
        return false;
      }
    });
  };

  var getDataByType = function () {
    switch (typeInput.value) {
      case Type.ANY:
        data = window.data.ads.slice();
        break;
      case Type.PALACE:
        changeFilterType(Type.PALACE);
        break;
      case Type.FLAT:
        changeFilterType(Type.FLAT);
        break;
      case Type.HOUSE:
        changeFilterType(Type.HOUSE);
        break;
      case Type.BUNGALO:
        changeFilterType(Type.BUNGALO);
        break;
    }
  };

  var getDataByCount = function () {
    while (data.length > PINS_COUNT) {
      data.pop();
    }
  };

  var applyFilter = function () {
    getDataByType();
    getDataByCount();
    window.adMap.removePins();
    window.adMap.removeCard();
    window.adMap.addPins(data);
  };

  var setDefault = function () {
    typeInput.value = Default.TYPE;
    priceInput.value = Default.PRICE;
    roomsInput.value = Default.ROOMS;
    GuestsInput.value = Default.GUESTS;

    featureInputs.forEach(function (item) {
      item.checked = Default.FEATURE;
    });
  };

  var formChangeHandler = function (evt) {
    evt.preventDefault();

    applyFilter();
  };

  var setFormChangeListener = function () {
    form.addEventListener('change', formChangeHandler);
  };

  var removeFormChangeListener = function () {
    form.removeEventListener('change', formChangeHandler);
  };


  window.filter = {
    applyFilter: applyFilter,
    setFormChangeListener: setFormChangeListener,
    removeFormChangeListener: removeFormChangeListener,
    setDefault: setDefault
  };
})();
