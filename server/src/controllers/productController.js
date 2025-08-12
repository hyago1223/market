import pool from '../config/db.js';
import logger from '../config/logger.js';

export async function AddProduct(req, res, next) {
    const { name, description, inventory, price, id_seller } = req.body;

    try {
        await pool.query("INSERT INTO Products (name, description, inventory, price, is_sell, id_seller) VALUES (?, ?, ?, ?, 1, ?)",[name, description, inventory, price, id_seller]);
        res.status(200).json({ message: `Produto: ${name} adicionado` });
        logger.info(`Produto de nome: ${name} foi adicionado pelo venddedor de id: ${id_seller}`);
        next();
    } catch (err) {
        next(err); 
    }
}

export async function DeleteProduct(req, res, next) {
    const { name, id_seller } = req.body;

    try {
        const [rows] = await pool.execute("SELECT * FROM products WHERE name = ? AND id_seller = ?",[name, id_seller]);

        if (rows.length === 0) {
            const error = new Error("Produto não existe neste vendedor");
            error.status = 404;
            throw error;
        }

        await pool.query("UPDATE products SET is_sell = 0 WHERE name = ? AND id_seller = ?",[name, id_seller]);

        res.status(200).json({ message: `Produto: ${name} retirado da venda` });
        logger.info(`Produto: ${name} retirado da venda`);
        next();
    } catch (err) {
        next(err);
    }
}

export async function UpdateProduct(req, res, next) {
    const { id_product, id_seller, column, value } = req.body;

    try {
        const allowedColumns = ["name", "description", "inventory", "price", "is_sell"];
        if (!allowedColumns.includes(column)) {
            const error = new Error("Coluna inválida");
            error.status = 400;
            throw error;
        }

        await pool.query(
            `UPDATE products SET ${column} = ? WHERE id_product = ? AND id_seller = ?`,
            [value, id_product, id_seller]
        );

        const [rows] = await pool.execute(
            "SELECT * FROM products WHERE id_product = ?",
            [id_product]
        );

        res.status(200).json({ message: `Produto ${rows[0].name} atualizado com sucesso` });
        logger.info(`Produto de nome: ${rows[0].name} foi atualizado com ${column} com ${value} sendo atualizado`);
        next();
    } catch (err) {
        next(err);
    }
}

export async function SelectProduct(req, res, next) {
    const { column, value, id_seller } = req.body;

    try {
        const allowedColumns = ["name", "description", "inventory", "price", "is_sell", "id_product"];
        if (!allowedColumns.includes(column)) {
            const error = new Error("Coluna inválida");
            error.status = 400;
            throw error;
        }

        const [rows] = await pool.execute(`SELECT * FROM products WHERE id_seller = ? AND ${column} = ?`,[id_seller, value]);

        if (rows.length === 0) {
            const error = new Error("Nenhum produto encontrado");
            error.status = 404;
            logger.warn(`Error:${error}`);
            throw error;
        }

        res.status(200).json(rows);
        next();
    } catch (err) {
        next(err);
    }
}

export async function SelectProductbyId(req, res, next) {
    const { id_product } = req.body;

    try {
        const [rows] = await pool.execute(`SELECT * FROM products WHERE id = ? `,[id_product]);

        if (rows.length === 0) {
            const error = new Error("Nenhum produto encontrado");
            error.status = 404;
            logger.warn(`Error:${error} por id`);
            throw error;
        }

        res.status(200).json(rows);
        next();
    } catch (err) {
        next(err);
    }
}

export async function ListProducts(req, res, next) {
    const { id_seller } = req.query;

    try {
        let query = "SELECT * FROM products";
        let params = [];

        if (id_seller) {
            query += " WHERE id_seller = ?";
            params.push(id_seller);
        }

        const [rows] = await pool.execute(query, params);

        if (rows.length === 0) {
            const error = new Error("Nenhum produto encontrado");
            error.status = 404;
            logger.warn(`Error:${error}`);
            throw error;
        }

        res.status(200).json(rows);
        next();
    } catch (err) {
        next(err);
    }
}

export default {AddProduct,DeleteProduct,UpdateProduct,SelectProduct,ListProducts};