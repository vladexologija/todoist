'use strict';

angular.module('todoist.directives').directive('todoNavTabs', function() {
  return {
    restrict: 'A',
    transclude: true,
    template: '<div ng-transclude></div>',
    replace: true,
    link: function(scope, element, attributes) {
      var $links = element.find('.nav-tabs a');
      var $tabs = element.find('.tab-content .tab-pane');

      $links.each( function () {
        var $link = $(this);

        $link.on( 'click', function() {
          $links.parent().removeClass('active');
          $link.parent().addClass('active');

          $tabs.each( function () {
            var $tab = $(this);

            if ( $link.data('tab') === $tab.attr('id') ) {
              $tab.addClass('fade').addClass('active').addClass('in');
            } else {
              $tab.removeClass('fade').removeClass('active').removeClass('in');
            }

          });
        });
      } );
    }
  }
})
