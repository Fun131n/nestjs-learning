/**
 * 编解码转换器
 */
import * as bcrypt from 'bcrypt'


export function decodeBcrypt(origin,decode) {
  return bcrypt.compareSync(origin, decode);
}

export function encodeBcrypt(origin) {
  return bcrypt.hashSync(origin, 16);
}