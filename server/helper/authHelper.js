import bcrypt from 'bcrypt'


export const hashedpassword = async(password)=>{
    const saltround = 10;
    const encrypt = await bcrypt.hash(password,saltround)
    return encrypt
}

export const comparePassword = async(password,encrypt)=>{
    return bcrypt.compare(password,encrypt)
}