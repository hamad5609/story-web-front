import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    paper: {
        margin: "20px",
        borderRadius: "15px"
    },
    card: {
        display: 'flex',
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
        margin: "15px 0px"
    },
    dark: {
        fontWeight: "500",
    },
    message: {
        marginTop: "10px",
    }
}));
