'use strict';

(function () {
  var PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var ROOM_NUMBER_100 = '100';
  var CAPACITY_NULL = '0';


  var formAd = document.querySelector('.ad-form');
  var adFieldsets = formAd.querySelectorAll('fieldset');
  var formFilters = document.querySelector('.map__filters');
  var inputAddress = formAd.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var typeHousing = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');
  var capacity = formAd.querySelector('#capacity');
  var roomNumber = formAd.querySelector('#room_number');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var timeFieldset = document.querySelector('.ad-form__element--time');

  var setFormsStatus = function (method) {
    adFieldsets.forEach(function (item) {
      method(item);
    });

    for (var i = 0; i < formFilters.children.length; i++) {
      method(formFilters.children[i]);
    }
  };

  var setAddress = function () {
    inputAddress.value =
      Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) +
      ', ' +
      Math.round(mainPin.offsetTop + mainPin.offsetHeight);
  };

  var changePrice = function (price) {
    pricePerNight.min = price;
    pricePerNight.placeholder = price;
  };

  var setTypeHousingChangeListener = function () {
    typeHousing.addEventListener('change', function () {
      switch (typeHousing.value) {
        case 'bungalo':
          changePrice(PRICE.bungalo);
          break;
        case 'flat':
          changePrice(PRICE.flat);
          break;
        case 'house':
          changePrice(PRICE.house);
          break;
        case 'palace':
          changePrice(PRICE.palace);
          break;
      }
    });
  };

  var disableCapacity = function () {
    for (var i = 0; i < capacity.options.length; i++) {
      window.utils.setDisabled(capacity.options[i]);
    }
  };

  var enableCapacity = function () {
    for (var i = 0; i < capacity.options.length; i++) {
      if (capacity.options[i].value <= roomNumber.value &&
          capacity.options[i].value !== CAPACITY_NULL &&
          roomNumber.value !== ROOM_NUMBER_100) {
        window.utils.removeDisabled(capacity.options[i]);
      } else if (capacity.options[i].value === CAPACITY_NULL &&
                 roomNumber.value === ROOM_NUMBER_100) {
        window.utils.removeDisabled(capacity.options[i]);
      }
    }
  };

  var checkValidityGuests = function () {
    var currentCapacity = capacity.options[capacity.selectedIndex];

    if (currentCapacity.hasAttribute('disabled')) {
      capacity.setCustomValidity('Число гостей не соответствует числу комнат');
    } else {
      capacity.setCustomValidity('');
    }
  };

  var setRoomNumberChangeListener = function () {
    roomNumber.addEventListener('change', function () {
      disableCapacity();
      enableCapacity();
      checkValidityGuests();
    });
  };

  var setCapacityChangeListener = function () {
    capacity.addEventListener('change', function () {
      checkValidityGuests();
    });
  };

  var setTimeFieldsetChangeListener = function () {
    timeFieldset.addEventListener('change', function (evt) {
      if (evt.target === timeIn) {
        timeOut.value = timeIn.value;
      } else {
        timeIn.value = timeOut.value;
      }
    });
  };


  setFormsStatus(window.utils.setDisabled);


  window.form = {
    setFormsStatus: setFormsStatus,
    setAddress: setAddress,
    setTypeHousingChangeListener: setTypeHousingChangeListener,
    disableCapacity: disableCapacity,
    enableCapacity: enableCapacity,
    checkValidityGuests: checkValidityGuests,
    setRoomNumberChangeListener: setRoomNumberChangeListener,
    setCapacityChangeListener: setCapacityChangeListener,
    setTimeFieldsetChangeListener: setTimeFieldsetChangeListener
  };
})();
