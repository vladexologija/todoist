'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
       type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT
      },
      hashed_password: {
        type: Sequelize.TEXT
      },
      salt: {
        type: Sequelize.TEXT
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
