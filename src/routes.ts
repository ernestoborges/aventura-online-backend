import express from 'express';
import { login } from './db/controllers/LoginController';
import { register } from './db/controllers/RegisterController';
import { getUserCharacters } from './db/controllers/GetCharacterSheetsController';
import { authMiddleware } from './db/middlewares/authMiddleware';
import { createCharacter } from './db/controllers/CreateCharacterSheetController';
import { getUserData } from './db/controllers/UserController';
import { handleRefreshToken } from './db/controllers/RefreshTokenController';
import { uploadImage } from './db/controllers/UploadImageController';

const router = express.Router();

router.get('/hello', (req, res) => res.status(201).json({hi: "hello, world"}))
router.post('/register', register);
router.post('/login', login);

router.get('/refresh-token', handleRefreshToken);

// protected routes
router.get('/user', authMiddleware, getUserData);

router.post('/upload-profile-image', authMiddleware, uploadImage);
router.get('/characters', authMiddleware, getUserCharacters);
router.post('/characters', authMiddleware, createCharacter);

export default router;
