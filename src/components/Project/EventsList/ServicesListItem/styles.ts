import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from "../../../../constants/globalStyles";
import { colors } from "../../../../constants/Colors";
import { fonts } from "../../../../constants/fonts";


const EventItemWidth = (SCREEN_WIDTH - 40);

const styles = StyleSheet.create({
    container: {
        width: EventItemWidth,
        borderBottomColor: colors.greenPH,
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingVertical: 13
    },
    row: {
    },
    containerPreviewImg: {
        width: 65,
        height: 65,
        marginRight: 20
    },
    eventImg: {
        width: 65,
        height: 65,
        resizeMode: 'contain'
    },
    contentEvent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    topicText: {
        fontWeight: 'bold',
        fontSize: 15
    },
    starFull: {
        color: colors.greenPH,
        marginRight: 3
    },
    textBold: {
        fontWeight: 'bold'
    }
});

export default styles;
