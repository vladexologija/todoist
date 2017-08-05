const GraphQLObjectType = require('graphql/type').GraphQLObjectType;
const GraphQLNonNull = require('graphql/type').GraphQLNonNull;
const GraphQLString = require('graphql/type').GraphQLString;
const GraphQLID = require('graphql/type').GraphQLID;
const GraphQLBoolean = require('graphql/type').GraphQLBoolean;

const projectConnection = require('../connections/project');

const TodoType = new GraphQLObjectType({
  name: 'todo',
  description: 'todo item',
  fields: () => ({
    itemId: {
      type: GraphQLID,
      description: 'The id of the todo.'
    },
    content: {
      type: GraphQLString,
      description: 'The content of the todo.'
    },
    checked: {
      type: GraphQLBoolean,
      description: 'Checked todo? '
    },
    projectConnection: projectConnection()
  })
});

module.exports = TodoType;
