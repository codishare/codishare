export interface Login {
    email: string, 
    password: string
}

export interface SignUp extends Login {
    name: string, 
    confirm_password: string, 
    terms: boolean, 
    stack: string, 
    role: string
}