const Redis = require('ioredis');
const client = new Redis({
    port: 6379,
    host: '118.25.98.91',
    family: 4,
    password: 'Zal_2017abc,.',
    db: 0
})
let redisFunc = {
    /**获取 */
    async get(name) {
        var get = await client.get(name);
        return get;
    },
    /**添加 */
    async set(name, val) {
        var set = await client.set(name, val);
        return set;
    },
    /**添加并设置过期时间 */
    async setExp(name, val, time) {
        var set = await client.set(name, val);
        client.expire(name, time);

        return set;
    },
    /**获取剩余时间 */
    async getTTL(name) {
        var ttl = await client.ttl(name);
        return ttl;
    },
    /**删除 */
    async del(name) {
        var del = await client.del(name);
        return del;
    },
    /**判断是否存在 */
    async exists(name) {
        var exis = client.exists(name);
        return exis;
    },
    /**校验token是否失效或要重新设置过期时间 */
    async token(ctx) {
        var token = ctx.headers.token;
        if (token) {
            var ttl = await client.ttl(token)
            if (ttl > 0) {
                if (ttl < 60 * 30) {
                    client.expire(token, 60 * 60 * 2);
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
        var get = await client.get(token);
        return get;
    }
}
module.exports = redisFunc