import { TouchableOpacity } from '@gorhom/bottom-sheet'
import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'


interface IRewiewsListItem {
    services: any
}

const ServicesListItem: FC<IRewiewsListItem> = ({services}) => {
  return (
    <TouchableOpacity style={{flexDirection: 'row'}}>
        <View>
            <Text style={{fontWeight: 'bold'}}>{services.name} от {services.price}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ServicesListItem