import auth from "../middlewares/index.js";
import admin from "../middlewares/adminAuth.js"
import express from "express";
import jwt from "../config/jwt.js";
import bcrypt from 'bcrypt';
import pool from '../config/db.js';

const router = express.Router();

router.get("/api/authorize",auth,(req,res)=>{
    res.status(200).json({ message: "autorizado"});
});

router.get("/api/authorize-admin",auth,admin,(req,res)=>{
    res.status(200).json({ message: "autorizado" });
});

router.post("/api/auth/login",async (req,res) =>{
    const { email, password } = req.body;

    const {error} = register.registerSchema.validate({ email,password });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const [rows] = await pool.query("SELECT * FROM users where email = ?",[email]);
    if(rows.length === 0) return res.status(401).json({ error: 'Senha ou usuario Incorreto'});

    const user = rows[0]
    const ispasswordTrue = await bcrypt.compare(password,user.password)
    if(!ispasswordTrue) return res.status(401).json({ error: 'Senha ou usuario Incorreto'});

    return res.status(200).json({ token: jwt.generateToken(user) });
});

export default router;