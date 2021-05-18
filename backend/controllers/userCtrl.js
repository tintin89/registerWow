import User from '../models/userModel.js';
import * as utils from '../Utils/utils.js';



export const updateUser = (req,res)=>{
    res.send('atualiza user');
}

export const registrarUser =(req,res)=>{
    res.send('registra user');
}

export const login = async (req,res)=>{
    const user = await User.findOne({$or:[{correo:req.body.correo},{usuario:req.body.usuario}]},{useFindAndModify:false});   
    
    if(user){        
        if(req.body.password===user.password){
            
            res.send({
                _id:user._id,
                token:utils.generarToken(user)
            });
            
        }else{
            res.status(400).json({message:"Datos inválidos"})
        }
    }else{
        res.status(400).send({message:"User no existe"})
    } 
}