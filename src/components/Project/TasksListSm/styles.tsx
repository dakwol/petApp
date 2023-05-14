import { StyleSheet } from "react-native";
import {colors} from "../../../constants/Colors";

const styles = StyleSheet.create({

    messagesContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 170
    },

    container: {
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 20,
        padding: 15,
        marginBottom: 10,
        backgroundColor: colors.white
    },
    containerShadow: {
        width: '100%',
        height: '50%',
        position: "absolute",
        bottom: 6,
        backgroundColor: colors.black,
        opacity: 0.05,
        borderRadius: 20
    },
    tkHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        width: 190,
        color: colors.zcBrown
    },
    editBtn: {
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },

    taskImg: {
        width: 45,
        height: 45,
        resizeMode: "contain",
        borderRadius: 5, 
        marginRight: 18
    },
    dateTask:{
        fontSize: 14,
        color: colors.zcBrownOpacity6,
        fontWeight: "bold"
    },
    badge: {
        width: 25, 
        height: 25, 
        backgroundColor: colors.red, 
        textAlign: "center", 
        textAlignVertical: "center",
        justifyContent: "center",
        alignItems: "center", 
        color: colors.white,
        borderRadius: 50,
        overflow: "hidden"
    }
});

export default styles;
