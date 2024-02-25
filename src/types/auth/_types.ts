import { DEVICE_TYPES, ROLE, STACK } from "@/types/auth/_enums";

export interface Login {
    email: string;
    password: string;
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

export interface User {
    id: number;
    name: string;
    alias: string;
    stack: STACK;
    seniority: ROLE;
    created_at: Date;
}

export interface Device {
    id: number;
    name: string;
    device?: DEVICE_TYPES;
    agent?: string;
    model?: string;
    browser?: string;
    os?: string;
    ip?: string;
    created_at: Date;
}

export interface Session extends User {
    email: string;
    role: "USER" | "ADMIN";
    icon: string;
    banner: string;
    email_verified: boolean;
    devices: Device[];
}

export interface ResetPassword {
    password: string;
    confirm_password: string;
}

export interface Context {
    session: Session | false;
    loading: boolean;
    refetchSession: () => void;
}