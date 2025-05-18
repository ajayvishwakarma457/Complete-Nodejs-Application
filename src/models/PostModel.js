const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./UserModel');

const postSchema = new Schema({
  caption: {
    type: String,
    required: [true, 'Caption is required']
  },
  media_url: {
    type: String,
    required: [true, 'Media URL is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  }
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
module.exports = Post;
