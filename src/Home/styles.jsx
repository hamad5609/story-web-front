import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  mobileContainer: {
    "@media (max-width: 340px)": {
      paddingLeft: "6px !important",
      paddingRight: "6px !important",
    },
  },
  appBar: {
    // borderRadius: 15,
    margin: "0px 0 30px",
    padding: "20px 15px",
    display: "flex",
    alignItems: "center",
  },
  formSection: {
    justifyContent: "space-between",
    "@media (max-width: 960px)": {
      flexDirection: "column-reverse",
    },
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
  addBtn: {
    padding: "0px",
    marginBottom: "16px",
    fontSize: "16px",
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  },
  plusIcon: {
    fontSize: "28px",
    marginRight: "10px",
    minHeight: "40px",
    lineHeight: "40px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
