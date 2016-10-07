(function () {

var app = angular.module('sally', []);

app.directive('zoozlerfy', [function () {
	return {
		restrict: 'A',
		link: function (scope, ele, attrs) {
			let isCopyright = attrs['copyright'];
			let content;
			if (isCopyright === 'true') {
				let today = new Date();
				let todayYear = today.getFullYear();
				content = "Copyright &copy " + todayYear + " <a href='http://www.zoozler.com' target='_blank'><span style='color:#BD091B;'>Zooz</span><span style='color:#F0592B;'>l</span><span style='color:#F59120;'>e</span><span style='color:#FAAD41;'>r</span></a> | " + "<a href='http://www.zoozler.com/terms-and-conditions' target='_blank'>Terms and Conditions</a>";
				$(ele).html(content);
			} else if (isCopyright === 'false') {
				content = "<span style='color:#BD091B;'>Zooz</span><span style='color:#F0592B;'>l</span><span style='color:#F59120;'>e</span><span style='color:#FAAD41;'>r</span>";
				$(ele).html(content);
			} else {
				$(ele).text('Please specify "data-copyright" attribute.');
			}
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
				// Specify destination email with data-to attribute
				data.to = attrs['to'];
				// Specify homsepage url email with data-to attribute
				data.url = attrs['url']
				// Specify the origin's nickname.
				data.nick = attrs['nick'];
				// Recording the curren date
				let date = new Date();
				data.date = date.toDateString();
				// Recording sitekey to identify
				data.sitekey = $(ele).find('.g-recaptcha').attr('data-sitekey');
				// Recaptcha response
				data.grec = grecaptcha.getResponse();
				let valid = isEmail(data.email) && data.name && data.message && data.grec;
				if (valid) {
					return $http.post('http://www.zoozler.com/contact-sent', data)
						.success(function(res) {
							// notification-box will confirm the success.
							notiBox.fadeIn(function () {
								$(this).removeClass('alert-danger');
								$(this).addClass('alert-success');
								$(this).text('Successfully sent!');
								$(ele).each(function () {
									this.reset();
								});
								console.log(res);
							});
						}).error(function(err) {
							$(this).removeClass('alert-success');
							$(this).addClass('alert-danger');
							$(this).text('Sorry, Zoozler API currently not working. Please consult with admin.');
							console.log(err.status);
					});
				} else {
					notiBox.fadeIn(function () {
						// notification-box will inform the failure.
						$(this).removeClass('alert-success');
						$(this).addClass('alert-danger');
						$(this).text('Check your form!');
					});
				}
			});
		}
	};
}]);

})();

// Customomized helper functions or codes

// serialize object from a jquery array.
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

// email validation
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
