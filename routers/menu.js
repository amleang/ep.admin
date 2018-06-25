
const router = require('koa-router')();
const db = require('../lib/mysql-helper');
const sqlMap = require('../map/menu')
const tip = require("../lib/tip")
const Utils = require("../lib/utils")
/**
 * 用户列表
 */
router.get('/api/menu/index', async (ctx, next) => {
    let data = Utils.filter(ctx.request.body, ['type']);
    let res = Utils.formatData(data, [
        { key: 'type', type: 'string' }
    ]);
    if (!res || Object.keys(data).length !== 1) return ctx.body = tip[1004];
    let value = [ctx.request.body.account, ctx.request.body.type];
    await db.query(sqlMap.index,[0]).then(res => {
        ctx.body = { ...tip[200], data: res };
    }).catch(e => {
        ctx.body = { ...tip[2001] }
    })
})

module.exports = router;