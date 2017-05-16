var Project = require('../models/project')
var logger = require('logger')

module.exports.create = function(req, res) {

  Project.create({
    name: req.body.name,
    color: req.body.color,
    isDeleted: req.body.isDeleted,
    itemOrder: req.body.itemOrder
  }, function(err, item) {
    if (err) {
      res.json(err);
    } else {
      res.json(item);
    }
  });
};

module.exports.list = function(req, res) {
  Project.find({}, function(err, projects) {
    res.json(projects);
  });
};

module.exports.info = function (req, res) {
  Project.findById(req.params.id)
  .exec(
    function(err, project) {
      if (!project) {
        res.send(err);
        return;
      } else if (err) {
        res.send(err);
        return;
      }
    });
}

module.exports.update = function (req, res) {
  Project.findById(req.params.id)
  .exec(
    function(err, project) {
      if (!project) {
        res.send(err);
        return;
      } else if (err) {
        res.send(err);
        return;
      }
      project.name = req.body.name;
      project.color = req.body.color;

      project.save(function(err, project) {
        if (err) {
          res.send(err);
        } else {
          res.send(project);
        }
      });
    });
};

module.exports.delete = function(req, res) {
var id = req.params.id;
if (id) {
  Project
    .findByIdAndRemove(id)
    .exec(
      function(err, project) {
        if (err) {
          res.send(err);
          return;
        }
        logger.debug("Project " + id + " deleted");
        res.send('success');
      }
  );
} else {
  res.send("No projectId");
  };
}
