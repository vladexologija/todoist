'use strict';

/**
 * @ngdoc overview
 * @name todoist
 * @description
 * # todoist
 *
 * Main module of the application.
 */

angular.module('todoist.services',[
  'ngResource'
]);

angular.module('todoist.directives',[]);

angular.module('todoist.filters',[]);

angular.module('todoist.resources',[]);

angular
  .module('todoist', [
    'todoist.services',
    'todoist.directives',
    'todoist.filters',
    'todoist.resources',

    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('todo', {
          url: '/',
          views: {
              'categories@': {
                  controller: 'CategoriesCtrl as categoriesCtrl',
                  templateUrl: 'views/categories.html'
              },
              'items@': {
                  parent: 'todo.categories',
                  controller: 'ItemsCtrl as itemsCtrl',
                  templateUrl: 'views/items/index.html'
              }
          }
      })
      .state('todo.categories', {
          url: 'categories?project&schedule&priority',
          views: {
              'items@': {
                  controller: 'ItemsCtrl as itemsCtrl',
                  templateUrl: 'views/items/index.html'
              }
          }
      })

    $urlRouterProvider.otherwise('/categories?schedule=0');
  });
