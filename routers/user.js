
const router = require('koa-router')();
const db = require('../lib/mysql-helper');
const sqlMap=require('../map/user')
const md5 = require('md5');
router.get('/api/user/list', async (ctx, next) => {
    await db.query(sqlMap.list, null).then(res => {
        console.log("res=>", res);
        ctx.body = res
    })
})

router.post('/api/login',async (ctx,next)=>{
    await db.query(sqlMap.login,{account:'admin',pwd:'1'}).then(res=>{
        console.log("res=>", res);
        ctx.body = res
    })
})
module.exports = router;