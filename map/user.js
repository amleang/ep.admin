const sqlMap = {
    list: 'select * from sys_user',
    login:`select * from sys_user where account=? and pwd=?`
}
module.exports = sqlMap;