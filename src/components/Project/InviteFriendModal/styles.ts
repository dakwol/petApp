import {StyleSheet} from "react-native";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../constants/globalStyles";

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    modalView: {
        margin:5,
        backgroundColor: "white",
        borderRadius: 0,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalEntry: {
        fontWeight: "bold",
        padding: 20
    }
})
