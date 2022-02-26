import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  ZoomCont: {
    maxWidth: "550px",
    width: "90%",
    margin: "auto",
    textAlign: "end",
    outline: "none",
    "&:focus": {
      outline: "none",
    },
  },
  paper: {
    // padding: theme.spacing(1),
    maxWidth: "500px",
    width: "90%",
    margin: "auto",
    textAlign: "right",
    outline: "none",
  },
  notSigned: {
    padding: "0px 0px 30px",
  },
  main: {
    padding: "15px 0px 0px !important",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "0px 15px 25px",
  },
  heading: {
    marginBottom: "15px",
    fontSize: "25px",
    fontWeight: "500",
  },
  fileInput: {
    width: "95%",
    margin: "10px 0",
    textAlign: "left",
  },
  buttonSubmit: {
    marginBottom: 10,
    margin: "0px 8px 10px",
  },
  btnClear: {
    margin: "0px 8px 0px",
  },
  redHead: {
    color: "green",
    marginBottom: "20px",
  },
  notSignedPara: {
    padding: "0px 30px 30px",
  },
}));
