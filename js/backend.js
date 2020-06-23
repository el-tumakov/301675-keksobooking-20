'use strict';

(function () {
  var URL = {
    load: 'https://javascript.pages.academy/keksobooking/data',
    save: 'https://javascript.pages.academy/keksobooking'
  };
  var STATUS_CODE = {
    ok: 200
  };
  var METHOD = {
    get: 'GET',
    post: 'POST'
  };
  var TIMEOUT = 100000;

  var createXhr = function (onLoad, onError, method, url, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE.ok) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;


    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    createXhr(onLoad, onError, METHOD.get, URL.load);
  };

  var save = function (data, onLoad, onError) {
    createXhr(onLoad, onError, METHOD.post, URL.save, data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
