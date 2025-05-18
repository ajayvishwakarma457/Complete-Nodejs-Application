const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');

const UserType = require('../types/UserType');
const User = require('../../models/UserModel');

module.exports = {
  createUser: {
    type: UserType,
    args: {
      firstname: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
      password_hash: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(_, args) {
      const user = new User(args);
      return user.save();
    },
  },

  deleteUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(_, args) {
      return User.findByIdAndUpdate(
        args.id,
        { is_deleted: true, deleted_at: new Date() },
        { new: true }
      );
    },
  },
};
