const Todo = require('../../../app/models/item-mongodb');

function listTodos() {
  // TODO just use plain promise
  return new Promise((resolve, reject) => {
    Todo.find({}, (err, todos) => {
      console.log('todos', todos);
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

module.exports = { listTodos, findTodoById };
