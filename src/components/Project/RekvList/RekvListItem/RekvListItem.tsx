import React, { FC } from 'react'
import { Text, View } from 'react-native';
import { colors } from '../../../../constants/Colors';

interface IRekv {
    item: any;
}

 const RekvListItem:FC<IRekv> = ({item}:any) => {

  return (
    <View>
        <Text style={{fontSize: 12, color: colors.black}}>
            {item}
        </Text>
    </View>
  )
}

export default RekvListItem;