import React from "react";
import Home from "./Home/home";
import useStyles from './styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from "./Auth/auth";

function App() {
  const styles = useStyles();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} exact path='/' />
          <Route element={<Auth />} exact path='/auth' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
