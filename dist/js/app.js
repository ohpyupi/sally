(function () {
'use strict';
let app = angular.module('MyApp', ['sally', 'sallyTemplates', 'ngMaterial', 'ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/home.html'
		})
		.state('installation', {
			url: '/installation',
			templateUrl: 'templates/installation.html',
		})
		.state('copyright', {
			url: '/copyright',
			templateUrl: 'templates/copyright-section.html',
		})
		.state('youtube', {
			url: '/youtube',
			templateUrl: 'templates/youtube-section.html',
		})
		.state('contact-form', {
			url: '/contact-form',
			templateUrl:'templates/contact-section.html',
		})
		.state('slideshow', {
			url: '/slideshow',
			templateUrl: 'templates/slideshow-section.html',
		});
		$locationProvider.hashPrefix('!');
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: true,
			rewriteLinks: true
		});
}]);
app.directive('codeTabHelper', function () {
	return {
		restrict: 'A',
		link: ($scope, ele, attrs)=>{
			$scope.data = {
				selected: 0,
			};
		},
	};
});
})();
