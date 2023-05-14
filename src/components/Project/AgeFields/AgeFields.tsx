import React, {FC} from 'react';
import {Text, TextInput, View} from "react-native";
import {colors} from "../../../constants/Colors";
import {capitalizeFirstLetter} from "../../../utils/text";
import {translate} from "../../../utils/translate";
import {Dictionary} from "../../../locales/dictionary";
import styles from "../PetForm/styles";
import {globalStyles} from "../../../constants/globalStyles";

interface IAgeFieldsProps {
    yearsValue: any,
    monthsValue: any,
    onYearsChange: (value:any) => void,
    onMonthsChange: (value:any) => void,
}

const AgeFields:FC<IAgeFieldsProps> = ({
                                           yearsValue = 0,
                                           monthsValue = 0,
                                           onYearsChange,
                                           onMonthsChange
}) => {

    return (
        <View style={{flex:1, flexDirection: "row", alignItems:"center", justifyContent: "space-between"}}>
            <View style={{marginLeft:5}}>
                <Text style={{fontSize: 16, color: colors.halfCedar}}>{capitalizeFirstLetter(translate(Dictionary.common.age))}</Text>
            </View>

            <View style={{flex:1,flexDirection: "row", alignItems:"center", justifyContent: "flex-end"}}>
                <TextInput
                    keyboardType='numeric'
                    value={yearsValue.toString()}
                    placeholder={capitalizeFirstLetter(translate(Dictionary.common.years))}
                    placeholderTextColor={colors.halfCedar}
                    style={[styles.input, {width:50, textAlign:"center"}]}
                    onChangeText={(data) => { onYearsChange(data) }}
                />
                <View style={{marginLeft:5}}><Text style={globalStyles.formFieldLabel}>{capitalizeFirstLetter(translate(Dictionary.common.years))}</Text></View>
            </View>

            <View style={{flex:1,flexDirection: "row", alignItems:"center", justifyContent: "flex-end"}}>
                <TextInput
                    keyboardType='numeric'
                    value={monthsValue.toString()}
                    placeholder={capitalizeFirstLetter(translate(Dictionary.common.months))}
                    placeholderTextColor={colors.halfCedar}
                    style={[styles.input, {width:50, textAlign:"center"}]}
                    onChangeText={(data) => { onMonthsChange(data) }}
                />
                <View style={{marginLeft:5}}><Text style={{fontSize: 16, color: colors.halfCedar}}>{capitalizeFirstLetter(translate(Dictionary.common.months))}</Text></View>
            </View>
        </View>
    );
};

export default AgeFields;
