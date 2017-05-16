angular.module('todoist.resources').factory('PriorityResource', function($http) {

    var list = [
      { id: 1, class:'priority_1' },
      { id: 2, class:'priority_2' },
      { id: 3, class:'priority_3' },
      { id: 4, class:'priority_4' }
    ];

    return {
        list: list
    }

})
