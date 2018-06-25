
const router = require('koa-router')();
const db = require('../lib/mysql-helper');
const sqlMap = require('../map/user')
const tip = require("../lib/tip")
const Utils = require("../lib/utils")
const md5 = require('md5');
const svgCaptcha = require('svg-captcha');
const redisFunc = require("../lib/redis-helper")
/**
 * 验证码
 */
router.get("/api/captcha", async (ctx, next) => {
    var captcha = await svgCaptcha.create();
    ctx.session.captcha = captcha.text;
    ctx.type = 'svg';
    ctx.body=captcha.data;
})
/**
 * 用户列表
 */
router.get('/api/user/list', async (ctx, next) => {
    await db.query(sqlMap.list, null).then(res => {
        console.log("res=>", res);
        ctx.body = { ...tip[200], data: res };
    }).catch(e => {
        ctx.body = { ...tip[2001] }
    })
})

/**
 * 用户登录
 */
router.post('/api/login', async (ctx, next) => {
    console.log(ctx.request.body);
    var setVal = await redisFunc.set('name', 'zhangsan');
    var getVal = await redisFunc.get('name1111');
    var setVal2 = await redisFunc.setExp("name2", 'lisi', 60)
    let data = Utils.filter(ctx.request.body, ['account', 'pwd']);
    let res = Utils.formatData(data, [
        { key: 'account', type: 'string' },
        { key: 'pwd', type: 'string' },
    ]);
    if (!res || Object.keys(data).length !== 2) return ctx.body = tip[1004];
    let value = [ctx.request.body.account, ctx.request.body.pwd];
    await db.query(sqlMap.login, value).then(res => {
        if (res.length > 0)
            ctx.body = { ...tip[200], docs: res[0] };
        else
            ctx.body = { ...tip[1003] }
    }).catch(e => {
        ctx.body = { ...tip[2001] }
    })
})
module.exports = router;