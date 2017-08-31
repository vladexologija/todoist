const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');

const { GraphQLUser } = require('../types/user');
const GraphQLProject = require('../types/project');
const { updateProject } = require('../api/projects');
const { getViewer } = require('../api/user');

module.exports = mutationWithClientMutationId({
  name: 'RenameProject',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    project: {
      type: GraphQLProject,
      resolve: data => data
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer()
    }
  },
  mutateAndGetPayload: ({ id, name }) => {
    const localId = fromGlobalId(id).id;
    return updateProject({ id: localId, name });
  }
});
