import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from "../../../../constants/globalStyles";
import { colors } from "../../../../constants/Colors";
import { fonts } from "../../../../constants/fonts";


const EventItemWidth = (SCREEN_WIDTH - 40) / 2;
const EventItemHeight = EventItemWidth * 1.55;

const styles = StyleSheet.create({
    container: {
        width: EventItemWidth,
        height: EventItemHeight,
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
        width: EventItemWidth,
        height: EventItemWidth - 3,
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
        height: 17,
        width: 17,
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
});

export default styles;
