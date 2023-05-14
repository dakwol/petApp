import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/Colors";

const styles = StyleSheet.create({
    codeFieldRoot: { marginVertical: 20 },
    cell: {
        width: 40,
        height: 60,
        fontSize: 24,
        borderWidth: 1,
        borderColor: colors.greenPH,
        textAlign: 'center',
        textAlignVertical: "center",
        borderRadius: 5,
        marginHorizontal: 10
    },
    focusCell: {
        borderColor: colors.brown,
    },
    descriptionMsg: {
        width: SCREEN_WIDTH * 0.8,
        marginBottom: 15,
        marginTop: 15
    },
    descriptionMsgText: {
        color: colors.cedar,
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        textAlign: 'center',
    },
    textLink: {
        color: colors.greenPH,
    },
});

export default styles;
