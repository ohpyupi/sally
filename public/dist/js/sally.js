(function () {

var app = angular.module('Sally', []);

app.directive('zoozlerfy', [function () {
	return {
		restrict: 'A',
		link: function (scope, ele, attrs) {
			let today = new Date();
			let todayYear = today.getFullYear();
			let content = "Copyright &copy " + todayYear + " <a href='http://www.zoozler.com' target='_blank'><span style='color:#BD091B;'>Zooz</span><span style='color:#F0592B;'>l</span><span style='color:#F59120;'>e</span><span style='color:#FAAD41;'>r</span></a> | " + "<a href='http://www.zoozler.com/terms-and-conditions' target='_blank'>Terms and Conditions</a>";
			$(ele).html(content);
		}
	};
}]);

app.directive('postContact', ['$http', function ($http) {
	return {
		restrict: 'A',
		link: function (scope, ele, attrs) {
			scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
			let notiBox = $('.sent-notification');
			let button = $(ele).find('button');
			button.on('click', function (e) {
				e.preventDefault();
				let data = $(ele).serializeObject();
				let date = new Date();
				data.date = date.toDateString();
				// Specify destination email with data-to attribute
				data.to = attrs['to'];
				// Specify homsepage url email with data-to attribute
				data.url = attrs['url']
				return $http.post('http://www.zoozler.com/contact-sent', data)
					.success(function(res) {
						$(ele).fadeOut(function () {
							console.log(res);
						});
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


