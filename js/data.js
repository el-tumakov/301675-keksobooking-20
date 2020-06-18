'use strict';

(function () {
  var loadData = function () {
    window.backend.load(loadSuccessHandler, errorHandler);
  };

  var loadSuccessHandler = function (data) {
    window.data.ads = data;

    window.adMap.addPins(data);
    window.adMap.setPinsListClickListener();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


  window.data = {
    loadData: loadData
  };
})();
