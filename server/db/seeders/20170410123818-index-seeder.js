'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('projects', [{
      name: 'Inbox',
      updated_at: '2015-08-24 12:00:00 +01:00',
      created_at: '2015-08-24 12:00:00 +01:00'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('projects', null, {});
  }
};
