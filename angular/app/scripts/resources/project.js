angular.module('todoist.resources').factory('ProjectResource', ['$http', '$q', 'apiUrl', function($http, $q, apiUrl) {
  var currentProjectId;

  var list = function() {
    return $http.get(apiUrl + '/projects').then(function(response) {
      return response.data;
    });
  };

  var update = function(id, data) {
    return $http.put(apiUrl + '/projects/' + id, data).then(function(response) {
      return response.data;
    })
  };

  var deleteOne = function(id, data) {
    return $http.delete(apiUrl + '/projects/' + id, data)
  };

  var setCurrentProjectId = function(id) {
    currentProjectId = id;
  };

  var getCurrentProjectId = function() {
    return currentProjectId;
  };

  var create = function(data) {
    return $http.post(apiUrl + '/projects/', data).then(function(response) {
      return response.data;
    })
  };

  var getProjectById = function(projectId) {
    return $http.get(apiUrl + '/projects/' + projectId).then(function(result) {
      return result.data;
    })
  };

  return {
    list: list,
    update: update,
    deleteOne: deleteOne,
    create: create,
    setCurrentProjectId: setCurrentProjectId,
    getCurrentProjectId: getCurrentProjectId,
    getProjectById: getProjectById
  }

}])
