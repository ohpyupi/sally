(function () {
'use strict';
var app = angular.module('sally', []);

app.directive('slideHelper', [function () {
	return {
		restrict: 'A',
		link: function ($scope, ele, attrs) {
		$(document).ready(function () {
			var $ele = $(ele),
				$con = $ele.find('.slide-con'),
				$slides = $ele.find('.slide-ele'),
				length = $slides.length,
				btnArr = [],
				arrArr = [],
				_currentIndex = 0,
				_timeout,
				period = parseInt(attrs['period']);
			// variables
			var $arr = $('<span class="arr-left"><i class="icons"></i></span><span class="arr-right"><i class="icons"></i></span>');
			$arr.appendTo($ele.find('.arr-con'));
			var $arrLeft = $('.arr-left'),
				$arrRight = $('.arr-right');
			$arrLeft.on('click', function (e) {
				if (_currentIndex > 0) {
					$(this).css({
						'display': 'block',
					});
					move(_currentIndex-1);
				} else {
					e.preventDefault;
					return;
				}
			});
			$arrRight.on('click', function (e) {
				if (_currentIndex < length-1) {
					moveRight(_currentIndex+1);
				} else {
					e.preventDefault();
					return;
				}
			});
			$.each($slides, function (index) {
				var $button = $('<span type="button" class="btn-slide">&bull;</span>');
				if (index === _currentIndex) {
					$button.addClass('active');
				}
				$button.on('click', function () {
					move(index);
				}).appendTo($ele.find('.btn-con'));
				btnArr.push($button);
			});
			advance(); // Initialization done, fire!
			function move(newIndex) {
				var animateLeft;
				var slideLeft;
				advance();
				if ($con.is(':animated') || newIndex === _currentIndex) {
					return;
				}
				btnArr[_currentIndex].removeClass('active');
				btnArr[newIndex].addClass('active');
				if (newIndex > _currentIndex) {
					slideLeft = '100%';
					animateLeft = '-100%';
				} else {
					slideLeft = '-100%';
					animateLeft = '100%';
				}
				$slides.eq(newIndex).css({
					'left': slideLeft,
					'display': 'block'
				});
				$con.animate({
					'left': animateLeft
				}, function() {
					$slides.eq(_currentIndex).css({
						'display': 'none'
					});
					$slides.eq(newIndex).css({
						'left': '0'
					});
					$con.css({
						'left': '0'
					});
					_currentIndex = newIndex;
				});
			} // move(newIndex);
			function moveRight(newIndex) {
				move(newIndex);
			} // moveRight(newIndex);
			function moveLeft(newIndex) {
			} // moveLeft(newIndex);
			function advance() {
				clearTimeout(_timeout);
				_timeout = setTimeout(function () {
					if (_currentIndex < length-1) {
						move(_currentIndex+1);
					} else {
						move(0);
					}
				}, period);
			} // advance();
		});
		},
	};
}]);

app.directive('zoozlerfy', [function () {
	return {
		restrict: 'A',
		link: function (scope, ele, attrs) {
			var isCopyright = attrs['copyright'];
			var content;
			if (isCopyright === 'true') {
				var today = new Date();
				var todayYear = today.getFullYear();
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
			var notiBox = $('.sent-notification');
			var button = $(ele).find('button');
			button.on('click', function (e) {
				e.preventDefault();
				var data = $(ele).serializeObject();
				// Specify destination email with data-to attribute
				data.to = attrs['to'];
				// Specify homsepage url email with data-to attribute
				data.url = attrs['url']
				// Recording the curren date
				var date = new Date();
				data.date = date.toDateString();
				// Recording sitekey to identify
				data.siteKey = $(ele).find('.g-recaptcha').attr('data-sitekey');
				// Recaptcha response
				var valid = isEmail(data.email) && data.name && data.message && data['g-recaptcha-response'];
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
			var id = attrs['id'];
			$(ele).append("<img class='youtube-thumb' src='https://img.youtube.com/vi/" + id + "/hqdefault.jpg'><div class='youtube-play-btn'></div>");
			var iframe = $('<iframe data-youtubeId="' + id + '">')
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
