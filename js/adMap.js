'use strict';

(function () {
  var NUMBER_OF_PINS = 8;


  var pins = [];
  var pinsList = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content;
  var cardTemplate = document.querySelector('#card').content;
  var filtersContainer = document.querySelector('.map__filters-container');

  var addPins = function () {
    for (var i = 0; i < NUMBER_OF_PINS; i++) {
      pins[i] = window.data.generateArrayObjects(i);

      window.pin.renderPin(pinTemplate, pinsList, pins[i]);
    }
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
        window.card.renderCard(cardTemplate, filtersContainer, pins[index]);

        var cardClose = document.querySelector('.popup__close');

        cardClose.addEventListener('click', function (cardCloseEvt) {
          cardCloseEvt.preventDefault();

          removeCard();
        });

        document.addEventListener('keydown', documentKeydownEscHandler);
      }
    });
  };

  var setPinsListClickListener = function () {
    pinsList.addEventListener('click', pinsListClickHandler);
  };


  window.adMap = {
    addPins: addPins,
    setPinsListClickListener: setPinsListClickListener
  };
})();
