'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var successTemplate = document.querySelector('#success').content;

  var load = function () {
    window.backend.load(loadSuccessHandler, window.errorHandler.load);
  };

  var save = function () {
    window.backend.save(
        new FormData(form),
        saveSuccessHandler,
        window.errorHandler.save
    );
  };

  var loadSuccessHandler = function (data) {
    window.data.ads = data;
    window.filter.apply();
  };

  var saveSuccessHandler = function () {
    window.main.removeActiveStatus();

    window.message.render(successTemplate, true);
  };

  window.data = {
    load: load,
    save: save
  };
})();
