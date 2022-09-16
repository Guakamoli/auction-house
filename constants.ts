import base58 from 'bs58';

export const DEVNET_URL = "https://solana-devnet.g.alchemy.com/v2/k84uaYP6wv82e7n_UirVxdtI2iNdhdWM";
export const MAINNET_URL = "https://solana-mainnet.g.alchemy.com/v2/B215Npwol5tybDLVWz9u8rpMwMTR4yJm";

function phantompkToUint8Array(key:  string) {
  const b = base58.decode(key);
  return new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
}

const skey = process.env.SECRET_KEY || '';
export const secretKey = phantompkToUint8Array(skey);
