export function isSecure(password: string) {
    const minLenght = 8; 

    // @ Validate length
    if (password.length < minLenght) {
        return 'password_min_length';
    }

    // @ Validate uppercase
    if (password.toLowerCase() === password) {
        return 'password_uppercase';
    }

    // @ Validate lowercase
    if (password.toUpperCase() === password) {
        return 'password_lowercase';
    }

    // @ Validate number
    if (!/\d/.test(password)) {
        return 'password_number';
    }

    return true;
} 