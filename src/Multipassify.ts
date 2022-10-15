import crypto from 'crypto'

const BLOCK_SIZE = 16
export class Multipassify {
  _encryptionKey: Buffer
  _signingKey: Buffer

  constructor(secret: string) {
    if (!(secret.length > 0)) throw new Error('Invalid Secret')
    const hash = crypto.createHash('sha256').update(secret).digest()
    this._encryptionKey = hash.subarray(0, BLOCK_SIZE)
    this._signingKey = hash.subarray(BLOCK_SIZE, 32)
  }

  encode(obj: Partial<Record<string, any>>): string {
    if (!obj) throw new Error('No data encoded')

    obj['created_at'] = new Date().toISOString()
    const cipherText = this.encrypt(JSON.stringify(obj))

    const token = Buffer.concat([cipherText, this.sign(cipherText)]).toString(
      'base64url'
    )

    return token
  }

  generateUrl(obj: Partial<Record<string, any>>, domain: string | URL): string {
    if (!domain) throw new Error('No domain specified')
    return 'https://' + domain + '/account/login/multipass/' + this.encode(obj)
  }

  sign(data: Buffer): Buffer {
    const signed = crypto
      .createHmac('sha256', this._signingKey)
      .update(data)
      .digest()
    return signed
  }

  encrypt(plaintext: string): Buffer {
    const iv = crypto.randomBytes(BLOCK_SIZE)

    const cipher = crypto.createCipheriv('aes-128-cbc', this._encryptionKey, iv)

    const encrypted = Buffer.concat([
      iv,
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ])
    return encrypted
  }
}
