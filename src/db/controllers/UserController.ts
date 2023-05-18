import { Request, Response } from 'express';
import User from '../models/User';

interface CustomRequest extends Request {
    userId?: string;
}

export const getUserData = async (req: CustomRequest, res: Response) => {

    if (!req.userId) return res.status(400).json({ message: 'Nome de usuario necessário' });

    const user = await User.findOne({ _id: req.userId });
    if (!user) {
        return res.status(204).json({ message: `Não encontrado dados do usuario: ${req.body.username}` });
    }

    res.json(user);
};
