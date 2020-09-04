/**
 * APP Config
 * @file 应用运行配置
 */
export const APP = {
  PAGINATE_LIMIT: 20,
}

export const MONGODB = {
  uri: 'mongodb://127.0.0.1:27017/nest',
}

export const REDIS = {
  host: '127.0.0.1',
  port: 6379,
  ttl: null,
}

export const EMAIL = {
  account: 'j4public@163.com',
  password: 'QFQXZANZWJHNISGU', //授权密码
  from: 'j4public@163.com', //发送邮件地址
}