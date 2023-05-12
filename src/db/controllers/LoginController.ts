import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

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
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
};
