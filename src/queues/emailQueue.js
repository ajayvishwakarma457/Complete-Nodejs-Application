const Queue = require('bull');
require('dotenv').config();

const emailQueue = new Queue('emailQueue', process.env.REDIS_URL || 'redis://127.0.0.1:6379');

module.exports = emailQueue;
