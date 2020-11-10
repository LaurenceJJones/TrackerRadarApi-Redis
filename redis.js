const redis = require("redis");
const client = redis.createClient(6379,'redis');
 
client.on("error", function(error) {
  console.error(error);
});

module.exports = client