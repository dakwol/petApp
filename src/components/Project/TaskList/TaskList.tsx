import { Text, View } from 'react-native'
import React, { Component, FC, useEffect, useState } from 'react'
import { translate } from '../../../utils/translate';
import { Dictionary } from '../../../locales/dictionary';
import styles from './styles';
import Input from '../../UI/Input/Input';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../api/user/getUserById/getUserById';
import { getServices } from '../../../api/service/getServices/getServices';
import DropdownSelect from '../../UI/DropdownSelect/DropdownSelect';
import { colors } from '../../../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
import { taskSearch } from '../../../api/task/taskSearch/taskSearch';
import { useIsFocused } from '@react-navigation/native';
import TaskCard from '../../UI/TaskCard/TaskCard';
import { SCREENS } from '../../../navigation/screenName';

interface ITaskFormProps {
    userData?:any,
    navigation?:any,
}


const TaskList :FC<ITaskFormProps> = ({navigation, userData}) => {
    const isFocused = useIsFocused();
    const [tasks, setTasks] = useState<any[]>([]);
    const userInfo = useSelector((state: any) => state?.session?.userData);

    const exe_user = [2,3];
    const getTasksList = async (activeTab: number) => {

        let payload: { user_id?: any, is_archive?: any, is_has_new_responses?:any } | undefined;

        if (exe_user.includes(userInfo.service_role)) {
            //payload for service user
            switch(activeTab) {
                case 1: { payload = { is_archive: "0" }; break;}
                case 2: { payload = { is_archive: "0", is_has_new_responses: "0" }; break;}
                case 3: { payload = { is_archive: "0", is_has_new_responses: "1" }; break;}
                case 4: { payload = { is_archive: "1" }; break;}
            }
        } else {
            //payload for general & vol user
            switch(activeTab) {
                case 1: { payload = { user_id: userInfo.user_id?.toString()}; break;}
                case 2: { payload = { user_id: userInfo.user_id?.toString(), is_archive: "0", is_has_new_responses: "0" }; break;}
                case 3: { payload = { user_id: userInfo.user_id?.toString(), is_archive: "0", is_has_new_responses: "1" }; break;}
                case 4: { payload = { user_id: userInfo.user_id?.toString(), is_archive: "1" }; break;}
            }
        }

        // @ts-ignore
        let output:IApiReturn<any> = [];
        try {
            output = await taskSearch(payload)
            return output.data.tasks;
        } catch (error) {
            return output;
        }

    }

    useEffect(() => {

        getTasksList(1).then(response => setTasks(response) );

    }, [isFocused]);




    const _renderItem = ({item, index}: {item: any; index: number}) => {
       //console.log(item.responses)
        return (
            <TaskCard
                action={()=>{
                    navigation.navigate('CommonNavigator', {screen: SCREENS.TaskChatScreen, params: {taskInfo: item}});

                }}
                taskInfo={item}
                myTask={true}
            />
        );
      };

  return (
      <View style={{marginBottom: 30}}>
        <FlatList
            data={tasks}
            renderItem={_renderItem}
            contentContainerStyle={{paddingBottom: 30}}
        />


      </View>
    )
  }

export default TaskList;
