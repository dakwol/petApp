import { Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, FC, useCallback, useEffect, useRef, useState } from 'react'
import { translate } from '../../../../utils/translate';
import styles from './styles';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { colors } from '../../../../constants/Colors';
import Input from '../../../UI/Input/Input';
import { SCREEN_WIDTH } from '../../../../constants/globalStyles';

interface ITaskFormProps {
    taskPriceBack:any,
    isPriceFrom:any,
    isPriceTo:any,
}


const TaskFormPrice :FC<ITaskFormProps> = ({
                                          taskPriceBack,
                                          isPriceFrom,
                                          isPriceTo
                                          }) => {

    
    const [priceFrom, setPriceFrom] = useState<string>('');
    const [priceTo, setPriceTo] = useState<string>('');
    isPriceFrom(priceFrom);
    isPriceTo(priceTo);


    useEffect(()=>{
      if(taskPriceBack.price_from != undefined) {
        setPriceFrom(taskPriceBack.price_from);
        setPriceTo(taskPriceBack.price_to);
      }
   },[])


  return (
      <View style={styles.container}>
        <Text style={styles.titleTask}>{translate('task.newTaskPrice')}</Text>
        <Text>{translate('task.newTaskPriceSubtitle')}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 20,}}>
            <View style={{width: 150, overflow: 'hidden', marginRight: 10}}>
                <Input valueText={priceFrom} onChange={(value:string)=>{setPriceFrom(value)}} placeHolderText={'От'} keyboardType="number-pad"></Input>
            </View>
            <View style={{width: 150, overflow: 'hidden'}}>
                <Input valueText={priceTo} onChange={(value:string)=>{setPriceTo(value)}} placeHolderText={'До'} keyboardType="number-pad"></Input>
            </View>
        </View>

      </View>
    )
  }

export default TaskFormPrice;