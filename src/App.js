import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <div className="app">
    
    
    <div className="app__container">
    <BrowserRouter>  
      <Switch>
        <Route path="/login" render={()=>(
          <Login/>
        )}/>    
        <Route path="/" render={()=>(      
            <Home/>
       )}/>      
      </Switch>        
      </BrowserRouter>
    </div>
    
       
  </div>
  );
}

export default App;
