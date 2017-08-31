const { GraphQLString, GraphQLNonNull } = require('graphql');

const {
  fromGlobalId,
  mutationWithClientMutationId,
  offsetToCursor
} = require('graphql-relay');

const { GraphQLUser, GraphQLProjectEdge } = require('../types/user');
const { listProjects, createProject } = require('../api/projects');
const { getViewer } = require('../api/user');

module.exports = mutationWithClientMutationId({
  name: 'AddProject',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    project: {
      type: GraphQLProjectEdge,
      resolve: ({ project }) => {
        return listProjects().then(projects => {
          // TODO figure out a better way
          const cursor = offsetToCursor(projects.length);
          return {
            cursor,
            node: project
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
    return createProject(args);
  }
});
