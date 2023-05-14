import {globalStyles} from "../../../constants/globalStyles";
import React, {FC, PropsWithChildren} from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, View} from "react-native";


interface IViewScreen {
    keyboardVerticalOffset?: number | undefined,
}

const ViewScreen:FC<PropsWithChildren<IViewScreen>> = ({
                                        keyboardVerticalOffset= 84,
                                        children,
                                        ...props}) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={{flex: 1}}
            contentContainerStyle={globalStyles.flexOne}>
            <SafeAreaView style={globalStyles.parentContainer}>
                <View style={globalStyles.backgroundContainer}>
                    <View style={globalStyles.screenContainer}>
                        {children}
                    </View>
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default ViewScreen;
