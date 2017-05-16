var _ = require('lodash');
var Item = require('../models/item')
var logger = require('logger');

function create(req, res) {
    var data = _.omit(req.body, 'project');
    data.project = req.body.project.id

    Item.create(data, function(err, item) {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(item);
        }
    });
};

function list(req, res) {
    Item.find({})
        .populate('project')
        .exec(function(err, items) {
            res.json(items);
        });
};

function info(req, res) {
    Item.findById(req.params.id)
        .exec(
            function(err, item) {
                if (!item) {
                    res.send(err);
                    return;
                } else if (err) {
                    res.send(err);
                    return;
                }
            });
}

function update(req, res) {
    Item.findById(req.params.id)
        .exec(function(err, item) {
            if (err)
                return res.send(err);

            if (!item)
                return res.send(err);

            item = _.extend(item, req.body);
            item.save(function(err, item) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(item);
                }
            });
        });
};

function del(req, res) {
    var itemid = req.params.id;
    if (itemid) {
        Item
            .findByIdAndRemove(itemid)
            .exec(
                function(err, item) {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    logger.debug("item id " + itemid + " deleted");
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
