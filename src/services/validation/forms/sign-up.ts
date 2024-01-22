import { isEmail } from "../email";
import { isSecure } from "../password";
import type { SignUp } from "@/components/auth/sign-up/form";

enum STACK {
    "FRONTEND",
    "BACKEND",
    "FULLSTACK"
}

enum ROLE {
    "TRAINEE", 
    "JUNIOR",
    "MID",
    "SENIOR"
}

export function validate(
    data: SignUp
) {
    const {
        name,
        terms,
        email,
        password,
        confirm_password,
        stack,
        role
    } = data;

    // @ Validate name
    if(!name) {
        return 'name';
    }

    // @ Validate terms
    if(!terms) {
        return 'terms';
    }

    // @ Validate email
    if(!email) {
        return 'email';
    }

    if(!isEmail(email)) {
        return 'email_format';
    }

    // @ Validate password
    if(!password) {
        return 'password';
    }

    const validPassword: string | true = isSecure(password);

    if(validPassword !== true) {
        return validPassword;
    }

    // @ Validate password confirmation
    if(!confirm_password) {
        return 'confirm_password';
    }

    if(password !== confirm_password) {
        return 'confirm_password_match';
    }

    // @ Validate stack
    if(!stack) {
        return 'stack';
    }

    if(!Object.keys(STACK).includes(stack)) {
        return 'stack_invalid';
    }

    // @ Validate role
    if(!role) {
        return 'role';
    }

    if(!Object.keys(ROLE).includes(role)) {
        return 'role_invalid';
    }

    return true;
}