const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');

const PostType = require('../types/PostType');
const Post = require('../../models/PostModel');
const { setJSON } = require('../../utils/redisJson');

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
      const populatedPost = await savedPost.populate('user');

      const postForCache = populatedPost.toObject();
      postForCache.id = populatedPost._id.toString();
      await setJSON(`post:${postForCache.id}`, postForCache, 300); // 5 minutes
      return postForCache;
    },
  },

   deletePost: {
    type: PostType,
    args: {id: { type: GraphQLID }},
    async resolve(_, args) {
      const updatedUser = Post.findByIdAndUpdate(args.id,{ is_deleted: true, deleted_at: new Date() },{ new: true });
      await delKey(`post:${args.id}`);
      return updatedUser;
    },
  },

};
