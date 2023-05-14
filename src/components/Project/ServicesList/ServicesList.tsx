import React, { FC } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import ServicesListItem from './ServicesListItem/ServicesListItem';

interface IRewiewsList {
    services: any
}

const ServicesList: FC<IRewiewsList> = ({services}) => {

    console.log(services)

    const _renderItem = ({item, index}: {item: any; index: number}) => {
        return (
              <ServicesListItem
                services={item}
              />
        );
      };

  return (
    <View>
        <FlatList 
            data={services} 
            renderItem={_renderItem}
        />
    </View>
  )
}

export default ServicesList