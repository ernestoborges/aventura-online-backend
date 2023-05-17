import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from "dotenv"
dotenv.config();

const mySecret = process.env.JWT_SECRET;

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // USERNAME VERIFICATION 
        const user = await User.findOne({ $or: [{ username: username }, { email: username }] });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // PASSWORD VERIFICATION
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
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

        console.log(`secret login ${mySecret}`)
        // JWT TOKEN CREATION
        const accessToken = jwt.sign(
            { ...userData },
            mySecret!,
            { expiresIn: '10s' }
        );

        const refreshToken = jwt.sign(
            { username: user.username },
            mySecret!,
            { expiresIn: '1d' }
        );

        user.refreshToken = refreshToken
        await user.save();

        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });

        console.log(`token de acesso: ??????`)
        console.log(`token de acesso: ${accessToken}`)
        console.log(`token de atualização: ${refreshToken}`)
        res.status(200).json({ accessToken });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
};
