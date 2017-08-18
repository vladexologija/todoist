const { GraphQLInt, GraphQLList } = require('graphql');

const {
  connectionFromArray,
  connectionArgs,
  connectionDefinitions
} = require('graphql-relay');

const ProjectType = require('../types/project');
const Project = require('../../../app/models/project-mongodb');

function projectConnection() {
  const { connectionType } = connectionDefinitions({
    name: 'ItemProjects',
    nodeType: ProjectType,
    resolveNode: edge => {
      var foundProject = new Promise((resolve, reject) => {
        Project.findById(edge.node.project, (err, project) => {
          err ? reject(err) : resolve(project);
        });
      });

      return foundProject;
    }
  });

  return {
    type: connectionType,
    args: connectionArgs,
    resolve: (conn, args) => {
      const cnn = connectionFromArray([conn], args);
      return cnn;
    }
  };
}

module.exports = projectConnection;
