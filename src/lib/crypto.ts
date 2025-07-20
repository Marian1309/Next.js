import { AES, enc } from 'crypto-js';

import { env } from '@/env';

export const encryptText = (text: string) => {
  return AES.encrypt(text, env.CRYPTO_JS_SECRET).toString();
};

export const decryptText = (text: string) => {
  return AES.decrypt(text, env.CRYPTO_JS_SECRET).toString(enc.Utf8);
};
