const { GraphQLList, GraphQLID } = require('graphql');
const CommentType = require('../types/CommentType');
const Comment = require('../../models/CommentModel');

module.exports = {
  commentsByPost: {
    type: new GraphQLList(CommentType),
    args: { postId: { type: GraphQLID } },
    resolve: (_, args) => {
      return Comment.find({ post: args.postId, is_deleted: false })
        .populate('user')
        .populate('post');
    }
  },
  commentsByUser: {
    type: new GraphQLList(CommentType),
    args: { userId: { type: GraphQLID } },
    resolve: (_, args) => {
      return Comment.find({ user: args.userId, is_deleted: false })
        .populate('user')
        .populate('post');
    }
  }
};
