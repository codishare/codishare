export interface Login {
    email: string;
    password: string;
}

export enum STACK {
    "FRONTEND",
    "BACKEND",
    "FULLSTACK",
}

export enum ROLE {
    "TRAINEE",
    "JUNIOR",
    "MID",
    "SENIOR",
}

export interface SignUp extends Login {
    name: string;
    confirm_password: string;
    terms: boolean;
    stack: string;
    role: string;
}

export interface RefreshToken {
    refresh_token: string;
}

export interface DecodedToken {
    userId: number;
    iat: number;
    exp: number;
}

export interface ResetPassword {
    password: string;
    confirm_password: string;
}

export interface User {
    id: number;
    name: string;
    alias: string;
    stack: STACK;
    seniority: ROLE;
    created_at: Date;
}

export interface Session extends User {
    email: string;
    role: "USER" | "ADMIN";
    email_verified: boolean;
}
