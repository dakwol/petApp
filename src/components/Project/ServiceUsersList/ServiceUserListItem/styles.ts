import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/Colors";
import { SCREEN_WIDTH } from "../../../../constants/globalStyles";

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH - 30,
        borderBottomColor: colors.greenPH,
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingVertical: 13
    },
    row: {
    },
    containerPreviewImg: {
        width: 65,
        height: 65,
        marginRight: 20
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        width: 190,
        color: colors.zcBrown
    },
    profilePrice: {
        fontSize: 14,
        color: colors.zcBrownOpacity6,
        fontWeight: "bold"
    },
    profileImg: {
        width: 45,
        height: 45,
        resizeMode: "contain",
        borderRadius: 5,
        marginRight: 18
    },
    eventImg: {
        width: 65,
        height: 65,
        resizeMode: 'contain',
        borderRadius: 5
    },
    contentEvent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    topicText: {
        fontWeight: 'bold',
        fontSize: 14
    },
    starFull: {
        color: colors.greenPH,
        marginRight: 3
    },
    textBold: {
        fontWeight: 'bold'
    }
});

export default styles;
