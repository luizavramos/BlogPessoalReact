import React from 'react';
import Navbar from './components/estaticos/navbar/Navbar'
import Footer from './components/estaticos/footer/Footer'
import Home from './paginas/home/Home';
import './App.css';
import Login from './paginas/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router >
      <Navbar />
      {/* <div style={{minHeight: '100vh'}}>
      </div> */}

        <Routes>
          
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />

        </Routes>
     
      <Footer />
     
    </Router>
  );
}

export default App;
