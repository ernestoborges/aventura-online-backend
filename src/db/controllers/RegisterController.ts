import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const mySecret = process.env.JWT_SECRET;

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

         // JWT TOKEN CREATION
         const token = jwt.sign({ userId: newUser._id }, mySecret!, { expiresIn: '1h' });

         res.cookie("token", token, { httpOnly: true });
         res.status(201).send({
             avatar_url: newUser.avatar_url,
             username: newUser.username,
             email: newUser.email,
             isVerifyed: newUser.isVerifyed,
             birthDate: newUser.birthDate,
             createdAt: newUser.createdAt
         });
         
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao criar usuário. ${JSON.stringify(req.body)}` });
    }
};