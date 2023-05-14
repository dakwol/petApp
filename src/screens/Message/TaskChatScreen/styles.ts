import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";

export const styles = StyleSheet.create({
    cardTaskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    circle: {
        width: 8,
        height: 8,
        backgroundColor: colors.greenPH,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginLeft: 3
    },
    passwordCheck: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: colors.greenPH,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 12,
        borderWidth: 1,
        width: 160,
        paddingVertical: 5,
        marginVertical: 15
    }
})

export default styles;
