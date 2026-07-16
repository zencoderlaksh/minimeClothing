import express from 'express';
import { detectIntent } from '../controllers/chatbot.controller.js';

const router = express.Router();

router.post('/', detectIntent);

export default router;
