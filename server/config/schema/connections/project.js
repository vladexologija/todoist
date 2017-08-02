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
    resolveNode: edge => getObject(edge),
    connectionFields: () => ({
      project: {
        type: ProjectType,
        resolve: conn => conn
      }
    })
  });

  return {
    type: connectionType,
    args: connectionArgs,
    resolve: (conn, args) => {
      var foundProject = new Promise((resolve, reject) => {
        Project.findById(conn.project, (err, project) => {
          err ? reject(err) : resolve(project);
        });
      });

      return foundProject;
    }
  };
}

module.exports = projectConnection;
