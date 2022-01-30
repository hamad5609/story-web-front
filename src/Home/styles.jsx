import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  appBar: {
    // borderRadius: 15,
    margin: "0px 0 30px",
    padding: "20px 15px",
    display: "flex",
    alignItems: "center",
  },
  formSection: {
    justifyContent: "space-between",
  },
  heading: {
    // color: "rgba(0,183,255, 1)",
    fontFamily: "Bebas Neue",
    // fontWeight: "700",
    fontSize: "35px",
  },
  image: {
    marginRight: "15px",
  },
  flexLogo: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "black",
    textTransform: "uppercase",
    marginRight: "15px",
    transition: ".3s",
    "&:hover": {
      color: "#c51162",
      borderBottom: "1px solid #c51162",
    },
  },
  avatar: {
    marginRight: "15px",
  },
  ChipInput: {
    margin: "15px 0px",
  },
}));
