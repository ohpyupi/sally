(function () {
'use strict';
var app = angular.module('sally', []);

app.directive('slideHelper', [function () {
	return {
		restrict: 'A',
		link: ($scope, ele, attrs) => {
		$(document).ready(function () {
			let $slides = $(ele).find('.slide-ele'),
				length = $slides.length,
				count = 0,
				height = $slides.first().height(),
				width = $slides.first().width();
			$slides.height(height);
			$slides.fadeOut(1);
			let $current = $([]);
			$current.push($slides.eq(0));
			$current.push($slides.eq(1));
			$current.each(function(i, value) {
				value.fadeIn(1);
			});
			let $slideCons = $slides.parent();
			$slides.on('click', function () {
				$current.css({
					'transform': `translateX(-${width}px)`
				});
				$slides.eq(2).fadeIn(300);
			});
		});
		},
	};
}]);

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
				// Recording the curren date
				let date = new Date();
				data.date = date.toDateString();
				// Recording sitekey to identify
				data.siteKey = $(ele).find('.g-recaptcha').attr('data-sitekey');
				// Recaptcha response
				let valid = isEmail(data.email) && data.name && data.message && data['g-recaptcha-response'];
				console.log(data);
				if (valid) {
					return $http.post('http://www.zoozler.com/contact-sent', data)
						.success(function(res) {
							// notification-box will confirm the success.
							notiBox.fadeIn(function () {
								if (res[0] === "missing-input-secret") {
									$(this).removeClass('alert-success');
									$(this).addClass('alert-danger');
									$(this).text('Your sitekey is not registered in Zoozler API');
								} else {
									$(this).removeClass('alert-danger');
									$(this).addClass('alert-success');
									$(this).text('Successfully sent!');
									$(ele).each(function () {
										this.reset();
									});
								}
								alert(res[0]);
								console.log(res);
							});
						}).error(function(err) {
							notiBox.fadeIn(function () {
								$(this).removeClass('alert-success');
								$(this).addClass('alert-danger');
								$(this).text('Sorry, Zoozler API currently not working. Please consult with admin.');
							});
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

app.directive('youtubeHelper', function () {
	return {
		restrict: 'A',
		link: function (scope, ele, attrs) {
			let id = attrs['id'];
			$(ele).append("<img class='youtube-thumb' src='https://img.youtube.com/vi/" + id + "/hqdefault.jpg'><div class='youtube-play-btn'></div>");
			let iframe = $('<iframe data-youtubeId="' + id + '">')
			iframe.attr('src', 'https://www.youtube.com/embed/' + id + '?autoplay=1&autohide=2&border=1&wmode=opaque&enablejsapi=1&controls=1&showinfo=1');
			iframe.attr('frameborder', '0');
			iframe.attr('allowFullScreen', true);
			iframe.attr('id', 'youtube-iframe');
			$(ele).children('.youtube-play-btn').on('click', function () {
				$(this).hide();
				$(ele).addClass('youtube-loading');
				$(ele).children('img').replaceWith(iframe);
				$(iframe).on('load', function () {
					$(ele).removeClass('youtube-loading');
				});
			});
		},
	};
});

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
