import express from 'express';
import * as userctrl from '../controllers/userCtrl.js';
import * as util from '../Utils/utils.js';



const userRoute = express.Router();



userRoute.put('/users/:id',util.verifica,userctrl.updateUser);

userRoute.post('/users',userctrl.registrarUser);

userRoute.post('/login',userctrl.login);




export default userRoute;