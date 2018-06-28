const uuid = require('node-uuid');
const router = require('koa-router')();
const db = require('../lib/mysql-helper');
const sqlMap = require('../map/user')
const tip = require("../lib/tip")
const Utils = require("../lib/utils")
const md5 = require('md5');
const svgCaptcha = require('svg-captcha');
const redisFunc = require("../lib/redis-helper")
const redis2 = require("../lib/redis-helper")
/**
 * 验证码
 */
router.get("/api/captcha", async (ctx, next) => {
    var captcha = await svgCaptcha.create();
    ctx.session.captcha = captcha.text;
    ctx.type = 'svg';
    ctx.body = captcha.data;
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

    /*  var setVal = await redisFunc.set('name', 'zhangsan');
     var getVal = await redisFunc.get('name1111');
     var setVal2 = await redisFunc.setExp("name2", 'lisi', 60) */
    //let data = Utils.filter(ctx.request.body, ['account', 'pwd', 'captcha']);
    let res = Utils.formatData(ctx.request.body, [
        { key: 'account', type: 'string' },
        { key: 'pwd', type: 'string' },
        { key: 'captcha', type: 'string' },
    ]);
    if (!res || Object.keys(ctx.request.body).length !== 3) return ctx.body = tip[1004];
    if (ctx.session.captcha.toLocaleLowerCase() != ctx.request.body.captcha.toLocaleLowerCase()) {
        ctx.body = { ...tip[1006] }
        return
    }
    let value = [ctx.request.body.account, ctx.request.body.pwd];
    await db.query(sqlMap.login, value).then(async res => {
        if (res.length > 0) {
            var token = uuid.v1();
            var ttl = await redisFunc.getTTL(ctx.request.body.account)
            let setVal = await redisFunc.setExp(token, res[0], 60 * 60 * 2);
            if (setVal == 'OK')
                ctx.body = { ...tip[200], docs: res[0], token: token };
            else
                ctx.body = { ...tip[1005] }
        }
        else
            ctx.body = { ...tip[1003] }
    }).catch(e => {
        ctx.body = { ...tip[2001] }
    })
})
module.exports = router;