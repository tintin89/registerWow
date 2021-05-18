import User from '../models/userModel.js';
import * as utils from '../Utils/utils.js';
import bcrypt from 'bcryptjs';



export const updateUser = (req,res)=>{
    res.send('atualiza user');
}

export const registrarUser =async (req,res)=>{
    const {nombre,apellidos,usuario,correo,password} = req.body;
    
    const checkUser = await User.findOne({correo:req.body.correo},{useFindAndModify:false});
    if(checkUser){
        res.status(400).send({message:'Este user ya existe!'});
    }else{
        const logslogin = [];
        const newUser = new User({
            nombre,
            apellidos,
            usuario,
            correo,
            password:bcrypt.hashSync(password,8),
            logslogin,
            faction:"",
            clase:""
        });             
        const user = await newUser.save();  
        if(user){
            utils.registrarLogin(user._id,user.logslogin);
            res.send({
                _id:user._id,
                usuario:user.usuario,
                faction:user.faction,
                clase:user.clase,
                correo:user.correo,
                token:utils.generarToken(user)
            })
            } else {
                res.status(400).json({message:'Datos inválidos!'});
            }   
    }   
}

export const login = async (req,res)=>{
    const user = await User.findOne({$or:[{correo:req.body.correo},{usuario:req.body.usuario}]},{useFindAndModify:false});   
    
    if(user){        
        if(bcrypt.compareSync(req.body.password,user.password)){
          utils.registrarLogin(user._id,user.logslogin); 
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