import { Request, Response } from 'express';
import User from '../models/User';
import jwt from "jsonwebtoken"


const mySecret = process.env.JWT_SECRET;

export const handleRefreshToken = async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "Token não fornecido" })

    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(401).json({ message: "Não encontrado usuario com esse refreshtoken" })

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

        user.refreshToken = refreshToken
        await user.save();

        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });

        // res.cookie("token", accessToken, { httpOnly: true });
        res.json({ accessToken });
    });
};