import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';

interface AccessTokenPayload extends JwtPayload {
    userId: string;
}

const mySecret = process.env.JWT_SECRET;

interface CustomRequest extends Request {
    userId?: string;
}

export function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {

    const { authorization } = req.headers;

    console.log("token autorizacao: " + authorization)

    if (!authorization) {
        return res.status(401).json({ message: "Headers não enviados" });
    }

    const [, token] = authorization.split(" ");

    try {

        const data = jwt.verify(token, mySecret!);
        const { id } = data as AccessTokenPayload;
        req.userId = id;

        return next();
        
    } catch (err) {
        if (err instanceof JsonWebTokenError) {
            return res.status(401).json({ message: "Token de acesso inválido" });
        }
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}