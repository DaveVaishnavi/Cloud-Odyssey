import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { BrowserRouter, Routes} from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./pages";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import MasterService from "./pages/MasterService";
import WorkerService from "./pages/WorkerService";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/LogIn" element={<LogIn/>}/>
        <Route exact path="/Register" element={<Register/>}/>
        <Route exact path="/MasterService" element={<MasterService/>}/>
        <Route exact path="/WorkerService" element={<WorkerService/>} />
      </Routes>
    </Router>
  );
}

export default App;
