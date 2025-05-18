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
        return cachedUser;
      };

       const freshUser = await User.findById(args.id);

       const userForCache = freshUser.toObject();
       userForCache.id = freshUser._id.toString(); 
       await setJSON(cacheKey, userForCache, 300); 
      
      return freshUser;
    },
  },

  users: {
    type: new GraphQLList(UserType),
    resolve: async () => {

      const cacheKey = 'All_Users';
      const cachedUsers = await getJSON(cacheKey);

      if (cachedUsers) {
        return cachedUsers;
      };

      const freshUsers = await User.find({});

      const usersForCache = freshUsers.map(user => {
        const obj = user.toObject();   // convert to plain JS object
        obj.id = user._id.toString();  // manually add the `id` field
        return obj;
      });

      await setJSON(cacheKey, usersForCache, 300); // Cache for 5 min
      return freshUsers;
    },
  }
};

