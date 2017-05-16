'use strict';

angular.module('todoist.directives').directive('todoItem', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/items/show.html',
    scope: {
      item: "=",
      priorities: "=",
      projects: "=",
      onSave: "&",
      onCancel: "&",
      onDelete: "&",
      onComplete: "&"
    },
    link: function($scope) {

      $scope.show = function (item) {
        $scope.item({item:item});
      }

      $scope.toggleEditMode = function () {
        $scope.item.isEditMode = true;
      }

      $scope.getClass = function (item) {
        var cls = 'checkbox';

        var priority = _.find( $scope.priorities, function ( priority ) {
          return priority.id === item.priority;
        } )

        if ( priority ) {
          cls += '-' + priority.class;
        }

        return cls;
      }

      $scope.getPriorityClass = function (priorityId) {

        var priority = _.find( $scope.priorities, function ( priority ) {
          return priority.id === priorityId;
        } )

        if ( priority ) {
          return priority.class;
        }

        return;
      }

      $scope.choosePriority = function (priority) {
        $scope.item.priority = priority.id;
      }

      $scope.chooseProject = function (project) {
        $scope.item.project = project.id;
      }

      $scope.save = function () {
        $scope.onSave( {item:$scope.item} );
      }

      $scope.cancel = function () {
        if(!$scope.item.id) {
          $scope.onCancel();
        } else {
          $scope.item.isEditMode = false;
        }
      }

      $scope.delete = function (item) {
        $scope.onDelete();
      }

      $scope.check = function (item) {
        item.checked = !item.checked;
        $scope.onComplete({item: item});
      }
    }
  }
})
