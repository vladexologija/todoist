var _ = require('lodash');
var Item = require('../models/item')
var Project = require('../models/project')
var logger = require('logger');
var moment = require('moment');

function create(req, res) {
    Item.create({
      project_id: req.body.project.id,
      content: req.body.content,
      checked: req.body.checked,
      is_deleted: req.body.isDeleted,
      date: req.body.date,
      due_date: req.body.dueDate,
      item_order: req.body.itemOrder,
      priority: req.body.priority
    }).then(function(item) {
        res.json(item);
    });
};

function list(req, res) {
    Item.findAll({include: [ Project ] })
        .then(function(items) {
            res.json(items);
        });
};

function info(req, res) {
    Item.findById(req.params.id)
        .then(
            function(item) {
                if (!item) {
                    res.send('No item found');
                    return;
                }

                res.json(item);
            });
}

function update(req, res) {
    Item.findById(req.params.id)
        .then(function(item) {
            if (!item)
                return res.send('No item found');

            item.updateAttributes({
              projectId: req.body.project.id ? req.body.project.id : req.body.project,
              content: req.body.content,
              checked: req.body.checked,
              isDeleted: req.body.isDeleted,
              date: moment(req.body.date).format('YYYY-MM-DD HH:mm:ss.SSS Z'),
              dueDate: moment(req.body.dueDate).format('YYYY-MM-DD HH:mm:ss.SSS Z'),
              itemOrder: req.body.itemOrder,
              priority: req.body.priority
            })

            item.save({include: [ Project ] }).then(function(item) {
                res.send(item);
            });
        });
};

function del(req, res) {
    var itemid = req.params.id;
    if (itemid) {
        Item
          .destroy({ where: {
            id: itemid
          }})
          .then(
              function(item) {
                  logger.debug("Location id " + itemid + " deleted");
                  res.send('success');
              }
          );
    } else {
        res.send("No locationid");
    };
}

module.exports = {
    delete: del,
    update: update,
    info: info,
    list: list,
    create: create
}
