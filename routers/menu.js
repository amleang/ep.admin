
const router = require('koa-router')();
const db = require('../lib/mysql-helper');
const sqlMap = require('../map/menu')
const tip = require("../lib/tip")
const Utils = require("../lib/utils")
/**
 * 菜单列表
 */
router.get('/api/menu/service', async (ctx, next) => {
    await db.query(sqlMap.index,[0]).then(res => {
        ctx.body = { ...tip[200], data: res };
    }).catch(e => {
        ctx.body = { ...tip[2001] }
    })
})

module.exports = router;