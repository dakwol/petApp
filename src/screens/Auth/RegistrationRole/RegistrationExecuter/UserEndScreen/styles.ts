import { StyleSheet } from "react-native";
import { colors } from "../../../../../constants/Colors";
import { SCREEN_WIDTH } from "../../../../../constants/globalStyles";

const styles = StyleSheet.create({
    containerSwitch: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: SCREEN_WIDTH - 70
    },
    icon: {
        marginRight: 10,
        height: 20,
        width: 20,
        resizeMode: "contain",
        alignSelf: "center"
    },
    textSwitch: {
        fontSize: 16,
        color: colors.zcBrown,

    }
});

export default styles;