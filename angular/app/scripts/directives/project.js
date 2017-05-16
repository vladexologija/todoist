'use strict';
angular.module('todoist.directives').directive('todoProject', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/projects/show.html',
    replace: true,
    scope: {
        project : "=",
        colors  : "=",
        onSave  : "&",
        onCancel: "&",
        onDelete: "&"
    },
    link: function($scope) {
      $scope.chooseColor = function (color) {
        $scope.project.color = color;
      }

      $scope.save = function () {
        $scope.onSave( {project:$scope.project} );
      }

      $scope.cancel = function () {
        if(!$scope.project.id) {
          $scope.onCancel();
        } else {
          $scope.project.isEditMode = false;
        }
      }

      $scope.delete = function (project) {
        $scope.onDelete();
      }
    }
  }
})
