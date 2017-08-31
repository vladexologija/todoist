const { GraphQLID, GraphQLNonNull } = require('graphql');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');

const { GraphQLUser } = require('../types/user');
const { removeProject } = require('../api/projects');
const { getViewer } = require('../api/user');

module.exports = mutationWithClientMutationId({
  name: 'RemoveProject',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  outputFields: {
    projectId: {
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
    removeProject({ id: localId });
    return { id };
  }
});
