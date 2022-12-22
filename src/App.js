import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import { useParams, useNavigate, useMatch } from 'react-router-dom';
import ConfirmEmail from './components/confirmEmail';  
import Login from './components/login';
import Signup from './components/signup/index';
import { BrowserRouter as Router, Route, Link, NavLink, Routes } from 'react-router-dom'



function App() {
const {path}= useMatch()

  return (
    <Router>
      <Routes>  
         <Route exact path={`${path}`} element={<Signup/>} />  
         <Route path={`${path}`} element={<Login/>} />
         <Route path={`${path}`} element={<ConfirmEmail/>} />    
      </Routes>
    </Router> 
  );
}

export default App;
