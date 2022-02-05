import React, { useEffect } from "react";
import Home from "./Home/home";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Auth from "./Auth/auth";
import PostDetails from "./Posts/PostDetails/postDetails";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import useStyles from "./styles.js";
// import Navbar from "./Navbar/navbar";


function App() {
  const { authData } = useSelector((state) => state.authReducer);
  const { isLoading } = useSelector((state) => state.post)
  const styles = useStyles();
  let user = JSON.parse(localStorage.getItem('UserProfile'));
  useEffect(() => {
    user = JSON.parse(localStorage.getItem('UserProfile'))
  }, [authData])
  return (
    <div>
      {isLoading && <div className={styles.loader}>
        <CircularProgress className={styles.spinner} />
      </div>}

      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes >
          <Route element={<Home />} exact path='/' />
          {/* <Route element={<Home />} exact path='/' /> */}
          <Route element={<PostDetails />} path='/post/:id' />
          <Route element={!user ? <Auth /> : <Navigate to='/' />} exact path='/auth' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
