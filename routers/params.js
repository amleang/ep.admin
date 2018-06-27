const router = require('koa-router')();
const db = require('../lib/mysql-helper');
const sqlMap = require('../map/params')
const tip = require("../lib/tip")
const Utils = require("../lib/utils")
const redisFunc = require("../lib/redis-helper")
/**
 * 参数列表
 */
router.get("/api/params/list", async (ctx, next) => {
    let res = Utils.formatData(ctx.request.query, [
        { key: 'page', type: 'string' },
        { key: 'size', type: 'string' },
        { key: 'name', type: 'string' },
        { key: 'value', type: 'string' },
        { key: 'active', type: 'string' },
    ]);
    if (!res) return ctx.body = tip[1004];
    var tokenExists = await redisFunc.token(ctx);
    if (tokenExists.code != 200) {
        ctx.body = { ...tokenExists };
        return;
    }
    let page = ctx.request.query.page;
    let size = ctx.request.query.size;

    let where = '';
    ctx.request.query.name ? where += ` name='` + ctx.request.query.name + `'` : '';
    ctx.request.query.value ? where != '' ? where += ` and value='` + ctx.request.query.value + `'` : where += ` value='` + ctx.request.query.value + `'` : '';
    ctx.request.query.active ? where != '' ? where += ` and active='` + ctx.request.query.active + `'` : where += ` active='` + ctx.request.query.active + `'` : '';
    let count = 0;
    await db.query(sqlMap.count, [where]).then(res => {
        count = res[0].count;
    })
    await db.query(sqlMap.list, [where, (page - 1) * size, page * size]).then(res => {
        ctx.body = { ...tip[200], count: count, data: res };
    }).catch(e => {
        ctx.body = { ...tip[2001] }
    })
});
/**
 * 获取单条数据
 */
router.get('/api/params/:id', async (ctx, next) => {
    var tokenExists = await redisFunc.token(ctx);
    if (tokenExists.code != 200) {
        ctx.body = { ...tokenExists };
        return;
    }
    let id = ctx.request.query.id;
    await db.query(sqlMap.item, [id]).then(res => {
        if (res.length > 0) {
            ctx.body = { ...tip[200], docs: res[0] };
        }
        else
            ctx.body = { ...tip[1003] }
    }).catch(e => {
        ctx.body = { ...tip[2001] }
    })
})
/**
 * 添加
 */
router.post('/api/params', async (ctx, next) => {
    let res = Utils.formatData(ctx.request.query, [
        { key: 'name', type: 'string' },
        { key: 'value', type: 'string' },
        { key: 'active', type: 'string' },
        { key: 'weight', type: 'string' },
        { key: 'remark', type: 'string' },
    ]);
    if (!res) return ctx.body = tip[1004];
    var data = ctx.request.query;
    let value = [data.name, data.value, data.active, data.weight, data.remark, redisFunc.loginName];
    await db.query(sqlMap.add, value).then(res => {
        ctx.body = { ...tip[200] }
    }).catch(e => {
        ctx.body = { ...tip[2002] }
    })
})
/**编辑 */
router.put('/api/params/:id', async (ctx, next) => {

})
/**
 * 删除
 */
router.delete('/api/params/:id', async (ctx, next) => {

})
module.exports = router;