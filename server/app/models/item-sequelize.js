const Sequelize = require('sequelize');
const db = require('../../config/database');
const Project = require('./project-sequelize')

let Item = db.define('item', {
  projectId: {
    type: Sequelize.INTEGER,
    field: 'project_id'
  },
  content: Sequelize.TEXT,
  checked: Sequelize.BOOLEAN,
  isDeleted: {
    type: Sequelize.BOOLEAN,
    field: 'is_deleted'
  },
  date: Sequelize.DATE,
  dueDate: {
    type: Sequelize.DATE,
    field: 'due_date'
  },
  itemOrder: {
    type: Sequelize.INTEGER,
    field: 'item_order'
  },
  priority: Sequelize.INTEGER
},{
  underscored: true
});

// TODO bootstrap on start to initialize associations
Item.belongsTo(Project)

module.exports = Item;
