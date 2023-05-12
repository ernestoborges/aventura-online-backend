import express, { Request, Response } from 'express';
import { login } from './db/controllers/LoginController';
import { register } from './db/controllers/RegisterController';

const router = express.Router();

router.post('/register', register );
router.post('/login', login);
router.get('/login', (req, res) => res.send("ok"));

export default router;
