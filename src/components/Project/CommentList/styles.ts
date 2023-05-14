import {Platform, StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageViewer: {
        flex: 10,
        width: "90%"
    },
    messageHeader: {
        flex: 1,
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    messageImage: {
        height: "100%",
        width: "20%",
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    messageImageIcon: {
        width: 50,
        height: 50,
        borderRadius: 7
    },
    messageBody: {
        flex: 8,
        width: "100%",
        marginTop:20
    },
    messageImageUser: {
        width: 30,
        height: 30
    },
    messageSender: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop:5,
    },
    messageReceiver: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop:5,
    },
    messageText: {
        fontSize: 10,
        color: "#392413",
        marginLeft: 9,
        marginRight: 9,
        lineHeight: 12
    },
    messageTime: {
        fontSize: 10,
        color: "#392413",
        lineHeight: 12,
        opacity: 0.6
    },
    sendMessageContainer: {
        flex: 1,
        width: "90%",
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: "#8AC43A",
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent'
    },
    textinputStyle: {

        fontSize: 14,
        color: "#392413",
        opacity: 0.6,
        fontWeight: 'bold',
        height: "100%",
        width: "80%",
        borderWidth: 0,
        //outline: "none"
        ...Platform.select({
            web: {
                outlineStyle: 'none',
            }
        })


    },
})
