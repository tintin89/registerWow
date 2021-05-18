import {useState} from 'react'
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import './App.css';
import NavBar from './components/NavBar/NavBar';


import Login from './pages/Login';
import Home from './pages/Home';
import VerifyAuth from './Hoc/verifyAuth';




function App() {
  const [showBar,setShowBar] = useState(false);

  const handleShowBar = () =>{
    setShowBar(!showBar);
  }
  
  return (
    <div className="app">
      <NavBar handleLBar={handleShowBar} />  
      
      <div className="app__container">
      <BrowserRouter>  
        <Switch>
        <Route path="/login" render={()=>(   
          <Login/>   
                  
              
          )}/> 
          <Route path="/" render={()=>(
             <VerifyAuth>
             <Home showLBar={showBar}/>    
           </VerifyAuth>
          )}/>         
        </Switch>        
        </BrowserRouter>
      </div>
      
         
    </div>
    
  );
}

export default App;
