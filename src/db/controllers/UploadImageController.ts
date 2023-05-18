import { Request, Response } from 'express';

import { v2 as cloudinary } from "cloudinary"
import User from '../models/User';

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const imageFile = req.body.file;
        const username = req.body.username;

        if (!imageFile) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        // Configuration 
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        // Upload
        const response = cloudinary.uploader.upload(
            imageFile,
            { public_id: user._id }
        )

        response.then(async (data) => {
            user.avatar_url = data.secure_url;
            const updatedUser = await user.save();

            res.status(200).json({ avatar_url: updatedUser.avatar_url });
        }).catch((err) => {

            res.status(400).json({ error: err });
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro fazer upload de imagem.' });
    }
};
