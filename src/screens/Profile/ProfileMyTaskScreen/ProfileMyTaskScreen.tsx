import React, {FC, useEffect, useState} from 'react';
import ViewScreen from "../../../components/Project/ViewScreen/ViewScreen";

import {IScreen} from "../../../types";
import {Text, TouchableOpacity, View} from "react-native";
import BackButton from "../../../components/UI/BackButton/BackButton";
import {translate} from "../../../utils/translate";
import {styles} from "../../../components/Project/Profile/styles";
import { useSelector } from 'react-redux';
import { taskSearch } from '../../../api/task/taskSearch/taskSearch';
import { FlatList } from 'react-native-gesture-handler';
import TaskCard from '../../../components/UI/TaskCard/TaskCard';
import ButtonAdd from '../../../components/Project/ButtonAdd/ButtonAdd';
import { navigateTo } from '../../../utils/navigate';
import { SCREENS } from '../../../navigation/screenName';

const ProfileMyTaskScreen:FC<IScreen> = ({navigation, route, ...props}) => {


    const userInfo = useSelector((state: any) => state?.session?.userData);
    const [taskArr, setTaskArr] = useState<any>()

    useEffect(()=>{
        taskSearch(userInfo.user_id).then(resp=>{
            setTaskArr(resp.data.tasks)
        })
    },[])

    const onNewTaskPress = () => {
        navigateTo(navigation, SCREENS.TaskFormScreen, {category_id: 3, userInfo: userInfo}); //добавить категорию
    }

    const renderSpecial = ({item}:any) => {
        console.log(item)
        return (
                <TaskCard 
                    action={()=>{
                        navigation.navigate('CommonNavigator', {screen: SCREENS.TaskChatScreen, params: {taskInfo: item}});
                    }} 
                    taskInfo={item}
                    myTask={true}
                />

        )
    }
    
    return (
        <ViewScreen>
                <View style={{justifyContent: 'space-between', alignItems:'center', flexDirection:'row'}}>
                    <BackButton
                        text={translate('back')}
                        action={() => {
                            navigation.goBack()
                        }}
                    />
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}} onPress={onNewTaskPress}>
                        <Text>Новая заявка</Text>
                        <ButtonAdd buttonSize={32} onPress={onNewTaskPress}/>
                    </TouchableOpacity>
                </View>
                <View style={[{ paddingHorizontal: 20, marginBottom: 45}]}>
                    <FlatList 
                        data={taskArr} 
                        renderItem={renderSpecial}
                    />
                </View>

        </ViewScreen>
    );
};

export default ProfileMyTaskScreen;
