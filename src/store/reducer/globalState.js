import * as actionTypes from '../actions/actionsType';



const initialState = {
    userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : "",
    cargando:false,
    errorMensaje:""
}

const globalState = (state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.UPDATE_USER_INFO:
            return {
                ...state,
                userInfo:{...action.usuario}
            }

        case actionTypes.UPDATE_USER_EMPTY:
            return {
                ...state,
                userInfo:""
            }    

        case actionTypes.UPDATE_ERROR_MENSAJE:
           return {
               ...state,
               errorMensaje:action.mensaje
              }       
              
              case actionTypes.UPDATE_CARGANDO:
                return {
                    ...state,
                    cargando:action.loading
                   }   
        default:
            return state
    }
}

export default globalState;