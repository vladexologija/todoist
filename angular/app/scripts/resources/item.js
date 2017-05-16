angular.module('todoist.resources').factory('ItemResource', ['$http','apiUrl', function($http, apiUrl) {

    var list = function() {
        return $http.get(apiUrl + '/items').then(function(result) {
            return result.data;
        });
    }

    var create = function(data) {
        return $http.post(apiUrl + '/items/', data).then(function(response) {
            return response.data;
        })
    }

    var update = function(id, data) {
        return $http.put(apiUrl + '/items/' + id, data)
    }

    var deleteOne = function(itemid, data) {
        return $http.delete(apiUrl + '/items/' + itemid, data)
    }

    var getItemById = function(id) {
        return $http.get(apiUrl + '/items/' + id).then(function(result) {
            return result.data;
        });
    }

    return {
        list: list,
        create: create,
        update: update,
        deleteOne: deleteOne,
        getItemById: getItemById
    }

}])
