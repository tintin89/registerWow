import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import cors from 'cors';

//inizializando express
const app = express();
app.use(cors());

//esto es para reconocer los obj  de los request
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//conectandose a la bd
mongoose.connect('mongodb://localhost/wowdb',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
},

()=>console.log('conectado la BD!!'));


//rutas
app.use('/api',userRoute);

//ruta principal api registerWow
app.get('/',(req,res)=>{
    res.send('RegisterWow-App-Api')
});



app.listen(5000,()=>{
    console.log('Api RegisterWoW online http://localhost:5000');
});
