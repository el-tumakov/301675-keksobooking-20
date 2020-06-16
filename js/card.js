'use strict';

(function () {
  var PHOTO_SIZE = {
    'width': 45,
    'height': 40
  };
  var TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };


  var renderFeature = function (parentNode, features) {
    window.utils.removeChildren(parentNode);

    for (var i = 0; i < features.length; i++) {
      var featureElement = document.createElement('li');

      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + features[i]);

      parentNode.appendChild(featureElement);
    }
  };

  var renderPhoto = function (parentNode, photos) {
    window.utils.removeChildren(parentNode);

    for (var i = 0; i < photos.length; i++) {
      var photoElement = document.createElement('img');

      photoElement.src = photos[i];
      photoElement.classList.add('popup__photo');
      photoElement.width = PHOTO_SIZE.width;
      photoElement.height = PHOTO_SIZE.height;

      parentNode.appendChild(photoElement);
    }
  };

  var renderCard = function (template, node, data) {
    var type;

    switch (data.offer.type) {
      case 'flat':
        type = TYPES.flat;
        break;
      case 'bungalo':
        type = TYPES.bungalo;
        break;
      case 'house':
        type = TYPES.house;
        break;
      case 'palace':
        type = TYPES.palace;
        break;
    }

    var cardElement = template.cloneNode(true);
    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardType = cardElement.querySelector('.popup__type');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardDescription = cardElement.querySelector('.popup__description');
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var cardAvatar = cardElement.querySelector('.popup__avatar');

    cardTitle.textContent = data.offer.title;
    cardAddress.textContent = data.offer.address;
    cardPrice.textContent = data.offer.price + ' ₽/ночь';
    cardType.textContent = type;
    cardCapacity.textContent =
      data.offer.rooms + ' комнаты для ' +
      data.offer.guests + ' гостей';
    cardTime.textContent =
      'Заезд после ' + data.offer.checkin +
      ' выезд до ' + data.offer.checkout;
    renderFeature(cardFeatures, data.offer.features);
    cardDescription.textContent = data.offer.description;
    renderPhoto(cardPhotos, data.offer.photos);
    cardAvatar.src = data.author.avatar;

    node.before(cardElement);
  };


  window.card = {
    renderCard: renderCard
  };
})();
