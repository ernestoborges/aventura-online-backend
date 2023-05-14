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

        // JWT TOKEN CREATION
        const token = jwt.sign({ userId: user._id }, mySecret!, { expiresIn: '1h' });

        res.cookie("token", token, { httpOnly: true });
        res.status(200).send({
            avatar_url: user.avatar_url,
            username: user.username,
            email: user.email,
            isVerifyed: user.isVerifyed,
            birthDate: user.birthDate,
            createdAt: user.createdAt
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
};
