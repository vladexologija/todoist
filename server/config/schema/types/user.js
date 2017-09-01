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

const projectConnection = require('../connections/project');

const {
  globalIdField,
  nodeDefinitions,
  fromGlobalId,
  connectionFromPromisedArray,
  connectionArgs,
  connectionDefinitions
} = require('graphql-relay');
const { nodeInterface } = require('../node');

const GraphQLTodo = require('./todo');
const GraphQLProject = require('./project');

const {
  listProjects,
  findProjectById,
  createProject
} = require('../api/projects');

const { listTodos, findTodoById } = require('../api/todos');

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
  const { connectionType, edgeType } = connectionDefinitions({
    name,
    nodeType: type,
    connectionFields: () => ({
      totalCount: {
        type: GraphQLInt,
        resolve: conn => conn.edges.length
      }
    })
  });

  const connection = {
    type: connectionType,
    args: connectionArgs,
    resolve: (conn, args) => {
      console.log('args', args);
      return connectionFromPromisedArray(action(), args);
    }
  };

  return {
    connection,
    edgeType
  };
}

// TODO refactor again :(
const projectsRoot = rootConnection('Projects', GraphQLProject, listProjects);
const todosRoot = rootConnection('Todos', GraphQLTodo, listTodos);

const GraphQLUser = new GraphQLObjectType({
  name: 'user',
  description: 'system user',
  fields: () => ({
    // a globalId is just a base64 encoding of the database id and the type
    id: globalIdField('user'),
    allProjects: projectsRoot.connection,
    allTodos: todosRoot.connection,
    todo: rootField(GraphQLTodo, findTodoById),
    project: rootField(GraphQLProject, findProjectById)
  }),
  interfaces: () => [nodeInterface]
});

module.exports = {
  GraphQLUser,
  GraphQLProjectEdge: projectsRoot.edgeType,
  GraphQLTodoEdge: todosRoot.edgeType
};
