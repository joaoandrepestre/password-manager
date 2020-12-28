import fs from "fs";
import {encrypt, decrypt, Hash } from "../utils/crypto"

export const generateRandomPassword = (length: number): string => {
    let password: string = '';
    let chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()-_=+';
    let charsLength: number = chars.length;
    for(let i=0;i<length;i++){
        password += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return password;
};

export const persistPassword = (key: string, password: string, masterPassword: string) => {
    let encryptedPasswordFile: string[] = fs.readFileSync('../../passwords').toString().split('\n');
    const iv = Buffer.from(encryptedPasswordFile[0]);
    const content = Buffer.from(encryptedPasswordFile[1]);

    let passwords = decrypt(new Hash(iv, content), masterPassword);

    let passwordsJSON = JSON.parse(passwords);

    passwordsJSON[key] = password;

    let newEncryptedPassword: Hash = encrypt(JSON.stringify(passwordsJSON), masterPassword);

    let encryptedString = newEncryptedPassword.iv.toString() + '\n' + newEncryptedPassword.content.toString();

    fs.writeFileSync('../../passwords', encryptedString);
};