const GraphQLObjectType = require('graphql/type').GraphQLObjectType;
const GraphQLNonNull = require('graphql/type').GraphQLNonNull;
const GraphQLString = require('graphql/type').GraphQLString;
const GraphQLInt = require('graphql/type').GraphQLInt;

const ProjectType = new GraphQLObjectType({
  name: 'project',
  description: 'todo project',
  fields: () => ({
    projectId: {
      type: GraphQLInt,
      description: 'The id of the project.'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the project.'
    },
    color: {
      type: GraphQLString,
      description: 'The color of the project.'
    }
  })
});

module.exports = ProjectType;
