import express from 'express';
import auth from '../Middleware/Auth.Middleware.js';
import sendPrompt from '../Controllers/PromptController/SendPrompt.Controller.js';

const router = express.Router();


router.post("/sendPrompt", auth, sendPrompt);

export default router;