const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');
const UserType = require('./UserType');
const PostType = require('./PostType');
const User = require('../../models/UserModel');
const Post = require('../../models/PostModel');

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.user);
      }
    },
    post: {
      type: PostType,
      resolve(parent, args) {
        return Post.findById(parent.post);
      }
    },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString }
  })
});

module.exports = CommentType;
