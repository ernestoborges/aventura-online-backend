import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
