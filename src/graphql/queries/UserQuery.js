const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const UserType = require('../types/UserType');
const User = require('../../models/UserModel');
const { getJSON, setJSON } = require('../../utils/redisJson');

module.exports = {

  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, args) => {

      const cacheKey = `user:${args.id}`;
      const cachedUser = await getJSON(cacheKey);

      if (cachedUser) {
        console.log('Cahced data');
        return cachedUser;
      };

      const freshUser = await User.findById(args.id);
      await setJSON(cacheKey, freshUser, 300); // Cache for 5 min
      console.log('freshed data');
      return freshUser;
    },
  },

  users: {
    type: new GraphQLList(UserType),
    resolve: async () => {

      const cacheKey = 'All_Users';
      const cachedUsers = await getJSON(cacheKey);

      if (cachedUsers) {
        console.log('Cahced data');
        return cachedUsers;
      };

      const freshUsers = await User.find({});
      await setJSON(cacheKey, freshUsers, 300); // Cache for 5 min
      console.log('freshed data');
      return freshUsers;
    },
  }
};

