import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route,Link  } from 'react-router-dom';
import Home from './views/Home'
import Navbar from './components/Navbar'
import BuildingManager from './views/BuildingManager'
import Tenant from './views/Tenant'
import Engineer from './views/Engineer'
import ShowTenant from './views/ShowTenant'

function App() {
  return (
    <div class="bg app">
        <Navbar />
   
        <Router >         
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
               <Route path="/BuildingManager" element={<BuildingManager />}></Route>
               <Route path="/Tenant" element={<Tenant />}></Route>
               <Route path="/Engineer" element={<Engineer />}></Route>
               <Route path="/ShowTenant" element={<ShowTenant />}></Route>
         
            </Routes>
        </Router> 

      

    </div>
  );
}

export default App;
