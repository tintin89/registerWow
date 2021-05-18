import jwt from 'jsonwebtoken';




export const generarToken = (user) =>{
    return jwt.sign({
         _id:user._id,                 
    },process.env.JWT_SECRET || 'palabrasecreta',{
        expiresIn:'1d'
    });
}
