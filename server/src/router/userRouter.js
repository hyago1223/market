import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import register from '../utils/validators.js';
import express from 'express';
import logger from '../config/logger.js';

const router = express.Router();

router.post("/api/register", async (req,res) => {
    const { name, email, password } = req.body;

    const { error } = register.registerSchema.validate({ name, email, password });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const [existingUser] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'Email já está em uso.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (name, email, password,is_admin) VALUES (?, ?, ?, 0)', [name, email, hashedPassword]);
        logger.info(`Usuario do nome: ${name} e email: ${email} foi registrado com sucesso`);
        res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (err) {
        next(err);
    }
});

export default router;