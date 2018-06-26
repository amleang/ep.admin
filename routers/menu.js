
const router = require('koa-router')();
const db = require('../lib/mysql-helper');
const sqlMap = require('../map/menu')
const tip = require("../lib/tip")
const Utils = require("../lib/utils")
const redisFunc = require("../lib/redis-helper")
/**
 * 菜单列表
 */
router.get('/api/menu/service', async (ctx, next) => {
    var tokenExists = await redisFunc.token(ctx);
    if (tokenExists.code != 200) {
        ctx.body = { ...tokenExists };
        return;
    }
    await db.query(sqlMap.index, [0]).then(res => {
        ctx.body = { ...tip[200], data: res };
    }).catch(e => {
        ctx.body = { ...tip[2001] }
    })
})

module.exports = router;