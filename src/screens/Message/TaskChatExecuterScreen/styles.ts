import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";

export const styles = StyleSheet.create({
    cardTask: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 10,
        marginHorizontal: 5,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        elevation: 10,
        backgroundColor: 'white'
    },
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
