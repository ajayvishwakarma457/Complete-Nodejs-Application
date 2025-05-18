const {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLNonNull,GraphQLBoolean} = require('graphql');
const UserType = require('./UserType');

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    caption: { type: GraphQLNonNull(GraphQLString) },
    media_url: { type: GraphQLNonNull(GraphQLString) },
    user: { type: UserType }, // Make sure this resolves correctly
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    is_deleted: { type: GraphQLBoolean },
  }),
});

module.exports = PostType;
