import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    profile: {
        //height: "100%",
        flex: 1,
        backgroundColor: "#FFFFFF",
        //shadowColor: "#000",
        alignItems: 'center',
        //shadowOffset: {
        //width: 0,
        //height: 5,
        //},
        //shadowOpacity: 0.34,
        //shadowRadius: 6.27,
        //elevation: 10,
        paddingBottom: 50
    },
    profileHeader: {
        width: "90%",
        flex: 3,
    },
    profileInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    profileSettingsContainer: {
        width: "100%",
        flex: 9
    },
    Username: {
        color: "#392413",
        fontSize: 16,
        lineHeight: 19,
        fontWeight: "700"
    },
    profileText: {
        color: "#392413",
        fontSize: 12,
        lineHeight: 15,
        opacity: 0.5,
        fontWeight: "500"
    },
    profileRegisterInfo: {
        fontSize: 12,
        fontWeight: "400",
        marginRight: 5
    },
    alignProfileInfo: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    alignProfileInfoNoRow: {
        marginTop: 4,
    },
    profileImage: {
        width: 100,
        height: 80,
        borderRadius: 8
    },
    profileBody: {
        width: "90%",
        flex: 9
    },
    bodySectionTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        color: "#392413",
        lineHeight: 27,
        fontWeight: "500"
    },
    sectionContainer: {
        flexDirection: 'row',
        marginTop: 0,
    },
    sectionObjectImage: {
        width: 75,
        height: 60,
        borderRadius: 20
    },
    sectionTextContainer: {
        width: "65%",
        marginLeft: 15
    },
    sectionText: {
        fontSize: 14,
        lineHeight: 17,
        fontWeight: "400"
    },
    messageButtonContainer: {
        width: "90%",
        alignItems: 'center',
        flex: 2
    },
    messageButton: {
        width: "60%",
        height: "45%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: "#8AC43A",
    },
    redactButton: {
        width: '60%',
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: "#8AC43A"
    },
    starFull: {
        color: "#8AC43A",
    },
    starEmpty: {

    },
    publishItem: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})
