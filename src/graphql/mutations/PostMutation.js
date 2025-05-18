const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');

const PostType = require('../types/PostType');
const Post = require('../../models/PostModel');

module.exports = {
  createPost: {
    type: PostType,
    args: {
      caption: { type: new GraphQLNonNull(GraphQLString) },
      media_url: { type: new GraphQLNonNull(GraphQLString) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_, args) => {
      const newPost = new Post({
        caption: args.caption,
        media_url: args.media_url,
        user: args.userId,
      });

      const savedPost = await newPost.save();
      return await savedPost.populate('user');
    },
  },
};
