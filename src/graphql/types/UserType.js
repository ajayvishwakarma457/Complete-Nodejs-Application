const {GraphQLObjectType,GraphQLString,GraphQLBoolean,GraphQLID,GraphQLNonNull} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    biography: { type: GraphQLString },
    photo: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    deleted_at: { type: GraphQLString },
    is_deleted: { type: GraphQLBoolean },
  }),
});

module.exports = UserType;