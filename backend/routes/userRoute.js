import express from 'express';
import * as userctrl from '../controllers/userCtrl.js';



const userRoute = express.Router();



userRoute.put('/users/:id',userctrl.updateUser);

userRoute.post('/users',userctrl.registrarUser);

userRoute.post('/login',userctrl.login);




export default userRoute;