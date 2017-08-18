const GraphQLObjectType = require('graphql/type').GraphQLObjectType;
const GraphQLNonNull = require('graphql/type').GraphQLNonNull;
const GraphQLString = require('graphql/type').GraphQLString;
const GraphQLInt = require('graphql/type').GraphQLInt;

const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../node');

const ProjectType = new GraphQLObjectType({
  name: 'project',
  description: 'todo project',
  fields: () => ({
    id: globalIdField('todos'),
    name: {
      type: GraphQLString,
      description: 'The name of the project.'
    },
    color: {
      type: GraphQLString,
      description: 'The color of the project.'
    }
  }),
  interfaces: () => [nodeInterface]
});

module.exports = ProjectType;
