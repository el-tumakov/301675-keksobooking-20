'use strict';

var NUMBER_OF_PINS = 8;
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
map.classList.remove('map--faded');


var getRandomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomArray = function (array) {
  var anotherArray = [];

  array.forEach(function (item) {
    if (getRandomInteger(0, 1) === 1) {
      anotherArray.push(item);
    }
  });

  return anotherArray;
};

var generateArrayObjects = function () {
  var coordinates = {
    x: getRandomInteger(POSITION_X.min, map.clientWidth),
    y: getRandomInteger(POSITION_Y.min, POSITION_Y.max)
  };

  var object = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },
    'offer': {
      'title': TITLES[i],
      'address': coordinates.x + ', ' + coordinates.y,
      'price': getRandomInteger(PRICES.min, PRICES.max),
      'type': getRandomElement(TYPES),
      'rooms': getRandomInteger(ROOMS.min, ROOMS.max),
      'guests': getRandomInteger(GUESTS.min, GUESTS.max),
      'checkin': getRandomElement(TIMES),
      'checkout': getRandomElement(TIMES),
      'features': getRandomArray(FEATURES),
      'description': DESCRIPTIONS[i],
      'photos': getRandomArray(PHOTOS),
    },
    'location': {
      'x': coordinates.x,
      'y': coordinates.y
    }
  };

  return object;
};

var renderPin = function (template, parentNode, data) {
  var pinElement = template.cloneNode(true);
  var pin = pinElement.querySelector('.map__pin');
  var pinAvatar = pinElement.querySelector('img');

  pin.style.left = data.location.x + pin.offsetWidth / 2 + 'px';
  pin.style.top = data.location.y + pin.offsetHeight + 'px';
  pinAvatar.src = data.author.avatar;
  pinAvatar.alt = data.offer.tutle;

  parentNode.appendChild(pinElement);
};


var pins = [];
var pinTemplate = document.querySelector('#pin').content;
var pinsList = document.querySelector('.map__pins');

for (var i = 0; i < NUMBER_OF_PINS; i++) {
  pins[i] = generateArrayObjects();

  renderPin(pinTemplate, pinsList, pins[i]);
}
