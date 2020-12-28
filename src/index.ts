import { generateRandomPassword } from './components/password_generator';
import { PasswordFile } from './components/PasswordFile';
import * as readline from 'readline';
import { exit } from 'process';
import { homedir } from 'os'
import * as path from 'path';
import { hiddenQuestion } from './utils/hiddenQuestion';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const args = process.argv.slice(2);
const mode = args[0];
const key = args[1];

let passwordFile = new PasswordFile();
let passwordsPath = path.join(homedir(), '.passwords');

const genPass = (master: string): string => {
    passwordFile.readPasswordFile(passwordsPath, master);
    let pass = generateRandomPassword(16);
    passwordFile.addPasswordOForKey(key, pass);
    passwordFile.persist(passwordsPath, master);
    return pass;
};

switch (mode) {
    case 'generate':
    case 'g':
        hiddenQuestion('Master password: ', true)
            .then(master => {
                console.log(`Generated password for key ${key}: ${genPass(master)}`);
                exit(0);
            });
        break;
    case 'password-for':
    case 'p':
        hiddenQuestion('Master password: ', true)
            .then(master => {
                passwordFile.readPasswordFile(passwordsPath, master);
                let pass = passwordFile.getPasswordForKey(key);
                if (pass === '') {
                    hiddenQuestion(`No password defined for key ${key}. Would you like to generate one? (y/n) `, false)
                        .then(answer => {
                            if (answer === 'y') console.log(`Generated password for key ${key}: ${genPass(master)}`);
                            else console.log('No password generated');
                            exit(0);
                        });
                } else {
                    console.log(`Generated password for key ${key}: ${pass}`);
                    exit(0);
                }
            });
        break;
    default:
        console.log('Unrecognized command');
        break;
}