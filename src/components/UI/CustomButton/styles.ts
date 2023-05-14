import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/globalStyles';

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.12,
        borderRadius: 8,
        backgroundColor: colors.greenPH,
        justifyContent: 'center'
    },
    text: {
        color: colors.white,
        fontSize: 16,
        alignSelf: 'center',
        fontFamily: 'Inter-Bold',
    },
});
export default styles;
