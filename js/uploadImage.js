'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var Image = {
    TAG: 'IMG',
    WIDTH: 70,
    HEIGHT: 70
  };

  window.uploadImage = function (input, preview) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (preview.tagName === Image.TAG) {
          preview.src = reader.result;
        } else {
          var image = document.createElement(Image.TAG);

          image.src = reader.result;
          image.width = Image.WIDTH;
          image.height = Image.HEIGHT;

          if (preview.children.length > 0) {
            preview.children.item(0).remove();
          }

          preview.append(image);
        }
      });

      reader.readAsDataURL(file);
    }
  };
})();
