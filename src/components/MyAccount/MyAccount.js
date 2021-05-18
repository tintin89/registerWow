import {useState} from 'react';
import './MyAccount.css'
import alianza from '../../Assets/alianza.png';
import horda from '../../Assets/horda.png';
import Backdrop from '../UI/Backdrop/Backdrop'
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux';
import {logoutWow} from  "../../store/actions/userAction";
import CreatePlayer from '../UI/CreatePlayer/CreatePlayer';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import IconButton from '@material-ui/core/IconButton'
import {wowclases} from '../../imgData';

const mapState = (globalState) =>({
  user:globalState.userInfo
})

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));


function MyAccount({showLBar}) {
  const dispatch = useDispatch();
  
  const {user} = useSelector(mapState);  
  const [choosing,setChoosing] = useState(user?.faction !=="" ? false : true);
  
  const classes = useStyles();
  
  
   const handleChoosing = ()=>{
     setChoosing(false);
     
   }
   
    const getLevel = () =>{
      let count = 0;
     for (var k in user.arreglo){
      if (user.arreglo.hasOwnProperty(k)) ++count;
     } 
     return count;
    }


    return (
        <div className="myAccount">
          <Backdrop show={choosing}/>
        { choosing && <CreatePlayer handleChoosing={handleChoosing}/>}
          <div style={{transform:showLBar && 'translateX(0)'}}  className="myAccount__lateralBar">
          <Avatar alt="Nombre" 
          src={
            wowclases.find(c=>c?.clase === user?.clase)?.img
          }
           className={classes.large}/>
         <div className="myAccount__profile">            
              <div  className="myAccount__profile__campo">
              <h3>Usuario</h3>
              <span>{user?.usuario}</span>
              </div>
              <div  className="myAccount__profile__campo">
              <h3>Clase</h3>
              <span>{user?.clase}</span>
              </div>
              <div className="myAccount__profile__campo">
              <h3>Facción</h3>
              <span>{user?.faction}</span>
              </div>
              <div className="myAccount__profile__campo">
              <h3>Nivel</h3>
              <span>{getLevel()+1}</span>
              </div>  
              <div className="myAccount__profile__campo">
              <h3>Correo</h3>
              <span>{user?.correo}</span>
              </div>   

              <div className="logout">
              <IconButton onClick={()=>dispatch(logoutWow())}>
                <ExitToAppRoundedIcon/>
              </IconButton>
              </div>  
          
         </div>
          
          
          </div>
          <div className="myAccount__welcome">
            <h1>Bienvenido a Azeroth</h1>
            <img alt="logoFaction" src={user?.faction === "alianza" ? alianza : horda}/>
          </div>

        </div>
    )
}

export default MyAccount
