import React from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Input from "./input";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../Redux/actions/auth";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

const Auth = (props) => {
  const styles = useStyles();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let googleclientId =
    "533608569605-nn5f2larv0rj77dj32gu5gnldqsmprsi.apps.googleusercontent.com";
  // let googleclientId = '533608569605-nn5f2larv0rj77dj32gu5gnldqsmprsi.apps.googleusercontent.com';

  const handleSwitchMode = () => setIsSignUp((preIsSignUp) => !preIsSignUp);

  const handleShowPassword = () =>
    setShowPassword((preShowPassword) => !preShowPassword);
  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("google login failed");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };
  return (
    <Container className={styles.container} maxWidth="xs">
      <Paper className={styles.paper}>
        <Avatar className={styles.icon}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" className={styles.heading}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  type="text"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  type="text"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
              </>
            )}
            <Input
              name="email"
              type="email"
              label="Email"
              handleChange={handleChange}
              autoFocus
            />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            color="primary"
            className={styles.btn}
            variant="contained"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="533608569605-nn5f2larv0rj77dj32gu5gnldqsmprsi.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                color="primary"
                variant="contained"
                fullWidth
                className={styles.btn}
              >
                Google Sign in
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
          />
          <Grid container>
            <Grid item>
              <Typography
                color="textSecondary"
                className={styles.switchText}
                onClick={handleSwitchMode}
              >
                {isSignUp
                  ? "Already have account want to sign in"
                  : "Not have an account"}
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
