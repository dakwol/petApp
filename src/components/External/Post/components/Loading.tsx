import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/dimensions";
import {colors} from "../../../../constants/Colors";
import { translate } from "../../../../utils/translate";


type Props = {
    color?: string
}

const Loading: React.FC<Props> = ({ color }) => (
    <View style={styles.container}>
        <ActivityIndicator animating={true} color={color ?? colors.zcBrown} size="large" />
        <Text style={{color: colors.white}}>{translate("loading.loadingMedia")}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        zIndex: 999,
        position: "absolute",
        left: 0,
        top: 0,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.3)",
    },
});

export default Loading;
