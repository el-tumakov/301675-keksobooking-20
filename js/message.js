'use strict';

(function () {
  var main = document.querySelector('main');

  var renderMessage = function (template, success) {
    main.appendChild(template.cloneNode(true));

    if (success) {
      var message = document.querySelector('.success');
    } else {
      message = document.querySelector('.error');
    }

    var documentClickHandler = function (evt) {
      evt.preventDefault();

      removeMessage();

      document.removeEventListener('click', documentClickHandler);
      document.removeEventListener('keydown', documentKeydownHandler);
    };

    var documentKeydownHandler = function (evt) {
      window.utils.isEscEvent(evt, removeMessage);
      document.removeEventListener('click', documentClickHandler);
      document.removeEventListener('keydown', documentKeydownHandler);
    };

    var removeMessage = function () {
      message.remove();
    };

    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);
  };

  window.message = {
    render: renderMessage
  };
})();
