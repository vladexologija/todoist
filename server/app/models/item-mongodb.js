
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  dueDate: { type: Date, default: '' },
  date: { type: Date, default: Date.now },
  checked: { type: Boolean, default: false },
  content: { type: String },
  isDeleted: { type: Boolean, default: false },
  priority: { type: Number, default: 0 },
  itemOrder: { type: Number },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
},{
  toJSON: { virtuals: true }
});

ItemSchema.virtual('id').get(function() {
  return this._id.valueOf()
})

module.exports = mongoose.model('Item', ItemSchema);
