import {StyleSheet} from "react-native";
import {SCREEN_HEIGHT} from "../../../constants/globalStyles";
import {colors} from "../../../constants/Colors";

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 0,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalUp: {
        margin: 0,
        height: SCREEN_HEIGHT - 200,
        justifyContent:'flex-end',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },
    modalHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
    },
    modalUpContainer: {
        backgroundColor: colors.white,
        paddingBottom: 30,
        paddingHorizontal: 0,
    },
    toggleBar: {
        backgroundColor: colors.greenPH,
        width: 40,
        height: 5,
        borderRadius: 3,
        marginVertical: 5,
        alignSelf: 'center',
    },
});
