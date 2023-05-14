import React, { FC } from 'react'
import { FlatList } from 'react-native'
import RekvListItem from './RekvListItem/RekvListItem';

interface IRekv {
    rekv: any;
}

 const RekvList:FC<IRekv> = ({rekv}:any) => {

    const renderItem = ({item}:any) => (
      <RekvListItem item={item}/>
    );
  return (
    <FlatList 
        data={rekv.split(',')} 
        renderItem={renderItem}                                        
    />
  )
}

export default RekvList;