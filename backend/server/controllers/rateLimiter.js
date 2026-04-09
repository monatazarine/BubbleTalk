const redisClient = require("../redis");

module.exports.rateLimiter = async (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    try {
        const results = await redisClient.multi().incr(ip).expire(ip, 60).exec();
        // Redis v4 results are [count, 1] (result for each command)
        // If results[0] is the count
        const response = results[0];
        
        console.log(`Rate limit check for ${ip}: ${response}`);
        
        if (response > 10) {
            return res.json({
                loggedIn: false, 
                status: true, 
                message: "Too many attempts, try again later"
            });
        }
        next();
    } catch (err) {
        console.error("Rate limiter error:", err);
        next(); // Proceed anyway or send 500? Usually better to let it through if Redis is down?
    }
};
