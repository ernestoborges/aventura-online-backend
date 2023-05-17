import express, { Express } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import "./db/connect"
import router from "./routes";

dotenv.config();

const app: Express = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
    origin: process.env.FRONTEND_BASE_URL, //front-end server address
    credentials: true, // allow use of credentials
}));

app.use(cookieParser());
app.use(router);

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
