import * as crypto from "crypto";

const algorithm = 'aes-256-ctr';
const IV_LENGTH = 16;

export const encrypt = (text: string, secretKey: string): string => {
    let key = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substr(0, 32);
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export const decrypt = (text: string, secretKey: string): string => {
    let key = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substr(0, 32);
    let textParts = text.split(':');
    let iv = Buffer.from(textParts[0], 'hex');
    let encryptedText = Buffer.from(textParts[1], 'hex');
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}