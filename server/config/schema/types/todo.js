const GraphQLObjectType = require('graphql/type').GraphQLObjectType;
const GraphQLNonNull = require('graphql/type').GraphQLNonNull;
const GraphQLString = require('graphql/type').GraphQLString;
const GraphQLID = require('graphql/type').GraphQLID;
const GraphQLBoolean = require('graphql/type').GraphQLBoolean;

const projectConnection = require('../connections/project');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../node');

const TodoType = new GraphQLObjectType({
  name: 'todo',
  description: 'todo item',
  fields: () => ({
    // a globalId is just a base64 encoding of the database id and the type
    id: globalIdField('todos'),
    content: {
      type: GraphQLString,
      description: 'The content of the todo.'
    },
    checked: {
      type: GraphQLBoolean,
      description: 'Checked todo? '
    },
    // FIXME
    editing: {
      type: GraphQLBoolean,
      description: 'Checked todo? '
    },
    projectConnection: projectConnection()
  }),
  interfaces: () => [nodeInterface]
});

module.exports = TodoType;
