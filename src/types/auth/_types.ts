export interface Login {
    email: string;
    password: string;
}

export interface Register extends Login {
    confirm_password?: string
}

export interface AuthFormProps extends Register {
    extend?: boolean
}