'use strict';

angular.module('todoist').controller('CategoriesCtrl', ['$rootScope', 'ProjectResource', 'Utils', '$state', '$stateParams',
function($rootScope, ProjectResource, Utils, $state, $stateParams) {
    var self = this;
    self.colors = Utils.colors;

    refresh();

    self.add = function() {
        self.projects.push({
            isEditMode: true
        });
    };

    self.save = function(project) {
        if (project.id) {
            ProjectResource.update(project.id, project).then(function(data) {
                refreshLocal(data);
            });
        } else {
            ProjectResource.create(project).then(function(data) {
                refresh();
                $state.go('todo.categories', { project: data.id } );
            });
        }
    };

    self.cancel = function() {
        self.projects = _.reject(self.projects, function(project) {
            return project.isEditMode;
        });
    };

    self.deleteProject = function(project) {
        if (confirm('Delete ' + project.name + '?') == true) {
            ProjectResource.deleteOne(project.id, project).then(function() {
              self.projects = _.reject(self.projects, function(p) {
                  return p.id === project.id;
              })
            });
        }
    };

    function refreshLocal(data) {
      $rootScope.projects = self.projects = _.map(self.projects, function(project) {
          if (project.id === data.id){
            data.isEditMode = false;
            return data
          }
          return project;
      });
    }

    function refresh() {
        ProjectResource.list().then(function(projects) {
            $rootScope.inbox = self.inbox = _.find(projects, function(project) {
                return project.name === 'Inbox';
            });
            $rootScope.projects = self.projects = projects;
        });
    }

}]);
