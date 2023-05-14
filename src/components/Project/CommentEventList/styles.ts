import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#8AC43A",
    },
    messages: {
        height: "90%",
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    searchContainer: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchbar: {
        backgroundColor: "#F5F5F5",
        width: "90%",
        borderRadius: 100,
        flex: 1,
        flexDirection: 'row'
    },

    messagesContainer: {
        flex: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    messageObject: {
        marginTop: 0,
        height: 65,
        width: "90%",
        flexDirection: 'row',
        borderWidth: 1,
        borderBottomColor: "#8AC43A",
        justifyContent: 'space-between',
        alignItems: "center",
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        paddingBottom: 0,
    },
    messageImage: {
        height: "100%",
        width: "20%",
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    messageObjectText: {
        width: "30%",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: -30
    },
    messageImageIcon: {
        width: 50,
        height: 50,
        borderRadius: 7
    },
    userImage: {
        width: "10%"
    },
    messageImageUser: {
        marginLeft: -30,
        width: 30,
        height: 30
    },
    dateContainer: {
        justifyContent: 'flex-start',
    }
})
