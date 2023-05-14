import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";

const styles = StyleSheet.create({
    listContainer: {
        display: 'flex',
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 12
    },
    itemText: {
        fontFamily: 'Inter',
        fontSize: 12,
        color: '#6F7565',
    },
    flatItem: {
        alignItems: "center",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        height: 120,
        justifyContent: 'space-between',
    },
    itemImage: {
        resizeMode: "cover",
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.greenPH
    },
    addButton: {
        position: 'absolute',
        bottom: -11,
        right: -11
    }
});

export default styles;
