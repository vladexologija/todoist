const {
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull
} = require('graphql');

const {
  fromGlobalId,
  connectionFromArray,
  connectionArgs,
  connectionDefinitions
} = require('graphql-relay');

const TodoType = require('./types/todo');
const ProjectType = require('./types/project');
const Todo = require('../../app/models/item-mongodb');
const Project = require('../../app/models/project-mongodb');

function todoField() {
  return {
    type: TodoType,
    args: {
      itemId: {
        name: 'itemId',
        type: new GraphQLNonNull(GraphQLString)
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
  const { connectionType } = connectionDefinitions({
    name: 'Todos',
    nodeType: TodoType,
    connectionFields: () => ({
      totalCount: {
        type: GraphQLInt,
        resolve: conn => conn.totalCount
      },
      [TodoType]: {
        type: new GraphQLList(TodoType),
        resolve: conn => conn.todos
      }
    })
  });

  return {
    type: connectionType,
    args: connectionArgs,
    resolve: (conn, args) => {
      var foundItems = new Promise((resolve, reject) => {
        Todo.find({}, (err, todos) => {
          err ? reject(err) : resolve({ totalCount: todos.length, todos });
        });
      });

      return foundItems;
    }
  };
}

function addProjectField() {
  // TODO use Relay
  return {
    type: ProjectType,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (conn, args) => {
      // TODO use async await
      var newProject = new Promise((resolve, reject) => {
        Project.create(
          {
            name: args.data
          },
          function(err, project) {
            err ? reject(err) : resolve(project);
          }
        );
      });

      return newProject;
    }
  };
}

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
    addProject: addProjectField()
  })
});

// TODO separate into components
module.exports = new GraphQLSchema({
  query: rootType,
  mutation: rootMutation
});
