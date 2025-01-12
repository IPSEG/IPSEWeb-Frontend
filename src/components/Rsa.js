import { BigInteger } from './BigInteger';
import { SecureRandom } from './SecureRandom';

function parseBigInt(str, r) {
    return new BigInteger(str, r);
}

function byteArrayToHexString(ba) {
    return ba.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function pkcs1pad2(s, n) {
    if (n < s.length + 11) {
        throw new Error('Message too long for RSA');
    }
    const ba = new Array();
    let i = s.length - 1;
    while (i >= 0 && n > 0) {
        const c = s.charCodeAt(i--);
        if (c < 128) {
            ba[--n] = c;
        } else if (c > 127 && c < 2048) {
            ba[--n] = (c & 63) | 128;
            ba[--n] = (c >> 6) | 192;
        } else {
            ba[--n] = (c & 63) | 128;
            ba[--n] = ((c >> 6) & 63) | 128;
            ba[--n] = (c >> 12) | 224;
        }
    }
    ba[--n] = 0;
    const rng = new SecureRandom();
    const x = new Array();
    while (n > 2) {
        x[0] = 0;
        while (x[0] === 0) rng.nextBytes(x);
        ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(byteArrayToHexString(ba), 16);
}

export class RSAKey {
    constructor() {
        this.n = null;
        this.e = 0;
    }

    setPublic({ modulus, exponent }) {
        this.n = parseBigInt(modulus, 16);
        this.e = parseInt(exponent, 16);
    }

    doPublic(x) {
        return x.modPowInt(this.e, this.n);
    }

    encrypt(text) {
        const m = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3);
        if (!m) return null;
        const c = this.doPublic(m);
        return c.toString(16);
    }
}
