import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, FC, useEffect, useState } from 'react'
import { translate } from '../../../../utils/translate';
import Input from '../../../UI/Input/Input';
import { getServices } from '../../../../api/service/getServices/getServices';
import styles from './styles';
import { errorMessage } from '../../../../utils/showMessage';
import { SCREEN_WIDTH } from '../../../../constants/globalStyles';
import { colors } from '../../../../constants/Colors';

interface ITaskFormProps {
    userInfo?:any,
    name: any;
    back: boolean,
}


const TaskFormName :FC<ITaskFormProps> = ({userInfo, name, back}) => {

    const [taskCategory, setTaskCategory] = useState<string>('');

    const [taskCategoryList, setTaskCategoryList] = useState<any>({});
    const [taskCategoryClick, setTaskCategoryClick] = useState<string>();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(()=>{
        if(taskCategory.length > 3){
            getServices(taskCategory).then(resp=>{
                if(resp.success){
                    let str = resp.data.map((item:any)=>{
                        setIsVisible(true)
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
    },[taskCategory])

    if(taskCategory != undefined){
        name(userInfo == undefined? taskCategoryClick : userInfo)
    } else {
        console.log('-----')
    }

    const renderName = ({item}:any) => {
        return (
         (item != undefined)?
             <>
                 <TouchableOpacity onPress={()=>{[
                    setTaskCategory( item.name ), 
                    setIsVisible(false),
                    setTaskCategoryClick(item)
                ]}}
                style={styles.specItem}>
                     <Text style={{color: colors.greenPH}}>
                         {item.name}
                     </Text>
                 </TouchableOpacity>
             </>
             :
             <></>
        )
       }

       console.log('OPE',userInfo)


  return (
      <View style={{justifyContent: 'space-between', width: SCREEN_WIDTH-60}}>
        <Text style={styles.titleTask}>{translate('task.newTask')}</Text>
        <Text>{translate('task.newTaskSubtitle')}</Text>
            <Input valueText={userInfo == undefined? taskCategory : userInfo } onChange={(value:string)=>{setTaskCategory(value)}} placeHolderText={''}></Input>
            {isVisible && 
                <FlatList 
                    data={taskCategoryList} 
                    renderItem={renderName}
                    contentContainerStyle={{flexWrap: 'wrap', flexDirection: 'row'}}
                />
            }
      </View>
    )
  }

export default TaskFormName;