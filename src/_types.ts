export interface Login {
    email: string, 
    password: string
}

export enum STACK {
    "FRONTEND", 
    "BACKEND",
    "FULLSTACK"
}

export enum ROLE {
    "TRAINEE",
    "JUNIOR", 
    "MID", 
    "SENIOR"
}

export interface SignUp extends Login {
    name: string, 
    confirm_password: string, 
    terms: boolean, 
    stack: STACK, 
    role: ROLE
}