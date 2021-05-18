import React,{useState} from 'react'
import './CreatePlayer.css';
import alianza from '../../../Assets/alianza.png';
import horda from '../../../Assets/horda.png';
import Axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {updateUserInfo,updateCargando,updateErrorM} from '../../../store/actions/userAction';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import {wowclases} from '../../../imgData';


const mapState = (globalState) =>({
    user:globalState.userInfo,
    mensaje:globalState.errorMensaje
  })


function CreatePlayer(props) {
    const dispatch = useDispatch();
    const {user,mensaje} = useSelector(mapState);
    const [faction,setFaction]= useState("");
    const [continuar,setContinuar] = useState(false);
    const [clase,setClase]=useState("");
    


    const handleContinuar = () =>{
        dispatch(updateErrorM(""));
        if(continuar){
              if(faction===""||clase===""){
                 dispatch(updateErrorM("Debe seleccionar 1 clase y 1 facción"));
              }  else{
                dispatch(updateCargando(true)); 
                Axios.put(`http://localhost:5000/api/users/${user._id}`,{faction,clase},{
                      headers:{
                          Authorization: 'Bearer '+ user.token
                      }
                  }).then(response=>{
                      dispatch(updateUserInfo(response.data));
                      localStorage.setItem('userInfo',JSON.stringify(response.data));
                      dispatch(updateCargando(false));
                      dispatch(updateErrorM(""));
                      props.handleChoosing(); 
                  })
                  .catch(error=>{
                      dispatch(updateErrorM(error.response.data.message));
                  })  
              }
        
        }else{
            if(faction===""){
                dispatch(updateErrorM("Seleccione 1 facción!"));
            }else{
                setContinuar(true);
            }
            
        }
    }
    return (
        <div className="createPlayer">
            
                
               <div className="chooseFaction">
                 <h2>{!continuar ? "Selecciona una Facción" : "Selecciona una clase"}</h2>
                 {
                    !continuar ? 
                    <div className="factions">                  
                    <img 
                    onClick={()=>setFaction("alianza")}
                     alt="alianza" 
                     src={alianza} 
                     style={{transform:faction==="alianza" ? 'scale(1.3)' : "none"}}/>
                    <img 
                    onClick={()=>setFaction("horda")} 
                    alt="horda" 
                    src={horda} 
                    style={{transform:faction==="horda" ? 'scale(1.3)' : "none"}}/>                  
               </div>
               :
               <div className="wowClases">
                  {
                      wowclases.map((c,index)=>(
                          <img key={index} onClick={()=>setClase(c.clase)} style={{transform:clase===c.clase ? 'scale(1.4)' : "none"}} alt={c.clase} src={c.img}/>
                      ))
                  }
                   
               </div>
              
                 }
                
               </div>           
                 
            <button onClick={()=>handleContinuar()}>Continuar</button>   
            {mensaje!=="" && <ErrorMessage/> }   
        </div>
    )
}

export default CreatePlayer
