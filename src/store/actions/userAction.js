import * as actionTypes from './actionsType';
import Axios from 'axios';


export const updateUserInfo = (userInfo) =>{
    return {
        type:actionTypes.UPDATE_USER_INFO,
        usuario:userInfo
    }
}
export const updateUserInfoEmpty = () =>{
    return {
        type:actionTypes.UPDATE_USER_EMPTY,
         }
}


export const updateErrorM = (m)=>{
    return {
        type:actionTypes.UPDATE_ERROR_MENSAJE,
        mensaje:m
    }
}

export const updateCargando = (l)=>{
    return {
        type:actionTypes.UPDATE_CARGANDO,
        loading:l
    }
}

export const loginWow = (usuario,password) =>{
    return dispatch => {
            dispatch(updateCargando(true));    
            Axios.post('http://localhost:5000/api/login',{usuario,password})
            .then(response=>{
                dispatch(updateUserInfo(response.data));
                localStorage.setItem('userInfo',JSON.stringify(response.data));
                dispatch(updateCargando(false));
                dispatch(updateErrorM(""));
            })
            .catch(error=>{
                
                dispatch(updateCargando(false));
                dispatch(updateErrorM(error.response.data.message));
            })         
    }
}

export const logoutWow =()=>{
    return dispatch =>{
        localStorage.removeItem('userInfo');
        dispatch(updateUserInfoEmpty());
        
    }
}