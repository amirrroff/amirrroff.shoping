import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    navbar: {
        color: "white",
        backgroundColor: "#203040",
        "& a":{
            color:"#ffffff",
            marginLeft: 10
        },
    },
    main :{
        minHeight: "80vh"
    },
    footer: {
        textAlign: "center",
        marginTop: 10,
    },
    brand:{
        fontWeight: "bold",
        fontSize:"1.5rem"
    },
    grow: {
        flexGrow:1
    },
    section : {
        marginTop:10,
        marginBottom:10
    },
    form: {
        maxWidth : 800,
        margin : "0 auto"
    },
    navbarButton: {
        color:"white",
        textTransform: "initial"
    }
})

export default useStyles