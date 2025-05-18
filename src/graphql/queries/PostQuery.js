// src/graphql/queries/PostQuery.js
const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const PostType = require('../types/PostType');
const Post = require('../../models/PostModel');

module.exports = {
  post: {
    type: PostType,
    args: { id: { type: GraphQLID } },
    resolve: (_, args) => Post.findById(args.id).populate('user'),
  },
  posts: {
    type: new GraphQLList(PostType),
    resolve: () => Post.find({}).populate('user'),
  }
};
