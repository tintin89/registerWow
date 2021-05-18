import {useDispatch,useSelector} from 'react-redux';
import {logoutWow} from '../../store/actions/userAction';
import './Navbar.css';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MenuIcon from '@material-ui/icons/Menu';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import IconButton from '@material-ui/core/IconButton'

const mapState = (globalState) =>({
    user:globalState.userInfo
  })

function NavBar({handleLBar}) {
    const dispatch = useDispatch();
    const {user} = useSelector(mapState);
    return (
        <div className="container__navbar">
            <div className="navBar">
                <div className="navBar__logo">               
                World Of WarCraft<br/> Registro
                </div>
                <div className="inOutIcon">
                {  !user ?
                    <IconButton>
                 <HomeRoundedIcon/>    
                </IconButton>
                :
                <IconButton onClick={()=>dispatch(logoutWow())}>
                 <ExitToAppRoundedIcon/>    
                </IconButton> 
                }
                 
                </div>   
                {
                   user!=="" ?
                   <div className="hambIcon">
                <IconButton onClick={handleLBar}>
                 <MenuIcon/>    
                </IconButton>
                </div>  
                  :
                  <div className="hambIcon">
                  <IconButton>
                 <HomeRoundedIcon/>    
                </IconButton>
                </div>  
                 
                
                

                }                       
                 
                           
            </div>            
        </div>
    )
}

export default NavBar
