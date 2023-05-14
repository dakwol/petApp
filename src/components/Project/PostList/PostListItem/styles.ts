import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../constants/globalStyles";
import { colors } from "../../../../constants/Colors";
import { fonts } from "../../../../constants/fonts";


const EventItemWidth = (SCREEN_WIDTH - 20);
const EventItemHeight = SCREEN_HEIGHT / 4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 23,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: colors.greenWhite,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerPreviewImg: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        position: 'relative',
        alignItems: 'center',
    },
    eventImg: {
        flex: 1,
        width: '100%',
        height: SCREEN_HEIGHT * 0.55,
        borderRadius: 8,
    },
    contentEvent: {
        margin: 5,
    },
    topicTextContainer: {
        marginBottom: 12,
    },
    topicText: {
        marginTop: 7,
        fontSize: 16,
        fontFamily: fonts.Bold,
        lineHeight: 20,
        color: colors.greenPH,
        flex: 1,
    },
    favouriteIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    addressContainer: {
        marginBottom: 8,
    },
    iconLeft: {
        marginRight: 5,
        height: 16,
        width: 16,
    },
    detailText: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        lineHeight: 17.5,
        width: EventItemWidth - 34,
    },
    backVideo: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        borderRadius: 8,
    }
});

export default styles;
