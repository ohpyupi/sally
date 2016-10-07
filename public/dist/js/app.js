(function () {

var app = angular.module('Sally', []);

app.directive('postContact', ['$http', function ($http) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			let button = $(element).find('button');
			button.on('click', function (e) {
				e.preventDefault();
				let form = $('#contact-form');
				let data = form.serializeObject();
				return $http.post('http://www.zoozler.com/contact-sent', data)
					.success(function(res) {
						form.fadeOut();
						console.log(res);
					}).error(function(err) {
						console.log(err.status);
				});
			});
		}
	};
}]);




})();

// Customomized helper functions or codes
$.fn.serializeObject = function() {
  var arrayData, objectData;
  arrayData = this.serializeArray();
  objectData = {};

  $.each(arrayData, function() {
    var value;

    if (this.value != null) {
      value = this.value;
    } else {
      value = '';
    }

    if (objectData[this.name] != null) {
      if (!objectData[this.name].push) {
        objectData[this.name] = [objectData[this.name]];
      }

      objectData[this.name].push(value);
    } else {
      objectData[this.name] = value;
    }
  });

  return objectData;
};


