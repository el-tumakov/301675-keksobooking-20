'use strict';

(function () {
  var avatarInput = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var adInput = document.querySelector('.ad-form__input');
  var adPreview = document.querySelector('.ad-form__photo');

  var avatarInputChangeHandler = function () {
    window.uploadImage(avatarInput, avatarPreview);
  };

  var adInputChangeHandler = function () {
    window.uploadImage(adInput, adPreview);
  };

  var setAvatarInputChangeListener = function () {
    avatarInput.addEventListener('change', avatarInputChangeHandler);
  };

  var setAdInputChangeListener = function () {
    adInput.addEventListener('change', adInputChangeHandler);
  };

  var removeAvatarInputChangeListener = function () {
    avatarInput.removeEventListener('change', avatarInputChangeHandler);
  };

  var removeAdInputChangeListener = function () {
    adInput.removeEventListener('change', adInputChangeHandler);
  };


  window.images = {
    setAvatarInputChangeListener: setAvatarInputChangeListener,
    setAdInputChangeListener: setAdInputChangeListener,
    removeAvatarInputChangeListener: removeAvatarInputChangeListener,
    removeAdInputChangeListener: removeAdInputChangeListener
  };
})();
