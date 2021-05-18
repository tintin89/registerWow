import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre:{type:String,required:true},
    apellidos:{type:String,required:true},
    usuario:{type:String,required:true},
    correo:{type:String, required:true,unique:true},
    password:{type:String,required:true},
    logslogin:{type:Array},
    faction:{type:String},
    clase:{type:String}
    

},
{
    timestamps:true,
    versionKey:false
}
);

const User = mongoose.model("User",userSchema);

export default User;