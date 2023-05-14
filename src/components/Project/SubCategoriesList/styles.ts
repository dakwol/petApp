import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../../constants/globalStyles';
import { colors } from "../../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        height: 30
    },
    containerHidden: {
        height: 0,
    },
    listContainer: {
        paddingHorizontal: 0,
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: "auto",
        paddingRight: 7,
        paddingLeft: 7,
        //width: (SCREEN_WIDTH - 50) / 5,
    },

    icon: {
        flex: 1,
        justifyContent: 'center',
    },
    iconContainer: {
        height: '100%',
        width: '100%',
    },
    itemContainerActive: {
        backgroundColor: colors.lightGray
    },
    itemText: {
        fontFamily: 'Inter',
        fontSize: 12,
        color: '#6F7565',
    },

});

export default styles;
