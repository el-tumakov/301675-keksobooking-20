'use strict';

(function () {
  var pinsList = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content;
  var cardTemplate = document.querySelector('#card').content;
  var filtersContainer = document.querySelector('.map__filters-container');

  var addPins = function (data) {
    for (var i = 0; i < data.length; i++) {
      window.pin.render(pinTemplate, pinsList, data[i]);
    }

    pinsList.addEventListener('click', pinsListClickHandler);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (item) {
      item.remove();
    });
  };

  var removeCard = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
    }

    document.removeEventListener('keydown', documentKeydownEscHandler);
  };

  var documentKeydownEscHandler = function (evt) {
    window.utils.isEscEvent(evt, removeCard);
  };

  var pinsListClickHandler = function (evt) {
    evt.preventDefault();

    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.forEach(function (item, index) {
      if (evt.path.includes(item)) {
        removeCard();

        window.card.render(
            cardTemplate,
            filtersContainer,
            window.filter.data[index]
        );

        var cardClose = document.querySelector('.popup__close');

        cardClose.addEventListener('click', function (cardCloseEvt) {
          cardCloseEvt.preventDefault();

          removeCard();
        });

        document.addEventListener('keydown', documentKeydownEscHandler);
      }
    });
  };


  window.adMap = {
    addPins: addPins,
    removePins: removePins,
    removeCard: removeCard
  };
})();
