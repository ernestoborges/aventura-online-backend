import { Request, Response } from 'express';
import CharacterSheet from '../models/CharacterSheet';

export const createCharacterSheet = async (req: Request, res: Response) => {
    try {
        const { userId, name, xp, level, race, characterClass } = req.body;

        const characterSheet = new CharacterSheet({
            name,
            xp,
            level,
            race,
            characterClass,
            userId: userId, // user associated with character sheet
        });

        const savedCharacterSheet = await characterSheet.save();

        res.status(201).json(savedCharacterSheet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar ficha de personagem' });
    }
};
