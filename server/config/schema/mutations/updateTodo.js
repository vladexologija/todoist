const {
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');

const { GraphQLUser } = require('../types/user');
const GraphQLTodo = require('../types/todo');
const { updateTodo } = require('../api/todos');
const { getViewer } = require('../api/user');

module.exports = mutationWithClientMutationId({
  name: 'UpdateTodo',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    checked: { type: new GraphQLNonNull(GraphQLBoolean) },
    content: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    todo: {
      type: GraphQLTodo,
      resolve: data => data
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer()
    }
  },
  mutateAndGetPayload: ({ id, content, checked }) => {
    const localId = fromGlobalId(id).id;
    return updateTodo({ id: localId, content, checked });
  }
});
