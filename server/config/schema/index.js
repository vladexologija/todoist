const {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require('graphql');

const {
  nodeDefinitions,
  fromGlobalId,
  mutationWithClientMutationId,
  connectionFromPromisedArray,
  connectionArgs,
  connectionDefinitions
} = require('graphql-relay');

const { GraphQLUser, GraphQLProject, GraphQLTodo } = require('./types');
const { nodeField } = require('./node');
const { createProject } = require('./api/projects');
const { createTodo } = require('./api/todos');

const query = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => ({
        id: '1',
        username: 'test',
        name: 'testing'
      })
    },
    node: nodeField
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addProject: mutationWithClientMutationId({
      name: 'AddProject',
      inputFields: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      outputFields: {
        project: {
          type: GraphQLProject
        }
      },
      mutateAndGetPayload: args => {
        return createProject(args);
      }
    }),
    addTodo: mutationWithClientMutationId({
      name: 'AddTodo',
      inputFields: {
        content: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      outputFields: {
        todo: {
          type: GraphQLTodo
        }
      },
      mutateAndGetPayload: args => {
        console.log('mutateAndGetPayload', args);
        return createTodo(args);
      }
    })
  })
});

module.exports = new GraphQLSchema({
  query,
  mutation
});
