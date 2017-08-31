const { GraphQLID, GraphQLNonNull } = require('graphql');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');

const { GraphQLUser } = require('../types/user');
const { removeTodo } = require('../api/todos');
const { getViewer } = require('../api/user');

module.exports = mutationWithClientMutationId({
  name: 'RemoveTodo',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  outputFields: {
    todoId: {
      type: GraphQLID,
      resolve: ({ id }) => {
        return id;
      }
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer()
    }
  },
  mutateAndGetPayload: ({ id }) => {
    const localId = fromGlobalId(id).id;
    removeTodo({ id: localId });
    return { id };
  }
});
