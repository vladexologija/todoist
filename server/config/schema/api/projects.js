const Project = require('../../../app/models/project-mongodb');

function listProjects() {
  // TODO just use plain promise
  return new Promise((resolve, reject) => {
    Project.find({}, (err, projects) => {
      err ? reject(err) : resolve(projects);
    });
  });
}

function findProjectById(id) {
  return new Promise((resolve, reject) => {
    Project.findById(id, (err, todos) => {
      err ? reject(err) : resolve(todos);
    });
  });
}

function createProject(args) {
  return new Promise((resolve, reject) => {
    Project.create({ name: args.name }, (err, project) => {
      console.log('project', project);
      err ? reject(err) : resolve({ project });
    });
  });
}

module.exports = { listProjects, findProjectById, createProject };
