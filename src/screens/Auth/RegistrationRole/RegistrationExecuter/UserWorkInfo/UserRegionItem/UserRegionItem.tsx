import CheckBox from '@react-native-community/checkbox'
import React, { FC, useState } from 'react'
import { Platform, Text, View } from 'react-native'
import { colors } from '../../../../../../constants/Colors'

interface IProps {
    item:any,
    clickItem: (item:any)=>void;
}


const UserRegionItem:FC<IProps> = ({item, clickItem}) => {

    const [checkBox, setCheckBox] = useState<boolean>(false)

    return (
        <View style={{flexDirection: "row", alignItems: "center"}}>
            {Platform.OS === 'ios' ? (
                <CheckBox
                    boxType="square"
                    value={checkBox}
                    onChange={() =>  [ clickItem(item), setCheckBox(!checkBox)]}
                    onCheckColor={colors.greenPH}
                    onAnimationType={'fill'}
                    style={{transform: [{scale: .8}]}}
                />
                ) : (
                <CheckBox
                    value={checkBox}
                    onValueChange={()=> [ clickItem(item), setCheckBox(!checkBox)]}
                    tintColors={{true: colors.greenPH}}
                />
            )}
            <Text>{item.name}</Text>
        </View>
    )
}

export default UserRegionItem;