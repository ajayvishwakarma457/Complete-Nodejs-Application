const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const CommentType = require('../types/CommentType');
const Comment = require('../../models/CommentModel');

module.exports = {
  createComment: {
    type: CommentType,
    args: {
      content: { type: new GraphQLNonNull(GraphQLString) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      postId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, args) => {
      const newComment = new Comment({content: args.content,user: args.userId,post: args.postId});
      const savedComment = await newComment.save();
      return await Comment.findById(savedComment._id).populate('user').populate('post');
    }
  }
};
