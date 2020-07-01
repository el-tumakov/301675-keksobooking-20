'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content;

  var load = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var save = function () {
    window.message.render(errorTemplate, false);
  };

  window.errorHandler = {
    load: load,
    save: save
  };
})();
