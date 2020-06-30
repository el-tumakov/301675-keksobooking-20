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
    LOW: {
      name: 'low',
      value: 10000
    },
    HIGH: {
      name: 'high',
      value: 50000
    }
  };
  var Rooms = {
    ANY: 'any',
    ONE: '1',
    TWO: '2',
    THREE: '3'
  };
  var Guests = {
    ANY: 'any',
    TWO: '2',
    ONE: '1',
    NULL: '0'
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
  var guestsInput = form.querySelector('#housing-guests');
  var featureInputs = form.querySelectorAll('.map__checkbox');
  var data = [];

  var changeFilterType = function (type) {
    data = data.filter(function (item) {
      return item.offer.type === type;
    });
  };

  var changeFilterRooms = function (rooms) {
    data = data.filter(function (item) {
      return item.offer.rooms === +rooms;
    });
  };

  var changeFilterGuests = function (guests) {
    data = data.filter(function (item) {
      return item.offer.guests === +guests;
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

  var getDataByPrice = function () {
    switch (priceInput.value) {
      case Price.ANY:
        break;
      case Price.MIDDLE:
        data = data.filter(function (item) {
          return item.offer.price >= Price.LOW.value &&
                 item.offer.price <= Price.HIGH.value;
        });
        break;
      case Price.LOW.name:
        data = data.filter(function (item) {
          return item.offer.price < Price.LOW.value;
        });
        break;
      case Price.HIGH.name:
        data = data.filter(function (item) {
          return item.offer.price > Price.HIGH.value;
        });
        break;
    }
  };

  var getDataByRooms = function () {
    switch (roomsInput.value) {
      case Rooms.ANY:
        break;
      case Rooms.ONE:
        changeFilterRooms(Rooms.ONE);
        break;
      case Rooms.TWO:
        changeFilterRooms(Rooms.TWO);
        break;
      case Rooms.THREE:
        changeFilterRooms(Rooms.THREE);
        break;
    }
  };

  var getDataByGuests = function () {
    switch (guestsInput.value) {
      case Guests.ANY:
        break;
      case Guests.TWO:
        changeFilterGuests(Guests.TWO);
        break;
      case Guests.ONE:
        changeFilterGuests(Guests.ONE);
        break;
      case Guests.NULL:
        changeFilterGuests(Guests.NULL);
        break;
    }
  };

  var getDataByFeatures = function () {
    featureInputs.forEach(function (featureItem) {
      if (featureItem.checked) {
        data = data.filter(function (dataItem) {
          return dataItem.offer.features.includes(featureItem.value);
        });
      }
    });
  };

  var getDataByCount = function () {
    while (data.length > PINS_COUNT) {
      data.pop();
    }
  };

  var applyFilter = function () {
    data = window.data.ads.slice();
    getDataByType();
    getDataByPrice();
    getDataByRooms();
    getDataByGuests();
    getDataByFeatures();
    getDataByCount();
    window.filter.data = data;
    window.adMap.removePins();
    window.adMap.removeCard();
    window.adMap.addPins(data);
  };

  var setDefault = function () {
    typeInput.value = Default.TYPE;
    priceInput.value = Default.PRICE;
    roomsInput.value = Default.ROOMS;
    guestsInput.value = Default.GUESTS;

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
