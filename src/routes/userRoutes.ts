import express from 'express';
import { registerUser, userAuth } from '../controller/userController';


export const routerAuth = express.Router();



routerAuth.route('/register').post(registerUser)
routerAuth.route('/login').post(userAuth)


