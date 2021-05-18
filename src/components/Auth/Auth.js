import './Auth.css';
import {useState} from 'react';
import logo from '../../Assets/logo.png'
import {useDispatch,useSelector} from 'react-redux';
import {loginWow,updateUserInfo,updateErrorM,updateCargando} from '../../store/actions/userAction';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';
import Loader from '../UI/Loader/Loader';

const mapState = (globalState) =>({
  user:globalState.userInfo,
  mensaje:globalState.errorMensaje,
  cargando:globalState.cargando
})

function Auth() {
  const {user,mensaje,cargando} = useSelector(mapState);
  const dispatch = useDispatch();
  const [registrando,setRegistrando] = useState(false);
  const [nombre,setNombre] = useState("");
  const [apellidos,setApellidos] = useState("");
  const [correo,setCorreo] = useState("");
  const [usuario,setUsuario] = useState("");
  const [password,setPassword] = useState("");
  const [passwordConfirm,setPasswordConfirm] = useState("");


  const handleSubmit =  e =>{
    e.preventDefault();
    if(!registrando){
      dispatch(loginWow(usuario,password));
    }else{
     if(nombre===""||apellidos===""||correo===""||usuario===""||password===""||passwordConfirm===""){
      dispatch(updateErrorM("Existen campos vacíos!"));

     }else{
       
       if(password===passwordConfirm){
        dispatch(updateCargando(true));     
        Axios.post('http://localhost:5000/api/users',{nombre,apellidos,usuario,correo,password})
       .then(response=>{
         localStorage.setItem('userInfo',JSON.stringify(response.data));
         dispatch(updateUserInfo(response.data));
         dispatch(updateCargando(false));
         dispatch(updateErrorM(""));
       })  
       .catch(error=>{
         dispatch(updateCargando(false));
         dispatch(updateErrorM(error.response.data.message));
         
       })

   }else{
     dispatch(updateErrorM("Las conraseñas no coinciden"));
   }   
     }
         
  }      
    
    
  }
  
  let redireccionar=null;
  if(user!==""){
       redireccionar=<Redirect to="/login"/>
      }
  
  return (
    
    <div className="auth">
      {redireccionar}
      {
        cargando ? <Loader/>
        :
        <form onSubmit={handleSubmit} autoComplete="off">
        <img alt="logo" src={logo}/>
        
      <div className="authForm__campo">
          <label htmlFor="usuario">Usuario</label>
          <input placeholder={registrando ? `Escriba su usuario` : `Escriba su usuario o correo`} value={usuario}  type="text" name="usuario" id="usuario" onChange={e=>setUsuario(e.target.value)}/>
        </div>
        <div className="authForm__campo">
          <label htmlFor="password">Contraseña</label>
          <input placeholder="Escriba su contraseña..." value={password}  type="password" name="password" id="password" onChange={e=>setPassword(e.target.value)}/>
        </div>
        {
          registrando && 
          <>
          <div className="authForm__campo">
          <label htmlFor="passwordConfirm">Confirmar contraseña</label>
          <input placeholder="Confirme su contraseña..." value={passwordConfirm}  type="password" name="passwordConfirm" id="passwordConfirm" onChange={e=>setPasswordConfirm(e.target.value)}/>
        </div>
          <div className="authForm__campo">
          <label htmlFor="nombre">Nombre</label>
          <input placeholder="Escriba su nombre..."  value={nombre}  type="text" name="nombre" id="nombre" onChange={e=>setNombre(e.target.value)}/>
        </div>
        <div className="authForm__campo">
          <label htmlFor="apellidos">Apellidos</label>
          <input placeholder="Escriba sus apellidos..." value={apellidos}  type="text" name="apellidos" id="apellidos" onChange={e=>setApellidos(e.target.value)}/>
        </div>
        <div className="authForm__campo">
          <label htmlFor="correo">Correo</label>
          <input placeholder="...ejemplo@dominio.com" value={correo}  type="email" name="correo" id="correo" onChange={e=>setCorreo(e.target.value)}/>
        </div>
          </> 
          }      
          

        <button>{registrando ? "Registrar" : "Acceder"}</button>
        <span onClick={()=>setRegistrando(!registrando)}>{!registrando ? "Regístrate Aquí" : "Iniciar sesión"}</span>
        {mensaje!=="" && <ErrorMessage/> }
     </form>
      }

    </div>
  )
}

export default Auth;
