import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/Colors";
import { SCREEN_WIDTH } from "../../../../constants/globalStyles";

const styles = StyleSheet.create({
    titleTask: {
        fontWeight: "bold",
        fontSize: 18,
        color: colors.black,
        marginBottom: 20
    },
    input: {
        height: 50,
        fontSize: 16,
        marginTop: 5,
        paddingHorizontal: 10,
    },

    textInput: {
        minHeight: 50,
        maxHeight: 100,
        borderColor: colors.greenPH,
        marginTop: 10,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingHorizontal: 10,
        width: SCREEN_WIDTH - 50,
    },
    specItem: {
        borderWidth: 2,
        backgroundColor: 'rgba(138, 196, 58, 0.15)',
        borderColor: colors.greenPH,
        paddingHorizontal: 10,
        paddingVertical: 3,
        color: colors.greenPH,
        marginTop: 5,
        marginRight: 5,
        borderRadius: 50,
        overflow: "hidden"
    }
});


export default styles;
