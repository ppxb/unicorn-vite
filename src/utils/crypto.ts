import { decrypt, encrypt } from 'crypto-js/aes'
import { TOKEN_SECRET_KEY } from '@/utils/config'
import UTF8 from 'crypto-js/enc-utf8'

export const encode = (data: object, secret: string = TOKEN_SECRET_KEY) =>
  encrypt(JSON.stringify(data), secret).toString()


export const decode = (data: string, secret: string = TOKEN_SECRET_KEY) =>
  JSON.parse(decrypt(data, secret).toString(UTF8)) || null
