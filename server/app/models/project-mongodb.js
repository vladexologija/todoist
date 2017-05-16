
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: { type: String, unique: true },
  color: { type: String  },
  isDeleted: { type: Boolean, default: false },
  itemOrder: { type: Number },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
},{
  toJSON: { virtuals: true }
});

ProjectSchema.virtual('id').get(function() {
  return this._id.valueOf()
})

module.exports = mongoose.model('Project', ProjectSchema);
