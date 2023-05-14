import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component, FC, useEffect, useState } from 'react'
import { translate } from '../../../../utils/translate';
import styles from './styles';
import DropdownSelect from '../../../UI/DropdownSelect/DropdownSelect';
import { getPetsByUserId } from '../../../../api/pets/getPetsByUserId/getPetsByUserId';
import { capitalizeFirstLetter } from '../../../../utils/text';
import { Dictionary } from '../../../../locales/dictionary';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants/globalStyles';
import { errorMessage } from '../../../../utils/showMessage';
import { colors } from '../../../../constants/Colors';
import { SCREENS } from '../../../../navigation/screenName';
import {ITaskInfo} from "../TaskForm";

interface ITaskFormPetsProps {
    taskInfo:ITaskInfo,
    onTaskInfoChange: (e:any) => void,    
    skipPets: ()=>void,
    userInfo: any
}


const TaskFormPet :FC<ITaskFormPetsProps> = ({userInfo, skipPets, taskInfo, onTaskInfoChange}) => {


    const [taskPetsList, setTaskPetsList] = useState<any>([]);
    const [taskPetId, setTaskPetId] = useState<number>();
    const [isVisible, setIsVisible] = useState<boolean>(false);


    useEffect(()=>{
        getPetsByUserId({user_id: userInfo.user_id}).then(resp=>{

            console.log(resp)
            
            if(resp){

               if(resp.length != 0){
                let newPetList = [...taskPetsList];
                resp.map((item:any)=>{
                    if(item.name != null){
                        newPetList.push({
                            label: item.name,
                            value: item.id,
                            id: item.id
                        });
                    }
                })
                setIsVisible(false)
                setTaskPetsList(newPetList);
               } else {
                setIsVisible(true)
                errorMessage({
                    message:  translate("errors.Pets_not_found"),
                });
               }

            } else {
                errorMessage({
                    message: translate("errors.unknownError"),
                });
            }
        })
     },[])

     console.log('TEST',taskInfo)


  return (
      <View style={{width: SCREEN_WIDTH, paddingHorizontal: 30, justifyContent: 'space-between'}}>
        <Text style={styles.titleTask}>{translate('task.newTaskPet')}</Text>
        <Text>{translate('task.newTaskPetSubtitle')}</Text>

        <View style={{height: '70%', justifyContent: 'space-between'}}>
            <View>
            <DropdownSelect
                err={isVisible}
                defaultValue={taskInfo.pet_id != null? taskInfo.pet_id : undefined}
                data={taskPetsList}
                onSelect={(item:any) => {onTaskInfoChange({"pet_id": item.id})}}
                placeholder={capitalizeFirstLetter(translate(Dictionary.pet.choosePet))}
            />
            <TouchableOpacity style={{alignSelf: 'flex-end', backgroundColor: colors.greenPH, marginTop: 20, padding: 5, borderRadius: 5}} onPress={()=>{}}>
                <Text style={{color: colors.white}}>{translate('task.newTaskPetButton')}</Text>
            </TouchableOpacity>
            </View>
           
        </View>
        <TouchableOpacity style={{alignSelf: 'center'}} onPress={()=>{skipPets()}}>
                <Text style={{color: colors.greenPH, fontWeight: 'bold', fontSize: 18}}>{translate('task.newTaskPetSkip')}</Text>
        </TouchableOpacity>
      </View>
    )
  }

export default TaskFormPet;