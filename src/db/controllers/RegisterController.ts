import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, email, birthDate } = req.body;

        // USER VERIFICATION BY USERNAME OR EMAIL
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(409).json({ message: 'Usuário já existe.' });
        }

        // PASSWORD ENCRYPTION
        const hashedPassword = await bcrypt.hash(password, 10);

        // NEW USER CREATION
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            birthDate,
            createdAt: new Date(),
        });

        // SAVE DATA TO DATABASE
        await newUser.save();

        res.status(201).json({ message: "Usuário criado com sucesso!"});
         
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao criar usuário. ${JSON.stringify(req.body)}` });
    }
};