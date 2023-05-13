import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AccessTokenPayload extends JwtPayload {
    userId: string;
}

const mySecret = process.env.JWT_TOKEN;

function validateAccessToken(accessToken: string) {
    try {
        
        // const decoded = jwt.verify(accessToken, mySecret!) as AccessTokenPayload;
        const decoded = jwt.verify("accessToken", mySecret!) as AccessTokenPayload;

        const userId = decoded.userId;

        return { valid: true, userId };

    } catch (error) {
        // Token is invalid or has expired
        return { valid: false };
    }
}

interface CustomRequest extends Request {
    userId?: string;
}

export function accessTokenMiddleware(req: CustomRequest, res: Response, next: NextFunction) {

    const accessToken = req.headers.authorization;
    if (!accessToken) {
        return res.status(401).json({ error: 'Token de acesso não fornecido.' });
    }

    // Valide o token de acesso
    const validation = validateAccessToken(accessToken);

    if (!validation.valid) {
        return res.status(401).json({ error: 'Token de acesso inválido.' });
    }

    req.userId = validation.userId;

    next();
}