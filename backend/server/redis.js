const Redis = require('redis');

const redisClient = new Redis.createClient({});

module.exports = redisClient;