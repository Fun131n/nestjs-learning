/**
 * bcrypt转换器
 */
import * as bcrypt from 'bcrypt'

// 对比
export function decodeBcrypt(origin,decode) {
  return bcrypt.compareSync(origin, decode);
}

// 加密
export function encodeBcrypt(origin) {
  return bcrypt.hashSync(origin, 10);
}