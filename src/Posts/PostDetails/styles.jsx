import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    margin: "20px",
    borderRadius: "15px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    "@media (max-width: 768px)": {
      flexDirection: "column-reverse",
    },
  },
  textsection: {
    width: "50%",
    paddingRight: "20px",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  imgSection: {
    width: "50%",
    "@media (max-width: 768px)": {
      width: "100%",
      marginBottom: "20px",
    },
  },
  img: {
    width: "100%",
    borderRadius: "15px",
  },
  divider: {
    margin: "15px 0px",
  },
  dark: {
    fontWeight: "500",
  },
  message: {
    marginTop: "10px",
  },
  recommendedSection: {
    padding: "20px 20px 20px",
  },
  postSection: {
    "@media (max-width: 766px)": {
      flexDirection: "column",
    },
  },
  cards: {
    padding: "15px",
    cursor: "pointer",
  },
  recommendedImg: {
    marginTop: "15px",
    "@media (max-width: 766px)": {
      width: "100%",
    },
  },
  para: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": "5",
    "-webkit-box-orient": "vertical",
    minHeight: "101px",
  },
  //   commentSection: {
  //     display: "flex",
  //     justifyContent: "space-between",
  //     alignItems: "start",
  //   },
  scrollSection: {
    maxHeight: "200px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "3px",
    },
    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "rgb(202, 202, 202)",
      borderRadius: "20px",
    },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
      background: "rgb(143, 143, 143)",
    },
  },
  btnComment: {
    marginTop: "10px",
  },
  names: {
    fontWeight: "600",
  },
  commentsPara: {
    marginLeft: "45px",
    marginTop: "-15px",
  },
  commentCont: {
    marginBottom: "0px",
  },
  commentField: {
    marginTop: "20px",
  },
  btnDelete: {
    color: "gray",
    fontSize: "13px",
    cursor: "pointer",
    padding: "0px",
    marginTop: "5px",
    border: "1px solid transparent",
  },
  toolbar: {
    padding: "0px",
  },
  avatar: {
    width: "30px",
    height: "30px",
    fontSize: "16px",
    marginRight: "15px",
  },
}));
