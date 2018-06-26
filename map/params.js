const sqlMap = {
    count:`select count(*) as count from sys_parameter where ?`,
    list: `select * from sys_parameter where ? limit ?,?`,
    add:`insert into sys_parameter(pid,name,value,active,weight,remark,createuser,createtime) value(?,?,?,?,?,?,?,?)`,
}
module.exports = sqlMap;