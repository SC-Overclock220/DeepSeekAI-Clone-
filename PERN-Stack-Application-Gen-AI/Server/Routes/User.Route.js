import express from 'express';
import signup from '../Controllers/UserControllers/SignUp.Controller.js';
import login from '../Controllers/UserControllers/Login.Controller.js';
import logout from '../Controllers/UserControllers/Logout.Controller.js';
import auth from '../Middleware/Auth.Middleware.js';
import getUser from '../Controllers/UserControllers/GetUser.Controller.js';
const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get('/getUser', auth, getUser);

export default router;

