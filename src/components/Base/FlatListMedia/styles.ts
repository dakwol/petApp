import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/Colors';
import { SCREEN_WIDTH } from '../../../constants/globalStyles';

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    listContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'scroll'
    },
    itemContainer: {
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
    containerPreviewImg: {
        width: SCREEN_WIDTH - 20,
        //flex: 1,
        //height: '100%',
        //width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        position: 'relative',
        alignItems: 'center',
    },
    backVideo: {
        width: SCREEN_WIDTH - 20,
        height: "80%",
        backgroundColor: 'black',
        borderRadius: 8,

    }
});

export default styles;
