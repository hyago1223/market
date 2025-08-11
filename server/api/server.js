import routers from '../src/router/index.js';
import ErrorHandler from '../src/utils/constants.js';
import express from 'express';
import cors from 'cors';
import Path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Configurações
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(express.static("public/html"));

app.get("/", (req,res)=>{
    res.sendFile(Path.resolve("index.html"));
});

app.get("/conta", (req,res)=>{
    res.sendFile(Path.resolve("account.html"));
});

app.get("/cart", (req,res)=>{
    res.sendFile(Path.resolve("cart.html"));
});

app.get("/:search", (req,res)=>{
    res.sendFile(Path.resolve("search.html"));
});

app.get("/product", (req,res)=>{
    res.sendFile(Path.resolve("product.html"));
});

// rotas
app.use(routers);

//Erros
app.use(ErrorHandler)

//Erro 404
app.use((req,res)=>{
    res.send
});

app.listen(process.env.PORT,() =>{
    console.log(`Servidor ativo na porta ${process.env.PORT}`)
})