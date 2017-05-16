'use strict';

angular.module('todoist.directives').directive('todoNavbar', ['$rootScope', '$state', function($rootScope, $state) {
    return {
        restrict: 'A',
        templateUrl: 'views/navbar.html',
        replace: true,
        link: function($scope, element) {
            $rootScope.$watchGroup(['projects', 'items'], function(values) {
                if (values) {
                    var projects = values[0];
                    var items = values[1];

                    if ( projects && items ) {
                        initialize(projects, items);
                    }
                }
            } );

            function initialize(projects, items) {
                var box = element.find('.typeahead');
                var initialized = element.find('.twitter-typeahead');

                if ( initialized && initialized.length )
                  return;

                var projectsList = new Bloodhound({
                  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                  queryTokenizer: Bloodhound.tokenizers.whitespace,
                  identify: function(p) { return p.id; },
                  local: projects
                });

                var itemsList = new Bloodhound({
                  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('content'),
                  queryTokenizer: Bloodhound.tokenizers.whitespace,
                  identify: function(i) { return i.project && i.project.id; },
                  local: items
                });

                box.typeahead({
                  highlight: true,
                  hint: true,
                  minLength: 1
                },
                {
                  name: 'projects',
                  display: 'name',
                  source: projectsList,
                  templates: {
                    suggestion: Handlebars.compile('<div><i class="fa fa-circle" style="color: {{color}}"></i><span class="tt-title">{{name}}</span></div>')
                  }
                },
                {
                  name: 'items',
                  display: 'content',
                  source: itemsList,
                  templates: {
                    suggestion: Handlebars.compile('<div><i class="fa fa-square-o""></i><span class="tt-title"">{{content}}</span></div>')
                  }
                });

                box.bind('typeahead:select', function(ev, suggestion) {
                  console.log('suggestion', suggestion);
                  // weather we're selecting project or just an item
                  var project = suggestion.project ? suggestion.project.id : suggestion.id
                  $state.go('todo.categories', { project: project }, { inherit: false } );
                });

            }

        }
    }
}])
