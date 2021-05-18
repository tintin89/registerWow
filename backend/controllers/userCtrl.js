import User from '../models/userModel.js';



export const updateUser = (req,res)=>{
    res.send('atualiza user');
}

export const registrarUser =(req,res)=>{
    res.send('registra user');
}

export const login = (req,res)=>{
    res.send('login user');
}