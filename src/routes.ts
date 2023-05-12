import express, { Request, Response } from 'express';
import { login } from './db/controllers/LoginController';
import { register } from './db/controllers/RegisterController';
import { getUserSheets } from './db/controllers/GetUserSheetsController';
import { accessTokenMiddleware } from './db/middleweres/acesstoken';
import { createCharacterSheet } from './db/controllers/CreateCharacterSheetController';

const router = express.Router();

router.post('/register', register );
router.post('/login', login);

router.get('user-sheets', accessTokenMiddleware, getUserSheets);
router.post('create-character-sheet', accessTokenMiddleware, createCharacterSheet );

export default router;
