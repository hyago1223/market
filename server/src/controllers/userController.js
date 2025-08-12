import bcrypt from 'bcrypt';
import logger from '../config/logger.js';
import pool from '../config/db.js';
import register from '../utils/validators.js';

export async function ChangePassword(req,res,next) {
    const { newpassword,password, email } = req.body;

    const {error} = register.loginSchema.validate(email,newpassword);
    if(!error){
        res.status(403).json({ error: ""})
    }
    
    try{
        const [rows] = await pool.execute("Select * from users where email = ?",[email]);
        if(!(rows.length === 0)) return res.status(404).json({ error: "Usuario não Encontrado"});

        const user = rows[0];

        const ispassword = await bcrypt.compare(password,user.password);
        if(!ispassword) return res.status(403).json({ error: "Senha incorreta"});

        await pool.query("UPDATE USERS SET password = ? where email = ?",[newpassword,email]);
        logger.info(`O usuario ${rows[0].name} do email: ${email} Redefiniu sua senha para ${newpassword}`);
        res.status(200).json({ messagem: "Senha foi Redefinida"});
        next()
    }catch(err){
        next(err);
    }
}

export async function ChangeName(req,res,next) {
    const { newname, email } = req.body;

    try{
        const [rows] = await pool.query("Select * from users where email = ?"[email]);
        if(rows.length === 0) return res.status(404).json({ error: "Usuario não Encontrado"});

        await pool.query("Update users set name = ? where email = ?",[newname,email]);
        res.status(200).json({ messagem: "O Usuario foi renomeado"});

        logger.info(`O usuario ${rows[0].name} do email: ${email} renomeou-se para ${newname}`);
        next()
    }catch(err){
        next(err);
    }
}

export default {ChangeName,ChangePassword};