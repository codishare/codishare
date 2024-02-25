import { ResetPassword } from "@/types/auth/_types";
import { isSecure } from "../../password";

export const validate = (data: ResetPassword) => {
    const { password, confirm_password } = data;

    // @ Validate password
    if (!password) {
        return "password";
    }

    if (typeof password !== "string") {
        return "invalid_format";
    }

    const validPassword: string | true = isSecure(password);

    if (validPassword !== true) {
        return validPassword;
    }

    // @ Validate confirm_password
    if (!confirm_password) {
        return "confirm_password";
    }

    if (typeof confirm_password !== "string") {
        return "invalid_format";
    }

    if (password !== confirm_password) {
        return "confirm_password_match";
    }

    return true;
};
