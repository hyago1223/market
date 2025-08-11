import express from "express";
import auth from "../middlewares/index.js"
import calcularFrete from "../services/CalFrete.js";

const router = express.Router();

router.post("/calcular-frete",auth, async (req, res) => {
    try {
        const { produto, cep } = req.body;

        if (!produto || !cep) {
            return res.status(400).json({ erro: "Produto e CEP são obrigatórios" });
        }

        const frete = await calcularFrete(cep,peso=produto.peso,valor=produto.valor);
        res.json({
            produto,
            cep,
            ...frete
        });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao calcular frete" });
    }
});

export default router; 