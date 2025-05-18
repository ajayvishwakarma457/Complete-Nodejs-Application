const {GraphQLString,GraphQLBoolean,GraphQLID,GraphQLNonNull} = require('graphql');

const UserType = require('../types/UserType');
const User = require('../../models/UserModel');
const { setJSON, delKey } = require('../../utils/redisJson');


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
    async resolve(_, args) {
      const user = new User(args);
      const savedUser = await user.save();

       const userForCache = savedUser.toObject();
       userForCache.id = savedUser._id.toString();
       await setJSON(`user:${savedUser.id}`, userForCache, 300);
       
      return savedUser;
    },
  },

  deleteUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(_, args) {
      const updatedUser = User.findByIdAndUpdate(args.id,{ is_deleted: true, deleted_at: new Date() },{ new: true });
      await delKey(`user:${args.id}`);
      return updatedUser;
    },
  },
};
