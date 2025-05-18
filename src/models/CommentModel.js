const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Comment content is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  deleted_at: {
    type: Date,
    default: null
  }
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
module.exports = Comment;
