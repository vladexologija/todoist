const { nodeDefinitions, fromGlobalId } = require('graphql-relay');

var { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    // TODO figure out how to use type properly
    var { type, id } = fromGlobalId(globalId);
    console.log('globalId', globalId);
    console.log('type', type);
    console.log('id', id);
    if (type === 'Todo') {
      var foundItems = new Promise((resolve, reject) => {
        Todo.findById(id, (err, todos) => {
          err ? reject(err) : resolve(todos);
        });
      });

      return foundItems;
    }

    return null;
  },
  obj => {
    if (obj instanceof Todo) {
      return TodoType;
    } else if (obj instanceof Project) {
      return ProjectType;
    }

    return null;
  }
);

module.exports = { nodeInterface, nodeField };
