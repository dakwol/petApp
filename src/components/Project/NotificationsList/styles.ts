import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";

const styles = StyleSheet.create({
    flatItem: {
        margin: 10,
    },
    listContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    titleText: {
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#6F7565',
        marginLeft: 5,
        fontWeight: "bold"
    },
    bodyText: {
        fontFamily: 'Inter',
        fontSize: 12,
        color: '#6F7565',
        marginLeft: 5,
        fontWeight: "bold"
    },
    titleReadText: {
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#6F7565',
        marginLeft: 5
    },
    bodyReadText: {
        fontFamily: 'Inter',
        fontSize: 12,
        color: '#6F7565',
        marginLeft: 5
    }
});

export default styles;
