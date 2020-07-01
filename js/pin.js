'use strict';

(function () {
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


  window.pin = {
    render: renderPin
  };
})();
