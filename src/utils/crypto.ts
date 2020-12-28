import crypto from "crypto";

const algorithm: string = 'aes-256-ctr';
const iv: Buffer = crypto.randomBytes(16);

export class Hash {

    iv: string;
    content: string;

    constructor(iv: Buffer, encrypted: Buffer) {
        this.iv = iv.toString('hex');
        this.content = encrypted.toString('hex');
    }
}

export const encrypt = (text: string, secretKey: string): Hash => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return new Hash(iv, encrypted);
};

export const decrypt = (hash: Hash, secretKey: string): string => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrypted.toString();
};
