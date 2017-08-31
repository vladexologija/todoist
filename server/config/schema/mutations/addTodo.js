const { GraphQLString, GraphQLNonNull } = require('graphql');

const {
  fromGlobalId,
  mutationWithClientMutationId,
  offsetToCursor
} = require('graphql-relay');

const { GraphQLUser, GraphQLTodoEdge } = require('../types/user');
const { listTodos, createTodo } = require('../api/todos');
const { getViewer } = require('../api/user');

module.exports = mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    content: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    todo: {
      type: GraphQLTodoEdge,
      resolve: ({ todo }) => {
        return listTodos().then(todos => {
          // TODO figure out a better way
          const cursor = offsetToCursor(todos.length);
          return {
            cursor,
            node: todo
          };
        });
      }
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer()
    }
  },
  mutateAndGetPayload: args => {
    return createTodo(args);
  }
});
