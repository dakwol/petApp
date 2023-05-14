import { StyleSheet } from "react-native";
import { colors } from "../../../../../constants/Colors";
import { SCREEN_WIDTH } from "../../../../../constants/globalStyles";

const styles = StyleSheet.create({
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
        width: SCREEN_WIDTH - 50
    },
    specItem: {
        color: colors.greenPH
    },
    specItemContainer: {
        alignSelf: "center",
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderWidth: 2,
        backgroundColor: 'rgba(138, 196, 58, 0.15)',
        borderRadius: 20,
        borderColor: colors.greenPH,
    }
});

export default styles;