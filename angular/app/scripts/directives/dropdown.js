'use strict';

angular.module('todoist.directives').directive('todoDropdown', function() {
  return {
    restrict: 'A',
    transclude: true,
    template: '<div ng-transclude></div>',
    replace: true,
    link: function(scope, element, attributes) {
      var $button = element.find('.dropdown-toggle');
      var $dropdown = element.find('.dropdown');

      $button.on( 'click', function() {
        if ( $dropdown.hasClass('open') ) {
          setTimeout(function(){
            $dropdown.removeClass('open');
          });
        } else {
          setTimeout(function(){
            $dropdown.addClass('open');
          });
        }
      });

      $button.on('blur', function () {
        setTimeout(function(){
          $dropdown.removeClass('open');
        }, 200);
      })
    }
  }
})
