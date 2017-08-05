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
  nodeInterface,
  nodeField,
  fromGlobalId,
  mutationWithClientMutationId,
  connectionFromPromisedArray,
  connectionArgs,
  connectionDefinitions
} = require('graphql-relay');

const TodoType = require('./types/todo');
const ProjectType = require('./types/project');
const Todo = require('../../app/models/item-mongodb');
const Project = require('../../app/models/project-mongodb');

var { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    // TODO try out interfaces
    // TODO figure out how to use type properly
    var { type, id } = fromGlobalId(globalId);
    var foundItems = new Promise((resolve, reject) => {
      Todo.findById(id, (err, todos) => {
        err ? reject(err) : resolve(todos);
      });
    });

    return foundItems;
  },
  obj => {
    return obj.content ? TodoType : Project;
  }
);

function todoField() {
  // relay node definitions ?
  return {
    type: TodoType,
    args: {
      itemId: {
        name: 'itemId',
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: (conn, { itemId }, source) => {
      var foundItems = new Promise((resolve, reject) => {
        Todo.findById(itemId, (err, todos) => {
          err ? reject(err) : resolve(todos);
        });
      });

      return foundItems;
    }
  };
}

function allTodosField() {
  const { connectionType: TodoConnection } = connectionDefinitions({
    name: 'Todos',
    nodeType: TodoType,
    connectionFields: () => ({
      totalCount: {
        type: GraphQLInt,
        resolve: conn => conn.edges.length
      }
      // [TodoType]: {
      //   type: new GraphQLList(TodoType),
      //   resolve: conn => conn.todos
      // }
    })
  });

  return {
    type: TodoConnection,
    args: connectionArgs,
    resolve: (conn, args) => {
      var promise = new Promise((resolve, reject) => {
        Todo.find({}, (err, todos) => {
          err ? reject(err) : resolve(todos);
        });
      });

      return connectionFromPromisedArray(promise, args);
    }
  };
}

const projectMutation = mutationWithClientMutationId({
  name: 'AddProject',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    project: {
      type: ProjectType
    }
  },
  mutateAndGetPayload: args =>
    new Promise((resolve, reject) => {
      Project.create({ name: args.name }, (err, project) => {
        console.log('project', project);
        err ? reject(err) : resolve({ project });
      });
    })
});

const rootType = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    todo: todoField(),
    allTodos: allTodosField()
  })
});

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addProject: projectMutation
  })
});

// TODO separate into components
module.exports = new GraphQLSchema({
  query: rootType,
  mutation: rootMutation
});
