import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  main: {
    padding: "15px 0px 0px !important",
  },
  paper: {
    padding: theme.spacing(1),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "95%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
    margin: "0px 8px 10px",
  },
  btnClear: {
    margin: "0px 8px 0px",
  },
}));
