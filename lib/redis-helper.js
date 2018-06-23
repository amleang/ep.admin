const redis = require('redis')
const wrapper = require('co-redis');
const config = require('../config/default')
const client = redis.createClient(config.redisConfig.RDS_PORT, config.redisConfig.RDS_HOT, config.redisConfig.RDS_OPTS);
var redisCo = wrapper(client);
let redisFunc = {
    /**获取 */
    async get(name) {
        var get = await redisCo.get(name);
        return get;
    },
    /**添加 */
    async set(name, val) {
        var set = await redisCo.set(name, val);
        return set;
    },
    /**添加并设置过期时间 */
    async setExp(name, val, time) {
        var set = await redisCo.set(name, val);
        redisCo.expire(name, time);

        return set;
    },
    /**删除 */
    async del(name) {
        var del = await redisCo.del(name);
        return del;
    },
    /**判断是否存在 */
    async exists(name) {

    }
}
module.exports = redisFunc