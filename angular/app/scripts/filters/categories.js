angular.module('todoist.filters').filter('filterByCategory', function() {
    return function(items, categoryCriteria, showChecked) {
        return _.filter(items, function(item) {
            if (item.isEditMode) return true;

            var checked = showChecked ? true : !item.checked;

            return categoryCriteria.check(item) && checked;
        });
    };
});
