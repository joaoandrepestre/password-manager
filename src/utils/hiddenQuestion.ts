import * as readline from 'readline';

export const hiddenQuestion = (query: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const rl: readline.Interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const stdin = process.openStdin();
        process.stdin.on('data', char => {
            let schar = char + '';
            switch (schar) {
                case '\n':
                case '\r':
                case '\u0004':
                    stdin.pause();
                    break;
                default:
                    process.stdout.clearLine(0);
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(query);
                    break;
            }
        });
        rl.question(query, value => {
            resolve(value);
        });
    });
}