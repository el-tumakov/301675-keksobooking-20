'use strict';

(function () {
  var PhotoSize = {
    WIDTH: 45,
    HEIGHT: 40
  };
  var Type = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
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
      photoElement.width = PhotoSize.WIDTH;
      photoElement.height = PhotoSize.HEIGHT;

      parentNode.appendChild(photoElement);
    }
  };

  var renderCard = function (template, node, data) {
    var type;

    switch (data.offer.type) {
      case 'flat':
        type = Type.FLAT;
        break;
      case 'bungalo':
        type = Type.BUNGALO;
        break;
      case 'house':
        type = Type.HOUSE;
        break;
      case 'palace':
        type = Type.PALACE;
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
