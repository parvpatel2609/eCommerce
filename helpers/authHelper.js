import bcrypt from "bcrypt";

export const hashedPassword = async(pass) => {
    try {
        const saltRounds = 10;
        const hasedPass = await bcrypt.hash(pass,saltRounds);
        return hasedPass;
    } catch (error) {
        console.log(`Error in hashing password`);
    }
};

export const comparePassword = async(pass, hashedPass) => {
    try {
        return bcrypt.compare(pass,hashedPass);
    } catch (error) {
        console.log(`Error in comparing password`);
    }
};