import { Login } from "@/types/auth/_types";
import { isEmail } from "../email";

export function validate(
    data: Login
) {
    const {
        email,
        password
    } = data;

    // @ Validate email
    if(!email) {
        return 'email';
    }

    if(!isEmail(email)) {
        return 'email_format';
    }

    if(typeof email !== 'string') {
        return 'invalid_format';
    }

    // @ Validate password
    if(!password) {
        return 'password';
    }

    if(typeof password !== 'string') {
        return 'invalid_format';
    }

    return true;
}