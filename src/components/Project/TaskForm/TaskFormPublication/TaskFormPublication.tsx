import { Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, FC, useCallback, useEffect, useState } from 'react'
import { getTranslateMessage, translate } from '../../../../utils/translate';
import styles from '../TaskFormPet/styles';
import { colors } from '../../../../constants/Colors';
import { taskCreate } from '../../../../api/task/taskCreate/taskCreate';
import { SCREENS } from '../../../../navigation/screenName';
import { calendarTask, geo, Rtask } from '../../../../constants/images';
import { FontAwesome5 } from '@expo/vector-icons';
import { getUserById } from '../../../../api/user/getUserById/getUserById';
import TaskCard from '../../../UI/TaskCard/TaskCard';
import { errorMessage } from '../../../../utils/showMessage';
import { Dictionary } from '../../../../locales/dictionary';
import { capitalizeFirstLetter } from '../../../../utils/text';
import { showMessage } from 'react-native-flash-message';
import { ITaskInfo } from '../TaskForm';
interface ITaskFormProps {
    taskInfo:ITaskInfo,
    navigation: any,
    userInfo:any
}


const TaskFormPublication :FC<ITaskFormProps> = ({
                                            taskInfo,
                                            navigation,
                                            userInfo
                                          }) => {

                                            
    const createTask = async () => {

      await taskCreate(taskInfo).then(resp=>{
        if(resp.data.status != 'Error'){
          if(resp.success){
            showMessage({
              message: translate("task.taskSuccess"),
              type:"success"
            });
            navigation.goBack()
          }
        } else {
          errorMessage({
            message: capitalizeFirstLetter(getTranslateMessage("errors", resp?.data?.message ?? "unknownError")),
          });
        }
      })
    }

    useEffect(()=>{
      getUserById(userInfo.user_id).then()
    },[])


  return (
      <View style={[styles.container,{width: '100%'}]}>
        <Text style={styles.titleTask}>{translate('task.newTaskPublication')}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 20, alignSelf:'center', alignItems: 'center', height: '80%'}}>
            <TaskCard 
              action={()=>{createTask()}} 
              taskInfo={taskInfo}
            />
        </View>

      </View>
    )
  }

export default TaskFormPublication;