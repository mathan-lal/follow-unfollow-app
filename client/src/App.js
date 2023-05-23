import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup';
import Header from './components/Header.jsx'
import {Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Followers from './components/Followers';
import Following from './components/Following';

function App() {
  return (
    <div className='main-body'>
    <Header/>
    
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />


        </Routes>
     
    </div>
    );
}

export default App;
