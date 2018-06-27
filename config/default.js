const config = {
  // 启动端口
  port: 4333,

  // 数据库配置
  database: {
    database: 'mall',
    user: 'zal',
    password: 'Zal@19890107',
    port: '3306',
    host: '118.25.98.91'
  },
  redisConfig: {
    RDS_PORT: 6379,
    RDS_HOT: '118.25.98.91',
    RDS_PWD: 'Zal_2017abc,.',
    RDS_OPTS: {no_ready_check: true }
  }
}

module.exports = config