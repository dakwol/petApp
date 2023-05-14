import { Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, FC, useCallback, useEffect, useRef, useState } from 'react'
import { translate } from '../../../../utils/translate';
import styles from './styles';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { colors } from '../../../../constants/Colors';
import Input from '../../../UI/Input/Input';
import { SCREEN_WIDTH } from '../../../../constants/globalStyles';
import { ITaskInfo } from '../TaskForm';

interface ITaskFormProps {
  taskInfo:ITaskInfo,
  onTaskInfoChange: (e:any) => void,   
}


const TaskFormPrice :FC<ITaskFormProps> = ({
                                            taskInfo,
                                            onTaskInfoChange,
                                          }) => {

    
    const [price, setPrice] = useState<any>({
      price_from: taskInfo.price_from == null? '' : taskInfo.price_from, 
      price_to: taskInfo.price_to == null? '' : taskInfo.price_to
    })

    
    const handleTextChanged = useCallback(
      (newText: any) => {
        setPrice(newText);
      },
      [onTaskInfoChange]
    );

    console.log(price)

  return (
      <View style={styles.container}>
        <Text style={styles.titleTask}>{translate('task.newTaskPrice')}</Text>
        <Text>{translate('task.newTaskPriceSubtitle')}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 20,}}>
            <View style={{width: 150, overflow: 'hidden', marginRight: 10}}>
                <Input valueText={taskInfo.price_from != undefined? taskInfo.price_from : price.price_from} onChange={(value:string)=>{handleTextChanged({price_from: value})}} placeHolderText={'От'} keyboardType="number-pad" onBlur={()=>{onTaskInfoChange({'price_from': price.price_from})}}></Input>
            </View>
            <View style={{width: 150, overflow: 'hidden'}}>
                <Input valueText={taskInfo.price_to != undefined? taskInfo.price_to : price.price_to} onChange={(value:string)=>{handleTextChanged({price_to: value})}} placeHolderText={'До'} keyboardType="number-pad" onBlur={()=>{onTaskInfoChange({'price_to': price.price_to})}}></Input>
            </View>
        </View>

      </View>
    )
  }

export default TaskFormPrice;