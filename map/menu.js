const sqlMap = {
    index:'select id,mname,micon,murl from sys_menu where isseller=? and active=1 order by pid,weight',
    list: 'select * from sys_menu where isseller=?',
    login:`select * from sys_user where account=? and pwd=?`
}
module.exports = sqlMap;