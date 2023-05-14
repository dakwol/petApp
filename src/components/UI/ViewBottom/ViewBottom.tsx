import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, View} from "react-native";
import { SCREEN_HEIGHT } from '../../../constants/globalStyles';
import {styles} from "./styles";

interface IViewBottom {
    marginBottom?:number,
}

const ViewBottom: FC<PropsWithChildren<IViewBottom>> = ({marginBottom= 36, ...props}) => {
    const combineStyles = StyleSheet.flatten([styles.container, {marginBottom: marginBottom}]);

    return (
        <View style={[combineStyles]}>
            {props.children}
        </View>
    );
};

export default ViewBottom;
