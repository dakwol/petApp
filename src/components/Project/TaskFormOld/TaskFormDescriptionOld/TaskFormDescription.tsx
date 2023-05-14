import { Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, FC, useCallback, useEffect, useState } from 'react'
import { translate } from '../../../../utils/translate';
import styles from './styles';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { colors } from '../../../../constants/Colors';
import Input from '../../../UI/Input/Input';
import { SCREEN_WIDTH } from '../../../../constants/globalStyles';

interface ITaskFormProps {
    userInfo?:any,
    isDescription:any,
}


const TaskFormDescription :FC<ITaskFormProps> = ({
                                            isDescription
                                          }) => {

    
    const [description, setDescription] = useState<string>('');
    isDescription(description);


  return (
      <View style={styles.container}>
        <Text style={styles.titleTask}>{translate('task.description')}</Text>
        <Text>{translate('task.descriptionSubtext')}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 20,}}>
            <View style={{marginRight: 10}}>
                <Input valueText={description} onChange={(value:string)=>{setDescription(value)}} placeHolderText={translate('registration.ur_description')}></Input>
            </View>
        </View>

      </View>
    )
  }

export default TaskFormDescription;