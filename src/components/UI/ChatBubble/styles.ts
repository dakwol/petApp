import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    message: {
        flexDirection: 'row',
        marginVertical: 2,
    },
    notMine: {
        marginLeft: 20,
    },
    mine: {
        alignSelf: 'flex-end',
        marginRight: 20
    },
    cloud: {
        maxWidth: 250,
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 7,
        borderRadius: 20
    },
    text: {
        paddingTop: 3,
        fontSize: 14,
        lineHeight: 18,
    },
    text_dt: {
        paddingTop: 3,
        fontSize: 10,
        lineHeight: 12,
    },
    dt_text_right: {
        alignSelf: 'flex-end',
    },
    dt_text_left: {
        alignSelf: 'flex-start',
    },
    arrow_container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        flex: 1
    },
    arrow_left_container: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    arrow_right_container: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    arrow_left: {
        left: -6,
    },
    arrow_right: {
        right: -6
    }

});

export default styles;
