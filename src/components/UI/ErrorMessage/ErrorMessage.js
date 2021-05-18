import React from 'react'
import './ErrorMessage.css'
import {useSelector} from 'react-redux'

const mapState = (globalState) =>({
    mensaje:globalState.errorMensaje
  })

function ErrorMessage() {
  const {mensaje} = useSelector(mapState);
    return (
        <div className="errorMessage">
           {mensaje}
        </div>
    )
}

export default ErrorMessage