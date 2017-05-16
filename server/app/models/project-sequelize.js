const Sequelize = require('sequelize');
const db = require('../../config/database');

let Project = db.define('project', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  isDeleted: {
    type: Sequelize.BOOLEAN,
    field: 'is_deleted'
  },
  itemOrder: {
    type: Sequelize.INTEGER,
    field: 'item_order'
  }
}, {
  underscored: true
});

module.exports = Project;
