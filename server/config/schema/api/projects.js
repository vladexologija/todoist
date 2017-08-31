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

function updateProject(args) {
  return new Promise((resolve, reject) => {
    console.log('args', args);
    Project.findById(args.id, function(err, project) {
      if (!project) {
        return reject(err);
      } else if (err) {
        return reject(err);
      }

      project.name = args.name || project.name;
      project.color = args.color || project.color;

      project.save(function(err, project) {
        if (err) {
          return reject(err);
        } else {
          return resolve(project);
        }
      });
    });
  });
}

function removeProject(args) {
  return new Promise((resolve, reject) => {
    console.log('args', args);
    Project.findByIdAndRemove(args.id, (err, result) => {
      err ? reject(err) : resolve({ id: args.id });
    });
  });
}

module.exports = {
  listProjects,
  findProjectById,
  createProject,
  updateProject,
  removeProject
};
