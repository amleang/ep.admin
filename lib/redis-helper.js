const redis = require('redis')
const wrapper = require('co-redis');
const config = require('../config/default')
const client = redis.createClient({ host: config.redisConfig.RDS_HOT, port: config.redisConfig.RDS_PORT, no_ready_check: true });
/* const client = redis.createClient(config.redisConfig.RDS_PORT, config.redisConfig.RDS_HOT, config.redisConfig.RDS_OPTS); */
client.auth(config.redisConfig.RDS_PWD, function () {
    console.log('通过认证');
})
client.on("error", function (err) {
    console.log("Error :", err);
});

client.on('connect', function () {
    console.log('Redis连接成功.');
})
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
    /**获取剩余时间 */
    async getTTL(name) {
        var ttl = await redisCo.ttl(name);
        return ttl;
    },
    /**删除 */
    async del(name) {
        var del = await redisCo.del(name);
        return del;
    },
    /**判断是否存在 */
    async exists(name) {
        var exis = redisCo.exists(name);
        return exis;
    },
    /**校验token是否失效或要重新设置过期时间 */
    async token(ctx) {
        var token = ctx.headers.token;
        if (token) {
            var tokens = token.split('|');
            var ttl = await redisCo.ttl(tokens[0])
            if (ttl > 0) {
                if (ttl < 60 * 30) {
                    redisCo.expire(tokens[0], 60 * 60 * 2);
                }
                return {
                    code: 200,
                    msg: ""
                }
            }
            else {
                return {
                    code: 1003,
                    msg: '登录失效,请重新登录'
                }
            }
        }
        else
            return {
                code: 1003,
                msg: '登录失效,请重新登录'
            }

    },
    /**获取登录人 */
    async loginName(ctx) {
        var token = ctx.headers.token;
        var tokens = token.split('|');
        return tokens[0];
    }
}
module.exports = redisFunc