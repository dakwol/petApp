import { Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, FC, useCallback, useEffect, useState } from 'react'
import { translate } from '../../../../utils/translate';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { colors } from '../../../../constants/Colors';
import Input from '../../../UI/Input/Input';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants/globalStyles';
import styles from './styles';
import { indexOf } from 'lodash';
import DropdownSelect from '../../../UI/DropdownSelect/DropdownSelect';
import { capitalizeFirstLetter } from '../../../../utils/text';
import { Dictionary } from '../../../../locales/dictionary';
import { ITaskInfo } from '../TaskForm';

interface ITaskFormProps {
    data:any,
    optionsInfo: ({option}: any) => void;
    slideSkip: ()=>void;
    inputText:any;
    taskInfo:ITaskInfo,
}


const TaskFormOptions :FC<ITaskFormProps> = ({
                                          data,
                                          optionsInfo,
                                          slideSkip,
                                          inputText,
                                          taskInfo
                                          }) => {

  const dataRaceDog = [
    {
      id: 1,
      label: 'Лабрадор'
    },
    {
      id: 2,
      label: 'Хаски'
    },
    {
      id: 3,
      label: 'Другая'
    },
  ]

  const dataRaceCat = [
    {
      id: 1,
      label: 'Сиамская'
    },
    {
      id: 2,
      label: 'Абиссинская'
    },
    {
      id: 3,
      label: 'Као мани'
    },
    {
      id: 4,
      label: 'Другая'
    },
  ]

  const [optionsDrop, setOptionsDrop] = useState()

  console.log('TTTT', inputText)
      
  return (
      <View style={[styles.container, {justifyContent: 'space-between', flexDirection: 'column', height: SCREEN_HEIGHT - 200}]}>
        <View>
          {data.item.input_text?
            <>
              <Text style={styles.titleTask}>{data.item.title}</Text>
              <Text>{data.item.hint}</Text>
      
              <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 20,}}>
                  <View style={{width: '100%'}}>
                      {/*@ts-ignore*/}
                      <Input valueText={taskInfo.options[data.index] != undefined && taskInfo.options[data.index].input_text_value} onChange={(value:string)=>{optionsInfo({id: data.item.id, input_text_value: value})}} placeHolderText={data.item.input_text_placeholder}></Input>
                  </View>
              </View>
            </>
            : 
            data.item.input_dropdown?
            <>
              <Text style={styles.titleTask}>{data.item.title}</Text>
              <Text>{data.item.hint}</Text>
      
              <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 20,}}>
                  <View style={{width: '100%'}}>
                  <DropdownSelect
                      data={data.item.input_dropdown_type == 1? dataRaceDog : dataRaceCat}
                      onSelect={(item:any) => {setOptionsDrop(item.id)}}
                      placeholder={capitalizeFirstLetter(translate(Dictionary.pet.racePet))}
                  />
                  </View>
              </View>
            </>
            :
            <></>
          }
        </View>
        {(inputText?.length == undefined || inputText?.length <= 1 ) && 
          <TouchableOpacity onPress={()=>slideSkip()} style={{alignSelf: 'center'}}>
            <Text>{translate('skip')}</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }

export default TaskFormOptions;