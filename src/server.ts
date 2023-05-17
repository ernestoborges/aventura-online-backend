import express, { Express, Request, Response, NextFunction } from "express";
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
  origin: "https://aventuraonline.netlify.app",
  credentials: true
}));

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    // Define os cabeçalhos CORS necessários
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    res.setHeader("Access-Control-Allow-Origin", "https://aventuraonline.netlify.app");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200); // Retorna um status 200 OK para a solicitação OPTIONS
  } else {
    next(); // Passa a execução para o próximo middleware
  })
app.use(cookieParser());
app.use(router);

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
