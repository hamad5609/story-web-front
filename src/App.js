import React from "react";
import Home from "./Home/home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from "./Auth/auth";
// import Navbar from "./Navbar/navbar";


function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route element={<Home />} exact path='/' />
          <Route element={<Auth />} exact path='/auth' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
