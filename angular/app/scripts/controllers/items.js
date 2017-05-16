'use strict';

angular.module('todoist').controller('ItemsCtrl', ['$rootScope', 'ItemResource', 'ProjectResource', 'PriorityResource', '$state', '$stateParams',
function($rootScope, ItemResource, ProjectResource, PriorityResource, $state, $stateParams) {
    var self = this;

    self.showChecked = false;
    self.priorities = PriorityResource.list;

    refresh();

    self.toggleChecked = function() {
        self.showChecked = !self.showChecked;
    };

    self.addItem = function() {
        self.items.push({
            isEditMode: true,
            project: {
                id: $stateParams.project || self.inbox.id
            },
            checked: false
        });
    }

    self.save = function(item) {
        if (item.id) {
            ItemResource.update(item.id, item).then(function() {
                item.isEditMode = false;
            });
        } else {
            ItemResource.create(item).then(function() {
                refresh();
            });
        }
    }

    self.cancel = function() {
        self.items = _.reject(self.items, function(item) {
            return item.isEditMode;
        })
    }

    self.delete = function(item) {
        if (confirm("Delete " + item.content + "?") == true) {
            ItemResource.deleteOne(item.id, item).then(function() {
              self.items = _.reject(self.items, function(i) {
                  return i.id === item.id;
              })
            })
        }
    }

    function selectedCategoryCriteria() {
        if ($stateParams.project) {
            var project = _.find( self.projects, function ( p ) {
              return p.id === $stateParams.project || p.id === parseInt($stateParams.project);
            })

            return {
              category: 'project',
              project: project,
              title: project.name,
              check: function (item) {
                return item.project ? item.project.id === this.project.id : false;
              }
            }
        } else if ($stateParams.schedule) {
            var check;
            var title;
            var schedule = parseInt($stateParams.schedule);

            if (schedule === 0) {
                title = 'Today';
                check = function ( item ) {
                    return moment(item.dueDate).isSame(moment(), 'day');
                }
            } else if (schedule === 7) {
                title = 'Next 7 days';
                check = function( item ) {
                    return moment(item.dueDate).isAfter(moment()) && moment(item.dueDate).isBefore(moment().add(7, 'days'));
                }
            }

            return {
              category: 'schedule',
              schedule: schedule,
              title: title,
              check: check
            }
        } else if ($stateParams.priority) {
            return {
              category: 'priority',
              priority: parseInt($stateParams.priority),
              title: 'Priority ' + $stateParams.priority,
              check: function ( item ) {
                return item.priority === parseInt($stateParams.priority);
              }
            }
        }
    }

    function refresh() {
        ItemResource.list().then(function(result) {
            $rootScope.items = self.items = result;

            self.inbox = $rootScope.inbox;
            self.projects = $rootScope.projects;

            self.categoryCriteria = selectedCategoryCriteria();
        })
    }

}]);
