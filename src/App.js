import React, { useEffect } from "react";
import Home from "./Home/home";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Auth from "./Auth/auth";
import PostDetails from "./Posts/PostDetails/postDetails";
import { useSelector } from "react-redux";
// import Navbar from "./Navbar/navbar";


function App() {
  const { authData } = useSelector((state) => state.authReducer)
  let user = JSON.parse(localStorage.getItem('UserProfile'));
  useEffect(() => {
    user = JSON.parse(localStorage.getItem('UserProfile'))
  }, [authData])
  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes >
          <Route element={<Home />} exact path='/' />
          <Route element={<Home />} exact path='/post/search' />
          <Route element={<PostDetails />} path='/post/:id' />
          <Route element={!user ? <Auth /> : <Navigate to='/' />} exact path='/auth' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
