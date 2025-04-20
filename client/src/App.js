import logo from './assets/images/logo.png';
import './App.css';
import React, { Component } from "react";
import { BrowserRouter, Routes} from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./pages";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import MasterService from "./pages/MasterService";
import WorkerService from "./pages/WorkerService";
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/LogIn" element={<LogIn/>}/>
        <Route exact path="/Register" element={<Register/>}/>
        <Route path="/MasterService" element={
          <ProtectedRoute allowedRoles={['Master']}>
            <MasterService />
          </ProtectedRoute>
        } />

        <Route path="/WorkerService" element={
          <ProtectedRoute allowedRoles={['Worker']}>
            <WorkerService />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
