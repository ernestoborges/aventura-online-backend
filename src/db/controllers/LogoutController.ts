import { Request, Response } from 'express';
import ActiveSession from '../models/ActiveSession';

interface CustomRequest extends Request {
    userId?: string;
}

export const logout = async (req: CustomRequest, res: Response) => {

    if (!req.userId) {
        return res.status(401).json({ message: "Não foi recebido id para logout" });
    }

    const activeSession = await ActiveSession.findOneAndDelete({ id: req.userId });

    if (!activeSession) {
        return res.status(401).json({ message: "Não encontrado sessão ativa referente ao usuario" });
    }

    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logout realizado com sucesso" });
};




