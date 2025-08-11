import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import register from '../utils/validators.js';

export async function ChangePassword(req,res,next) {
    const { newpassword, email } = req.body;

    const {error} = register.loginSchema.validate(email,newpassword);
    if(!error) return res
}

export async function ChangeName(req,res,next) {
    const { newname, email } = req.body;

    const [rows] = await pool.query("Select * from users where email = ?"[email]);
    if(rows.length === 0) return res.status(404).json({ error: "Usuario não Encontrado"});

    await pool.query("Update users set name = ? where email = ?",[newname,email]);
    res.status(200).json({ messagem: "O Usuario foi renomeado"});

    next()
}

export default {ChangeName,ChangePassword};