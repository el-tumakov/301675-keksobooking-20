'use strict';

(function () {
  var TITLES = [
    'Хрущовка в колпино',
    'Коммуналка на ваське',
    'Двушка в купчино',
    'Трешка на болтах',
    'Студия в подвале',
    'Однушка в центре',
    'Лофт на петроградке',
    'Комната в мурино'
  ];
  var PRICES = {
    'min': 5000,
    'max': 100000
  };
  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var ROOMS = {
    'min': 1,
    'max': 6
  };
  var GUESTS = {
    'min': 0,
    'max': 10
  };
  var TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var DESCRIPTIONS = [
    'Отличная хрущовка с видом из окна в другое окно.',
    'В этой коммунальной квартире вам составят отличную компанию маргиналы и творцы.',
    'Отличная транспортная доступность. От метро 15 минут (бегом, от пары гопарей).',
    'В этой трешке вы сможете не только разместить ваших детей, но и место для тещи найдется. Так что подумайте, нужна ли вам эта квартира.',
    'Вы уверены?',
    'Однушка, как однушка, не томи, давай деньги.',
    'Квартира для истинных ценитилей искусства. Правда, крыша подтекает (как и у нас всех).',
    'Если вы сможете до сюда добраться - она ваша.'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var POSITION_X = {
    'min': 0
  };
  var POSITION_Y = {
    'min': 130,
    'max': 630
  };


  var map = document.querySelector('.map');

  var generateArrayObjects = function (index) {
    var coordinates = {
      x: window.utils.getRandomInteger(POSITION_X.min, map.clientWidth),
      y: window.utils.getRandomInteger(POSITION_Y.min, POSITION_Y.max)
    };

    return {
      'author': {
        'avatar': 'img/avatars/user0' + (index + 1) + '.png'
      },
      'offer': {
        'title': TITLES[index],
        'address': coordinates.x + ', ' + coordinates.y,
        'price': window.utils.getRandomInteger(PRICES.min, PRICES.max),
        'type': window.utils.getRandomElement(TYPES),
        'rooms': window.utils.getRandomInteger(ROOMS.min, ROOMS.max),
        'guests': window.utils.getRandomInteger(GUESTS.min, GUESTS.max),
        'checkin': window.utils.getRandomElement(TIMES),
        'checkout': window.utils.getRandomElement(TIMES),
        'features': window.utils.getRandomArray(FEATURES),
        'description': DESCRIPTIONS[index],
        'photos': window.utils.getRandomArray(PHOTOS),
      },
      'location': {
        'x': coordinates.x,
        'y': coordinates.y
      }
    };
  };


  window.data = {
    generateArrayObjects: generateArrayObjects
  };
})();
