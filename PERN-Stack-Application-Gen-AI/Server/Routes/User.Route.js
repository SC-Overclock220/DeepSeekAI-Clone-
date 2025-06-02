import express from 'express';
import signup from '../Controllers/UserControllers/SignUp.Controller.js';
import login from '../Controllers/UserControllers/Login.Controller.js';
import logout from '../Controllers/UserControllers/Logout.Controller.js';
const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;

