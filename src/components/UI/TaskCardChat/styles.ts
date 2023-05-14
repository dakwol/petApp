import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/Colors';
import { fonts } from '../../../constants/fonts';
import { SCREEN_WIDTH } from '../../../constants/globalStyles';

const styles = StyleSheet.create({
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
});
export default styles;