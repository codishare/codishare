import { isEmail } from "../../email";
import { isSecure } from "../../password";
import { ROLE, STACK } from "@/types/auth/_enums";
import { type SignUp } from "@/types/auth/_types";

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

    if(typeof name !== 'string') {
        return 'invalid_format';
    }

    // @ Validate terms
    if(!terms) {
        return 'terms';
    }

    if(typeof terms !== 'boolean') {
        return 'invalid_format';
    }

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

    const validPassword: string | true = isSecure(password);

    if(validPassword !== true) {
        return validPassword;
    }

    if(typeof password !== 'string') {
        return 'invalid_format';
    }

    // @ Validate password confirmation
    if(!confirm_password) {
        return 'confirm_password';
    }

    if(typeof confirm_password !== 'string') {
        return 'invalid_format';
    }

    if(password !== confirm_password) {
        return 'confirm_password_match';
    }

    // @ Validate stack
    if(!stack) {
        return 'stack';
    }

    if(typeof stack !== 'string') {
        return 'invalid_format';
    }

    if(!Object.keys(STACK).includes(stack)) {
        return 'stack_invalid';
    }

    // @ Validate role
    if(!role) {
        return 'role';
    }

    if(typeof role !== 'string') {
        return 'invalid_format';
    }

    if(!Object.keys(ROLE).includes(role)) {
        return 'role_invalid';
    }

    return true;
}