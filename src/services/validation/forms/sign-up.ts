import { isEmail } from "../email";
import { isSecure } from "../password";

const STACK = "FRONTEND" || "BACKEND" || "FULLSTACK";
const ROLE = "TRAINEE" || "JUNIOR" || "MID" || "SENIOR";

export function validate(
    data: FormData
) { 
    const name = data.get('name') as string;
    const terms = data.get('terms') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const passwordConfirmation = data.get('confirm_password') as string;
    const stack = data.get('stack') as string;
    const role = data.get('role') as string;

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
    if(!passwordConfirmation) {
        return 'confirm_password';
    }

    if(password !== passwordConfirmation) {
        return 'confirm_password_match';
    }

    // @ Validate stack
    if(!stack) {
        return 'stack';
    }

    if(!STACK.includes(stack)) {
        return 'stack_invalid';
    }

    // @ Validate role
    if(!role) {
        return 'role';
    }

    if(!ROLE.includes(role)) {
        return 'role_invalid';
    }

    return true;
}