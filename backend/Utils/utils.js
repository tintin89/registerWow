import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';




export const generarToken = (user) =>{
    return jwt.sign({
         _id:user._id,                 
    },process.env.JWT_SECRET || 'palabrasecreta',{
        expiresIn:'1d'
    });
}

export const registrarLogin = async (userid,loginlogs) =>{
    const dateobj = new Date();
    const day = dateobj.getDay();
    const month = dateobj.getMonth()+1;
    const year = dateobj.getFullYear();
    const hora = dateobj.getHours();
    const minutos = dateobj.getMinutes();
    const sec = dateobj.getSeconds();
    const loginLog = `fecha: ${day}/${month}/${year} hora: ${hora}:${minutos}:${sec}`;

    
    const userFound = await User.findByIdAndUpdate(userid,{logslogin:[...loginlogs,loginLog]},{useFindAndModify:false});
    
};