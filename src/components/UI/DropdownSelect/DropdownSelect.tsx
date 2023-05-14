import React, {FC} from 'react';
import {Image, StyleSheet, View} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import {colors} from "../../../constants/Colors";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../constants/images";
import {globalStyles} from '../../../constants/globalStyles';

interface IDropdownSelectItem {
    id?: number,
    label: string,
    value?: number
}

interface IDropdownSelectProps {
    data: IDropdownSelectItem[],
    onSelect: (item:{label:string, value: any, id?: any}) => void,
    defaultValue?: number,
    defaultValueByIndex?: number,
    placeholder: string,
    err?: boolean,
    textStyle?:any,

}
const DropdownSelect:FC<IDropdownSelectProps> = ({
                                                     data = [],
                                                     defaultValue,
                                                     defaultValueByIndex,
                                                     onSelect = (value: number) => {
                                                     },
                                                     placeholder,
                                                     err = false,
                                                     textStyle = undefined
                                                 }) =>
{
    if(defaultValue !== undefined && defaultValueByIndex == undefined) {
        defaultValueByIndex = data.findIndex(item => item.id === defaultValue || item.value === defaultValue);
    }

    const buttonTextStyleObject = {...{textAlign: "left", paddingLeft:0, marginLeft: -5},...textStyle};

    return (
        <View style={err? globalStyles.errorInput : {borderWidth: 0}}>
            <SelectDropdown
                data={data}
                defaultButtonText={placeholder}
                defaultValueByIndex={defaultValueByIndex}
                onSelect={ (value) => { onSelect(value) } }
                statusBarTranslucent={false}
                buttonTextAfterSelection={(item, index) => { return item.label }}
                rowTextForSelection={(item, index) => { return item.label }}

                buttonStyle={{
                    width:"100%",
                    backgroundColor: '#00000000',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.greenPH,
                    paddingLeft:0,
                    marginLeft:0,
                    paddingBottom:0

                }}
                buttonTextStyle={buttonTextStyleObject}

                dropdownStyle={{backgroundColor: '#FFF'}}
                rowStyle={{borderWidth:0,borderBottomWidth:0}}
                rowTextStyle={{borderWidth:0}}
                renderDropdownIcon={ isOpened => <Image style={{width:20, height:20}} source={ isOpened ? Icons.arrowUp:Icons.arrowDown}/>}
                dropdownIconPosition={"right"}
            />
        </View>
    );
};

export default DropdownSelect;
