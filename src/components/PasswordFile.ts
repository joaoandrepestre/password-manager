import * as fs from "fs";
import { exit } from "process";
import { encrypt, decrypt } from "../utils/crypto"


class Password {
    key: string;
    password: string;

    constructor(k: string, p: string) {
        this.key = k;
        this.password = p;
    }
}

export class PasswordFile {
    passwords: Password[];

    constructor() {
        this.passwords = [];
    }

    persist(path: string, masterPassword: string) {
        let hash = encrypt(JSON.stringify(this.passwords), masterPassword);
        fs.writeFileSync(path, hash);
    }

    readPasswordFile(path: string, masterPassword: string) {
        const file: string = fs.readFileSync(path).toString();
        if (file !== '') {
            try{
                this.passwords = JSON.parse(decrypt(file, masterPassword));
            } catch(err) {
                console.log('Invalid master password');
                exit(0);
            } 
        }
    }

    getPasswordForKey(key: string): string {
        let pass = this.getPasswordObjectForKey(key);
        if (pass === undefined) return '';
        else return pass.password;
    }

    getPasswordObjectForKey(key: string): Password | undefined {
        let pass = this.passwords.filter(p => p.key == key);
        if (pass.length > 0) return pass[0];
        else return undefined;
    }

    addPasswordOForKey(key: string, password: string) {
        let pass = this.getPasswordObjectForKey(key);
        if (pass === undefined) this.passwords.push(new Password(key, password));
        else pass.password = password;
    }
}