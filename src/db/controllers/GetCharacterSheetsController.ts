import { Request, Response } from 'express';;
import User from '../models/User';

export const getUserCharacters = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        const result = await User.aggregate([
            { $match: { _id: userId } }, // filter by user id
            {
                $lookup: {
                    from: 'characterSheets', // character sheet colection name
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'characterSheets',
                },
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    characterSheets: 1,
                },
            },
        ]);

        // 'result' returns an array so it's needed to select first index
        const userWithCharacterSheets = result[0];

        res.status(200).json({ userWithCharacterSheets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter fichas.' });
    }
};
