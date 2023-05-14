import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";

const styles = StyleSheet.create({
    titleTask: {
        fontWeight: "bold",
        fontSize: 20,
        color: colors.black
    },
    input: {
        height: 50,
        fontSize: 16,
        marginTop: 5,
        paddingHorizontal: 10,
    },
});

export default styles;
