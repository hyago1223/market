import products from "../controllers/productController.js"
import express from "express";

const router = express.Router();

router.get("/api/products",products.ListProducts);


export default router;