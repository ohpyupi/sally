(function () {
'use strict';
let app = angular.module('MyApp', ['sally', 'sallyTemplates', 'ngMaterial', 'ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/html/home.html'
		})
		.state('installation', {
			url: '/installation',
			templateUrl: 'templates/html/installation.html',
		})
		.state('copyright', {
			url: '/copyright',
			templateUrl: 'templates/html/copyright-section.html',
		})
		.state('youtube', {
			url: '/youtube',
			templateUrl: 'templates/html/youtube-section.html',
		})
		.state('contact-form', {
			url: '/contact-form',
			templateUrl:'templates/html/contact-section.html',
		})
		.state('slideshow', {
			url: '/slideshow',
			templateUrl: 'templates/html/slideshow-section.html',
		});
	$locationProvider.hashPrefix('!');
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: true,
		rewriteLinks: true
	});
	$mdThemingProvider.theme('default')
		.primaryPalette('grey', {
			'default': '800',
			'hue-1': '400',
		})
		.accentPalette('brown', {
			'default': '700',
		});
}]);
app.controller('GeneralCtrl', ['$scope', function ($scope) {
// Just go!

// When document ready
$(document).ready(function () {
});
}]);
app.directive('prismLoader', function () {
	return {
		restrict: 'A',
		link: function ($scope, ele, attrs) {
			$(document).ready(function () {
				var codes = $(ele).find('code');
				Prism.highlightAll();
			});
		},
	};
});
})();
