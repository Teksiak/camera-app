import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#ea1e63",
        justifyContent: "center",
        alignItems: "center",
    },
    gallery: {
        flex: 1,
        backgroundColor: "#202020",
        alignItems: "center"
    },
    smallImage: {
        width: 75,
        height: 75,
        margin: 5,
    },
    wideImage: {
        width: 330,
        height: 100,
        marginBottom: 10
    },
    settings: {
        position: "absolute",
        bottom: -200,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: "90%",
        width: "50%",
    },
    defaultText: {
        color: "#F5EBFF",
    },
    secondaryText: {
        color: "#ea1e63",
    },
})

export default style