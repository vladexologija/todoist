const _ = require('underscore');
const Todo = require('../../../app/models/item-mongodb');

function listTodos(args) {
  let filter = {};
  if (
    !_.isUndefined(args) &&
    !_.isUndefined(args.filter) &&
    args.filter !== 'all'
  ) {
    filter = args.filter === 'active' ? { checked: false } : { checked: true };
  }
  // TODO just use plain promise
  return new Promise((resolve, reject) => {
    Todo.find(filter, (err, todos) => {
      err ? reject(err) : resolve(todos);
    });
  });
}

function findTodoById(id) {
  return new Promise((resolve, reject) => {
    Todo.findById(id, (err, todos) => {
      err ? reject(err) : resolve(todos);
    });
  });
}

function createTodo(args) {
  return new Promise((resolve, reject) => {
    Todo.create({ content: args.content }, (err, todo) => {
      err ? reject(err) : resolve({ todo });
    });
  });
}

function updateTodo(args) {
  return new Promise((resolve, reject) => {
    Todo.findById(args.id, function(err, project) {
      if (!project) {
        return reject(err);
      } else if (err) {
        return reject(err);
      }

      project.content = args.content;
      project.checked = args.checked;

      project.save(function(err, project) {
        if (err) {
          return reject(err);
        } else {
          return resolve(project);
        }
      });
    });
  });
}

function removeTodo(args) {
  return new Promise((resolve, reject) => {
    Todo.findByIdAndRemove(args.id, (err, result) => {
      err ? reject(err) : resolve({ id: args.id });
    });
  });
}

module.exports = {
  listTodos,
  findTodoById,
  createTodo,
  updateTodo,
  removeTodo
};
