
export const generateRandomPassword = (length: number): string => {
    let password: string = '';
    let chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()-_=+';
    let charsLength: number = chars.length;
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return password;
};