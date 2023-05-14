import { showMessage } from "react-native-flash-message";
import { translate } from "./translate";
import { colors } from "../constants/Colors";
import { View } from "react-native";
import styles from "../screens/Home/styles";
import { inherits } from "@babel/types";

interface IErrorMessageProps {
    message: string,
    type?: string,
}

export const errorMessage = ({
    message = translate('errors.unknownError'),
    type
}: IErrorMessageProps) => {
    showMessage({
        message: message + "\n\n" + "OK",
        position: "center",
        type: "default",
        backgroundColor: "none",

        color: colors.cedar,
        style: { width: '100%', height: '100%', justifyContent: "center", alignItems: "center", flex: 1, position: 'absolute'},
        titleStyle: { textAlign: "center", fontWeight: "500", fontSize: 16, backgroundColor: colors.lightGray, paddingVertical: 20, width: 250, borderRadius: 8 },
        autoHide: false,
        hideOnPress: true
    });
}
