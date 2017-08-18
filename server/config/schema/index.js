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

const TodoType = require('./types/todo');
const ProjectType = require('./types/project');
const { nodeField } = require('./node');

const {
  listProjects,
  findProjectById,
  createProject
} = require('./api/projects');

const { listTodos, findTodoById } = require('./api/todos');

function rootField(type, action) {
  const argDefs = {};
  argDefs.id = { type: GraphQLID };

  return {
    type,
    args: argDefs,
    resolve: (_, args) => {
      console.log('resolve', args);
      if (args.id !== undefined && args.id !== null) {
        const globalId = fromGlobalId(args.id);
        if (
          globalId.id === null ||
          globalId.id === undefined ||
          globalId.id === ''
        ) {
          throw new Error('No valid ID extracted from ' + args.id);
        }
        return action(globalId.id);
      }
      throw new Error('must provide id or ' + idName);
    }
  };
}

function rootConnection(name, type, action) {
  const { connectionType } = connectionDefinitions({
    name,
    nodeType: type,
    connectionFields: () => ({
      totalCount: {
        type: GraphQLInt,
        resolve: conn => conn.edges.length
      }
    })
  });
  return {
    type: connectionType,
    args: connectionArgs,
    resolve: (conn, args) => {
      return connectionFromPromisedArray(action(), args);
    }
  };
}

function rootMutation(type, action) {
  return mutationWithClientMutationId({
    name: 'Add',
    inputFields: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    outputFields: {
      project: {
        type
      }
    },
    mutateAndGetPayload: args => action
  });
}

const query = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    allProjects: rootConnection('Projects', ProjectType, listProjects),
    allTodos: rootConnection('Todos', TodoType, listTodos),
    todo: rootField(TodoType, findTodoById),
    project: rootField(ProjectType, findProjectById),
    node: nodeField
  })
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addProject: rootMutation(ProjectType, createProject)
  })
});

module.exports = new GraphQLSchema({
  query,
  mutation
});
