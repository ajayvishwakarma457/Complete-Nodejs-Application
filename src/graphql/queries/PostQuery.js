// src/graphql/queries/PostQuery.js
const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const PostType = require("../types/PostType");
const Post = require("../../models/PostModel");
const { getJSON, setJSON } = require("../../utils/redisJson");

module.exports = {
  post: {
    type: PostType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, args) => {
      const cacheKey = `post:${args.id}`;
      const cachedPost = await getJSON(cacheKey);

      if (cachedPost) {
        return cachedPost;
      }

      const freshPost = await Post.findById(args.id).populate("user");
      const postForCache = freshPost.toObject();
      postForCache.id = freshPost._id.toString();
      await setJSON(cacheKey, postForCache, 300);
      return freshPost;
    },
  },
  posts: {
    type: new GraphQLList(PostType),
    resolve: async () => {
      const cacheKey = `All_Posts`;
      const cachedPosts = await getJSON(cacheKey);

      if (cachedPosts) {
        return cachedPosts;
      }

      const freshPosts = await Post.find({}).populate("user");

      const postsForCache = freshPosts.map((post) => {
        const obj = post.toObject(); // convert to plain JS object
        obj.id = post._id.toString(); // manually add the `id` field
        return obj;
      });

      await setJSON(cacheKey, postsForCache, 300); // Cache for 5 min
      return freshPosts;
    },
  },
};
