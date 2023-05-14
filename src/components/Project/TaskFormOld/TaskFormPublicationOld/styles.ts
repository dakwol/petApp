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
        borderWidth: 2,
        backgroundColor: 'rgba(138, 196, 58, 0.15)',
        borderRadius: 20,
        borderColor: colors.greenPH,
        paddingHorizontal: 10,
        paddingVertical: 3,
        color: colors.greenPH
    },
    containerMain: {
        flex: 1,
        backgroundColor: colors.white,
    },
    mapSection: {
        height: 200,
        opacity: 1
    },
    container: {
        width: SCREEN_WIDTH - 50
    },
    formContainer: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    fieldLine: {
        borderBottomColor: colors.greenPH,
        borderBottomWidth: 1,
    },
    input: {
        height: 50,
        fontSize: 16,
        marginTop: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.greenPH,
    },
    halfInput: {
        width: '48%',
    },

    bigInput: {
        height: 50,
        borderColor: colors.greenPH,
        borderWidth: 0.5,
        marginTop: 33,
        textAlign: 'center',
    },
    textInputsRow: {
        flexDirection: 'row',
        marginHorizontal: 0,
        justifyContent: "space-between",
        marginTop: 1,
    },
    image: {
        height: 79,
        width: 102,
        alignSelf: 'center',
        marginTop: 30,
    },
    submitButton: {
        marginTop: 15,
    },
    dropdown: {
        borderColor: colors.greenPH,
        borderRadius: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        paddingHorizontal: 0,
        paddingTop: 15,
        marginTop: 0,
    },
    dropdownContainer: {
        borderRadius: 0,
        borderTopWidth: 0,
        borderColor: colors.greenPH,
        zIndex: 9999
    },
    iconDown: {
        height: 6,
        width: 12,
        margin: 2,
    },
    dropdownText: {
        color: colors.cedar,
        opacity: 0.5,
        flex: 1,
        fontSize: 16,
    },
    btn: {
        backgroundColor: colors.greenPH,
        paddingVertical: 7,
        borderRadius: 10,
        paddingHorizontal: 5,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 5
    }
});


export default styles;
