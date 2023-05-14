import { StyleSheet } from 'react-native';
import { colors } from "../../../constants/Colors";
import { SCREEN_WIDTH } from "../../../constants/globalStyles";

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        height: 48,
        borderRadius: 41,
        paddingLeft: 19,
        paddingRight: 16,
        flex: 1,
        justifyContent: 'space-around',
        marginBottom: 30,
        width: '100%'
    },
    tabActive: {
        //width: SCREEN_WIDTH * 0.8,
        height: 24,
        borderRadius: 64,
        justifyContent: 'center',
        borderColor: colors.greenPH,
        borderWidth: 1,
        backgroundColor: colors.greenPH,
        flex: 1 / 4.3
    },
    tab: {
        //width: SCREEN_WIDTH * 0.8,
        height: 24,
        borderRadius: 64,
        backgroundColor: colors.white,
        justifyContent: 'center',
        borderColor: colors.greenPH,
        borderWidth: 1,
        flex: 1 / 4.3
    },
    tabTextActive: {
        color: colors.white,
        fontSize: 12,
        alignSelf: 'center',
        fontFamily: 'Inter-Bold',
    },
    tabText: {
        color: colors.zcBrown,
        fontSize: 12,
        alignSelf: 'center',
        fontFamily: 'Inter-Bold',
    },

});

export default styles;
