const redis = require('../config/redis');

module.exports = {

  getJSON: async (key) => {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  },
  setJSON: async (key, obj, ttl = 3600) => {
    await redis.set(key, JSON.stringify(obj), 'EX', ttl);
  },
  delKey: async (key) => {
    await redis.del(key);
  }
  
};
