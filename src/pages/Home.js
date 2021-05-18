import React from 'react'
import MyAccount from '../components/MyAccount/MyAccount'



function Home(props) {
    return   (
        
       <MyAccount showLBar={props.showLBar}/> 
       
          )
}

export default Home
