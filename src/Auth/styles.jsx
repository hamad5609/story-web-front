import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: "30px 20px",
  },
  form: {
    padding: "30px 0px 0px",
  },
  heading: {
    textAlign: "center",
  },
  btn: {
    marginTop: "20px",
  },
  icon: {
    margin: "auto",
    background: "#303f9f",
    marginBottom: "20px",
  },
  switchText: {
    marginTop: "20px",
    cursor: "pointer",
    transition: ".3s",
    "&:hover": {
      color: "#303f9f",
    },
  },
}));
