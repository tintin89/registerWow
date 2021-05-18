import express from 'express';
import mongoose from 'mongoose';

//inizializando express
const app = express();

//esto es para reconocer los obj q de los request
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//conectandose a la bd
mongoose.connect('mongodb://localhost/wowdb',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
},

()=>console.log('conectado la BD!!'));



//ruta principal api registerWow
app.get('/',(req,res)=>{
    res.send('RegisterWow-App-Api')
});



app.listen(5000,()=>{
    console.log('Api RegisterWoW online http://localhost:5000');
});
