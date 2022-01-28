import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  AppBar,
  Grow,
  Button,
  Avatar,
  Toolbar,
} from "@material-ui/core";
import logo from "../assets/images/logo.png";
import Posts from "../Posts/Posts";
import Form from "../Form/form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts } from "../Redux/actions/post";
import { useLocation, useNavigate, Link } from "react-router-dom";
import decode from "jwt-decode";

const Home = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const styles = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const [user, setUser] = useState(null);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    history("/");
  };
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
    setUser(JSON.parse(localStorage.getItem("UserProfile")));
  }, [location]);
  return (
    <div>
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
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
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
      <Container maxWidth="lg">
        <Grow in>
          <Container>
            <Grid container spacing={3} className={styles.formSection}>
              <Grid item sm={12} md={7}>
                <Posts currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
              <Grid item sm={12} md={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
};

export default Home;
