'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;

  var loadData = function () {
    window.backend.load(loadSuccessHandler, loadErrorHandler);
  };

  var saveData = function () {
    window.backend.save(
        new FormData(form),
        saveSuccessHandler,
        saveErrorHandler
    );
  };

  var loadSuccessHandler = function (data) {
    window.data.ads = data;

    window.adMap.addPins(data);
    window.adMap.setPinsListClickListener();
  };

  var saveSuccessHandler = function () {
    window.main.removeActiveStatus();

    renderMessage(successTemplate, true);
  };

  var loadErrorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var saveErrorHandler = function () {
    renderMessage(errorTemplate, false);
  };

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


  window.data = {
    loadData: loadData,
    saveData: saveData
  };
})();
