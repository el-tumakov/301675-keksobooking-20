'use strict';

(function () {
  var ROOM_NUMBER_100 = '100';
  var CAPACITY_NULL = '0';
  var Price = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var Default = {
    TITLE: '',
    ADDRESS: '',
    HOUSE: 'flat',
    PRICE: Price.FLAT,
    TIME_IN: '12:00',
    TIME_OUT: '12:00',
    ROOMS: 1,
    GUESTS: 1,
    FEATURES: false,
    DESCRIPTION: '',
    AVATAR: 'img/muffin-grey.svg',
  };


  var mainPin = document.querySelector('.map__pin--main');
  var formFilters = document.querySelector('.map__filters');
  var formAd = document.querySelector('.ad-form');
  var formFieldsets = formAd.querySelectorAll('fieldset');
  var inputTitle = formAd.querySelector('#title');
  var inputAddress = formAd.querySelector('#address');
  var typeHousing = formAd.querySelector('#type');
  var pricePerNight = formAd.querySelector('#price');
  var capacity = formAd.querySelector('#capacity');
  var roomNumber = formAd.querySelector('#room_number');
  var timeIn = formAd.querySelector('#timein');
  var timeOut = formAd.querySelector('#timeout');
  var timeFieldset = formAd.querySelector('.ad-form__element--time');
  var features = formAd.querySelectorAll('.feature__checkbox');
  var description = formAd.querySelector('#description');
  var resetButton = formAd.querySelector('.ad-form__reset');
  var avatarPreview = formAd.querySelector('.ad-form-header__preview img');
  var adPreview = formAd.querySelector('.ad-form__photo');

  var setFormsStatus = function (method) {
    formFieldsets.forEach(function (item) {
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
          changePrice(Price.BUNGALO);
          break;
        case 'flat':
          changePrice(Price.FLAT);
          break;
        case 'house':
          changePrice(Price.HOUSE);
          break;
        case 'palace':
          changePrice(Price.PALACE);
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
    roomNumber.addEventListener('change', roomNumberChangeHandler);
  };

  var removeRoomNumberChangeListener = function () {
    roomNumber.removeEventListener('change', roomNumberChangeHandler);
  };

  var roomNumberChangeHandler = function () {
    disableCapacity();
    enableCapacity();
    checkValidityGuests();
  };

  var setCapacityChangeListener = function () {
    capacity.addEventListener('change', capacityChangeHandler);
  };

  var removeCapacityChangeListener = function () {
    capacity.removeEventListener('change', capacityChangeHandler);
  };

  var capacityChangeHandler = function () {
    checkValidityGuests();
  };

  var setTimeFieldsetChangeListener = function () {
    timeFieldset.addEventListener('change', timeFieldsetChangeHandler);
  };

  var removeTimeFieldsetChangeListener = function () {
    timeFieldset.removeEventListener('change', timeFieldsetChangeHandler);
  };

  var timeFieldsetChangeHandler = function (evt) {
    if (evt.target === timeIn) {
      timeOut.value = timeIn.value;
    } else {
      timeIn.value = timeOut.value;
    }
  };

  var setFormSubmitListener = function () {
    formAd.addEventListener('submit', formSubmitHandler);
  };

  var removeFormSubmitListener = function () {
    formAd.removeEventListener('submit', formSubmitHandler);
  };

  var formSubmitHandler = function (evt) {
    window.data.save();

    evt.preventDefault();
  };

  var setResetButtonClickListener = function () {
    resetButton.addEventListener('click', resetButtonClickHandler);
  };

  var removeResetButtonClickListener = function () {
    resetButton.removeEventListener('click', resetButtonClickHandler);
  };

  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();

    window.main.removeActiveStatus();
  };

  var setDefault = function () {
    inputTitle.value = Default.TITLE;
    inputAddress.value = Default.ADDRESS;
    typeHousing.value = Default.HOUSE;
    pricePerNight.value = Default.PRICE;
    timeIn.value = Default.TIME_IN;
    timeOut.value = Default.TIME_OUT;
    roomNumber.value = Default.ROOMS;
    capacity.value = Default.GUESTS;

    features.forEach(function (item) {
      item.checked = Default.FEATURES;
    });

    description.value = Default.DESCRIPTION;
    avatarPreview.src = Default.AVATAR;

    if (adPreview.children.length > 0) {
      adPreview.children.item(0).remove();
    }
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
    setTimeFieldsetChangeListener: setTimeFieldsetChangeListener,
    setFormSubmitListener: setFormSubmitListener,
    setResetButtonClickListener: setResetButtonClickListener,
    removeRoomNumberChangeListener: removeRoomNumberChangeListener,
    removeCapacityChangeListener: removeCapacityChangeListener,
    removeTimeFieldsetChangeListener: removeTimeFieldsetChangeListener,
    removeFormSubmitListener: removeFormSubmitListener,
    removeResetButtonClickListener: removeResetButtonClickListener,
    setDefault: setDefault
  };
})();
