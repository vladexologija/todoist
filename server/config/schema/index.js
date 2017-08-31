const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { GraphQLUser } = require('./types/user');
const { nodeField } = require('./node');
const { getViewer } = require('./api/user');

const mutations = require('./mutations');

const query = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer()
    },
    node: nodeField
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => mutations
});

module.exports = new GraphQLSchema({
  query,
  mutation
});
