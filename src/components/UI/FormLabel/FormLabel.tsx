import React, {FC} from 'react';
import {Text, View} from "react-native";
import {globalStyles} from "../../../constants/globalStyles";
import {capitalizeFirstLetter} from "../../../utils/text";

const FormLabel:FC<{text:string}> = ({text}) => {
    return (
        <View style={{marginTop:20}}>
            <Text style={globalStyles.formFieldLabel}>{capitalizeFirstLetter(text)}</Text>
        </View>
    )
}

export default FormLabel;
