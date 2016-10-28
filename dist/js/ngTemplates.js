(function () {
'use strict';
let app = angular.module('sallyTemplates', []);
app.directive('installationSection', function () {
	return {
		restrict: 'E',
		templateUrl: '/templates/installation.html',
	};
});
app.directive('contactSection', function () {
	return {
		restrict: 'E',
		templateUrl: '/templates/contact-section.html',
	};
});
app.directive('copyrightSection', function () {
	return {
		restrict: 'E',
		templateUrl: '/templates/copyright-section.html',
	};
});
app.directive('youtubeSection', function () {
	return {
		restrict: 'E',
		templateUrl: '/templates/youtube-section.html',
	};
});
})();
