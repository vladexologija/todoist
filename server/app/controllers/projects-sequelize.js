var Project = require('../models/project')
var logger = require('logger')

module.exports.create = function(req, res) {
  Project.create({
    name: req.body.name,
    color: req.body.color,
    isDeleted: req.body.isDeleted,
    itemOrder: req.body.itemOrder
  }).then(function(project) {
    res.json(project);
  });
};

module.exports.list = function(req, res) {
  Project.findAll().then(function(projects) {
    res.json(projects);
  });
};

module.exports.info = function (req, res) {
  Project.findById(req.params.id)
    .then(
      function(project) {
        if (!project) {
          res.send('No project found');
          return;
        }

        res.json(project);
      });
}

module.exports.update = function (req, res) {
  Project.findById(req.params.id)
    .then(
      function( project) {
        if (!project) {
          res.send('No project ofund');
          return;
        }

        project.name = req.body.name;
        project.color = req.body.color;

        project.save().then(function(project) {
          res.send(project);
        });
      });
};

module.exports.delete = function(req, res) {
  var id = req.params.id;
  if (id) {
    Project
      .destroy({ where: {
        id: id
      }})
      .then(
        function(project) {
          logger.debug("Project " + id + " deleted");
          res.send('success');
        }
    );
  } else {
    res.send("No projectId");
  };
}
