import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: 'center'
    },
    mainReviewContainer: {
        width: "90%",
        flex: 1
    },
    reviewContainer: {
        flex: 15
    },
    returnContainer: {
        marginTop: 35,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    reviewCount: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 10,
        flex: 2
    },
    alignItems: {
        flexDirection: 'row'
    },
    alignStars: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        width: 100,
        height: 80,
        borderRadius: 8
    },
    alignProfileInfo: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 4,
    },
    profileText: {
        color:"#392413",
        fontSize: 12,
        lineHeight: 15,
        opacity: 0.5,
        fontWeight: "500"
    },
})
