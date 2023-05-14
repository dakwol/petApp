import { Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, FC, useCallback, useEffect, useRef, useState } from 'react'
import { translate } from '../../../../utils/translate';
import styles from './styles';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { colors } from '../../../../constants/Colors';

import CalendarPeriod from '../../../UI/Calendar/CalendarPeriod';
import { ITaskInfo } from '../TaskForm';

interface ITaskFormProps {
    taskInfo:ITaskInfo,
    onTaskInfoChange: (e:any)=>void,    
}


const TaskFormDate :FC<ITaskFormProps> = ({
                                            taskInfo, 
                                            onTaskInfoChange
                                        }) => {

    const [isDate, setIsDate] = useState<any>(new Date());
    
    const [dateComponent, setDateComponent] = useState("exact");

    const modifyActiveComponent = useCallback(
        newActiveComponent => {
            setDateComponent(newActiveComponent);
        },
        [setDateComponent]
    );    
    useEffect(()=>{
      taskInfo.date == null? setIsDate(isDate) : setIsDate({dateString: taskInfo.date})
    },[])


    LocaleConfig.locales['ru'] = {
        monthNames: [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь'
        ],
        monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
        dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        dayNamesShort: ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вc.'],
        today: "Aujourd'hui"
      };
      LocaleConfig.defaultLocale = 'ru';





  return (
      <View>
        <Text style={styles.titleTask}>{translate('task.newTaskDate')}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20}}>
            <TouchableOpacity style={(taskInfo.date_type == null? (dateComponent == 'exact') : (taskInfo.date_type == 'exact'))? styles.btn : [styles.btn, {backgroundColor: colors.white, borderWidth: 1, borderColor: colors.greenPH}]} onPress={()=>{modifyActiveComponent('exact'), setIsDate({dateString: undefined})}}>
                <Text style={(taskInfo.date_type == null? (dateComponent == 'exact') : (taskInfo.date_type == 'exact'))? {color: colors.white} : {color: colors.greenPH}}>{translate('task.newTaskDateButton')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(taskInfo.date_type == null? (dateComponent == 'interval') : (taskInfo.date_type == 'interval'))? styles.btn : [styles.btn, {backgroundColor: colors.white, borderWidth: 1, borderColor: colors.greenPH}]} onPress={()=>{modifyActiveComponent('interval'), setIsDate({dateString: undefined})}}>
                <Text style={(taskInfo.date_type == null? (dateComponent == 'interval') : (taskInfo.date_type == 'interval'))? {color: colors.white} : {color: colors.greenPH}}>{translate('task.newTaskDateButtonPeriod')}</Text>
            </TouchableOpacity>
        </View>

        <View style={{justifyContent: 'space-between'}}>
            {(taskInfo.date_type == null? (dateComponent == 'exact') : (taskInfo.date_type == 'exact'))?
                <Calendar
                    calendarWidth={320}
                    onDayPress={(day:any) => {
                        setIsDate(day)
                        onTaskInfoChange({'date_type': 'exact', 'date':day.dateString})
                    }}
                    onDayLongPress={(day:any) => {
                        setIsDate(day)
                        onTaskInfoChange({'date_type': 'exact', 'date':day.dateString})
                    }}
                    initialDate={isDate.dateString}
                    current={isDate.dateString}
                    theme={{
                        todayTextColor: colors.greenPH,
                        arrowColor: colors.greenPH,
                        selectedDayBackgroundColor: colors.greenPH
                    }}
                />
                :
                <CalendarPeriod datePeriod={(item:any)=>{onTaskInfoChange({'date_type': 'interval', 'date_interval_from': item.date_interval_from, 'date_interval_to': item.date_interval_to})}} taskInfo={taskInfo}/>
            }
        </View>
      </View>
    )
  }

export default TaskFormDate;