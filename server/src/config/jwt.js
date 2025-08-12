import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

export const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.id,
            email: user.email,
            user: user.name,
            is_admin: user.is_admin
        },
    JWT_SECRET,
    {
        expiresIn: '24h'
    })
}

export const verfityToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }catch (error) {
        return "Invalid token";
    }
}

export default { generateToken, verfityToken };