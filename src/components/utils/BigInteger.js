export class BigInteger {
    constructor(value, radix) {
        /* eslint-disable no-undef */
        this.value =
            typeof value === 'string' ? BigInt(`0x${value}`) : BigInt(value);
        /* eslint-enable no-undef */
    }

    modPowInt(exp, mod) {
        return new BigInteger(this.value ** BigInt(exp) % mod.value, 16);
    }

    bitLength() {
        return this.value.toString(2).length;
    }

    toString(radix) {
        return this.value.toString(radix);
    }
}
