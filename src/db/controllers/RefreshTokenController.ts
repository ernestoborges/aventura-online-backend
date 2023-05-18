import { Request, Response } from 'express';
import User from '../models/User';
import jwt from "jsonwebtoken"
import ActiveSession from '../models/ActiveSession';


const mySecret = process.env.JWT_SECRET;

export const handleRefreshToken = async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "Token não fornecido" })

    const activeSession = await ActiveSession.findOne({ refreshToken: refreshToken });

    if (!activeSession) return res.status(401).json({ message: "Não encontrado sessão ativa com esse refreshtoken" })

    const user = await User.findById(activeSession.id);

    if (!user) {
        return res.status(401).json({ message: "Não encontrado usuário com esse refreshToken" });
    }

    jwt.verify(refreshToken, mySecret!, async (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err || user.username !== decoded.username) {
            return res.status(403).json({ message: "Refresh token inválido" });
        }

        // USER DATA
        const userData = {
            id: user._id,
            avatar_url: user.avatar_url,
            username: user.username,
            email: user.email,
            isVerifyed: user.isVerifyed,
            birthDate: user.birthDate,
            createdAt: user.createdAt
        }

        const accessToken = jwt.sign(
            userData,
            mySecret!, {
            expiresIn: "10s",
        });

        const refreshToken = jwt.sign(
            { username: user.username },
            mySecret!,
            { expiresIn: '1d' }
        );

        activeSession.refreshToken = refreshToken
        await activeSession.save();

        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000 });

        // res.cookie("token", accessToken, { httpOnly: true });
        res.json({ accessToken });
    });
};