'use strict';

angular.module('todoist.directives').directive('todoFormatDate', function(){
    return {
     require: 'ngModel',
      link: function(scope, elem, attr, modelCtrl) {
        modelCtrl.$formatters.push(function(modelValue){
          return moment(modelValue).toDate();
        })
      }
    }
  })
