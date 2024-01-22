import bcrypt from "bcryptjs";

const ENCRYPTION_SALT =  bcrypt.genSaltSync(10);

export const encrypt = (text: string) => { 
    return bcrypt.hashSync(text, ENCRYPTION_SALT);
};

export const compareEncryption = (text: string, toCompare: string) => {
    return bcrypt.compareSync(text, toCompare);
};