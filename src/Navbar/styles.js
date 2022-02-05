import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        // borderRadius: 15,
        margin: "0px 0 30px",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "row !important",
        justifyContent: "space-between",
        alignItems: "center",
    },
    heading: {
        // color: "rgba(0,183,255, 1)",
        fontFamily: "Bebas Neue",
        // fontWeight: "700",
        fontSize: "35px",
        '@media (max-width: 700px)': {
            display: "none",
        }
    },
    image: {
        marginRight: "15px",
    },
    flexLogo: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "black",
        "&:focus": {
            color: "black",
        },
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
    cursor: {
        "&:hover": {
            cursor: "pointer",
        }
    }
}));