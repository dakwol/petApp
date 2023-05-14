import {StyleSheet} from "react-native";
import {SCREEN_WIDTH} from "../../../constants/globalStyles";

const styles = StyleSheet.create({
    container: {
        height: 81,
    },
    listContainer: {
        paddingHorizontal: 0,
    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: (SCREEN_WIDTH - 50) / 5,
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontFamily: 'Inter',
        fontSize: 12,
        color: '#6F7565',
    },
});

export default styles;
