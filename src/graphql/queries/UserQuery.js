const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const UserType = require('../types/UserType');
const User = require('../../models/UserModel');

module.exports = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve: (_, args) => User.findById(args.id),
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: () => User.find({ is_deleted: false }),
  }
};

