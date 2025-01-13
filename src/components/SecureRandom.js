export class SecureRandom {
    nextBytes(array) {
        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }
    }
}
