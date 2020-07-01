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
  var DEFAULT = {
    title: '',
    address: '',
    house: 'flat',
    price: PRICE.flat,
    timeIn: '12:00',
    timeOut: '12:00',
    rooms: 1,
    guests: 1,
    features: false,
    description: '',
    avatar: 'img/muffin-grey.svg',
  };


  var formAd = document.querySelector('.ad-form');
  var adFieldsets = formAd.querySelectorAll('fieldset');
  var formFilters = document.querySelector('.map__filters');
  var inputTitle = formAd.querySelector('#title');
  var inputAddress = formAd.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
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
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var adPreview = document.querySelector('.ad-form__photo');

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
    window.data.saveData();

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
    inputTitle.value = DEFAULT.title;
    inputAddress.value = DEFAULT.address;
    typeHousing.value = DEFAULT.house;
    pricePerNight.value = DEFAULT.price;
    timeIn.value = DEFAULT.timeIn;
    timeOut.value = DEFAULT.timeOut;
    roomNumber.value = DEFAULT.rooms;
    capacity.value = DEFAULT.guests;

    features.forEach(function (item) {
      item.checked = DEFAULT.features;
    });

    description.value = DEFAULT.description;
    avatarPreview.src = DEFAULT.avatar;

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
