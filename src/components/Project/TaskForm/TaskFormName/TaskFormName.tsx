import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { translate } from '../../../../utils/translate';
import Input from '../../../UI/Input/Input';
import { getServices } from '../../../../api/service/getServices/getServices';
import styles from './styles';
import { errorMessage } from '../../../../utils/showMessage';
import { SCREEN_WIDTH } from '../../../../constants/globalStyles';
import { colors } from '../../../../constants/Colors';
import {ITaskInfo} from "../TaskForm";

interface ITaskFormProps {
    taskInfo:ITaskInfo,
    onTaskInfoChange: (e:any) => void,
}

const TaskFormName2 :FC<ITaskFormProps> = ({taskInfo, onTaskInfoChange}) => {

    const [taskCategory, setTaskCategory] = useState(taskInfo.name);

    const [taskCategoryList, setTaskCategoryList] = useState<any>({});
    const [isVisibleCategoryList, setIsVisibleCategoryList] = useState<boolean>(false);

    useEffect(()=>{
        //@ts-ignore
        if(taskCategory != undefined){
           if(taskCategory.length > 3){
            getServices(taskCategory).then(resp=>{
                if(resp.success){
                    let str = resp.data.map((item:any)=>{
                        setIsVisibleCategoryList(true)
                        return item
                    })
                    setTaskCategoryList(str)
                } else {
                    errorMessage({
                        message: translate("errors.unknownError"),
                    });
                }
            })
           }
        }
    },[taskCategory])

    const handleTextChanged = useCallback(
      (newText: string) => {
        setTaskCategory(newText);
      },
      [onTaskInfoChange]
    );
  

    const renderName = ({item}:any) => {

        return (
            (item != undefined)?
                <TouchableOpacity
                    style={styles.specItem}
                    onPress={()=>{
                            //setTaskCategory( item.name )
                            setIsVisibleCategoryList(false)
                            onTaskInfoChange({"name": item.name, "service_id": item.id})
                        }
                    }
                >
                    <Text style={{color: colors.greenPH}}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
                :
                <></>
        )
    };

    return (
        <View style={{justifyContent: 'space-between', width: SCREEN_WIDTH-60}}>
            <Text style={styles.titleTask}>{translate('task.newTask')}</Text>
            <Text>{translate('task.newTaskSubtitle')}</Text>
            <Input
                valueText={taskCategory}
                onChange={(value:string)=>{handleTextChanged(value)}}
                placeHolderText={''}
            />
            {isVisibleCategoryList &&
            <FlatList
                data={taskCategoryList}
                renderItem={renderName}
                contentContainerStyle={{flexWrap: 'wrap', flexDirection: 'row'}}
            />
            }
        </View>
    )
}

export default TaskFormName2;
