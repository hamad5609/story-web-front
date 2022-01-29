import React, { useEffect, useState } from "react";
import useStyles from "./styles.js";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Typography, AppBar, Button, Avatar, Toolbar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import logo from "../assets/images/logo.png";
import decode from "jwt-decode";

const Navbar = (props) => {
  const [user, setUser] = useState(null);
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    history("/");
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
    setUser(JSON.parse(localStorage.getItem("UserProfile")));
  }, [location]);
  return (
    <AppBar className={styles.appBar} position="sticky" color="inherit">
      <div className={styles.flexLogo}>
        <img
          className={styles.image}
          src={logo}
          alt="logo website"
          height="60"
        />
        <Typography className={styles.heading} variant="h5" align="center">
          STORY WEB
        </Typography>
      </div>
      <div className={styles.flexLogo}>
        <Toolbar className={styles.navlinks}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/about" className={styles.link}>
            About Us
          </Link>
          {user ? (
            <Toolbar>
              <Avatar
                className={styles.avatar}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography variant="h6">{user.result.name}</Typography>
            </Toolbar>
          ) : (
            ""
          )}
        </Toolbar>
        {user ? (
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/auth"
          >
            Sign In
          </Button>
        )}
      </div>
    </AppBar>
  );
};

export default Navbar;
