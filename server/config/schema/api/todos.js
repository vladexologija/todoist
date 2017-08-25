const Todo = require('../../../app/models/item-mongodb');

function listTodos() {
  // TODO just use plain promise
  return new Promise((resolve, reject) => {
    Todo.find({}, (err, todos) => {
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
  console.log('createTodo', args);
  return new Promise((resolve, reject) => {
    Todo.create({ content: args.content }, (err, todo) => {
      console.log('todo', todo);
      err ? reject(err) : resolve({ todo });
    });
  });
}

module.exports = { listTodos, findTodoById, createTodo };
