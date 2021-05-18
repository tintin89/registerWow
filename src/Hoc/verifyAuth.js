import {useEffect} from 'react'
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';


const mapState = (globalState) =>({
    currentUser:globalState.userInfo
});

const VerifyAuth = props =>{
    const {currentUser} = useSelector(mapState);
    const history=useHistory();

    useEffect(()=>{
        if(currentUser===""){
            history.push('/login')
        }
    },[currentUser,history])

    return props.children;
}

export default VerifyAuth;