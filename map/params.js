const sqlMap = {
    count: `select count(*) as count from sys_parameter where ?`,
    list: `select * from sys_parameter where ? limit ?,?`,
    item: `select * from sys_parameter where id=?`,
    add: `insert into sys_parameter(pid,name,value,active,weight,remark,createuser,createtime) value(?,?,?,?,?,?,?,now())`,
    upd: `update sys_parameter set name=?,value=?,active=?,weight=?,remark=?,modifyuser=?,modifytime=now() where id=?`,
}
module.exports = sqlMap;