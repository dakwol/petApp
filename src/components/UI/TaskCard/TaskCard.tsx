import React, {FC, useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {leftIcon} from '../../../constants/images';
import styles from './styles';
//@ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from '../../../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { navigateTo } from '../../../utils/navigate';
import { SCREENS } from '../../../navigation/screenName';
import navigation from '../../../navigation';
import { translate } from '../../../utils/translate';
import { getDateFromText } from '../../../utils/date';

type Props = {
    action: () => void;
    taskInfo: any;
    myTask?:any;
};
const TaskCard:FC<Props> = ({taskInfo, action, myTask}) => {

    /*
  const dataText = useMemo( () =>
   {if(myTask){
    getDateFromText(
      myTask, taskInfo.created_at.split('T')[0].replace(/-+/g, '').slice(4), ' день назад',' дня назад', ' дней назад', 'неделю назад', 'две недели назад', 'три недели назад', 'месяц назад'
    )
}},[taskInfo])
    */

    return (
        <View style={styles.cardTask}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: colors.black}}>{taskInfo.name}</Text>

                {myTask&&
                     <TouchableOpacity onPress={()=>{}}>
                        <FontAwesome5 name="pen" size={18} color={colors.greenPH} />
                    </TouchableOpacity>
                }
              </View>
              <Text style={{fontSize: 12, color: colors.black, marginVertical: 5}}>Категория - подкатегория</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{paddingHorizontal: 6, borderRadius: 5, backgroundColor: '#D9D9D9', width:90, height: 15, justifyContent: 'center', marginVertical: 5, alignItems:'center'}}>
                    <Text style={{fontSize: 8}}>Новый заказ</Text>
                </View>
                {myTask&&
                     <View style={{flexDirection: 'row', marginLeft: 10, alignItems: 'center'}}>
                         {/* <Ionicons name="eye" size={15} color={colors.greenPH} />
                        <Text style={{marginLeft: 3,marginRight: 10}}>0</Text> */ }
                        <Text style={{fontSize: 8, color: colors.black}}>Опубликовано {taskInfo.created_at}</Text>
                     </View>
                }
              </View>

              <Text style={{fontSize: 12, color: colors.black, marginBottom: 10}}>{taskInfo.description}</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome5 name="ruble-sign" size={15} color={colors.greenPH}/>
                  <Text style={{fontSize: 14, color: colors.black, marginLeft: 7}}>{taskInfo.price_from} - {taskInfo.price_to} ₽</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome5 name="calendar-alt" size={15} color={colors.greenPH}/>
                  <Text style={{fontSize: 14, color: colors.black, marginLeft: 7}}>{taskInfo.date_type == "exact"? taskInfo.date : taskInfo.date_interval_to + ' - ' +  taskInfo.date_interval_from}</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome5 name="map-marker-alt" size={15} color={colors.greenPH}/>
                  <Text style={{fontSize: 14, color: colors.black, marginLeft: 7}}>{taskInfo.address == translate('task.addressExec') ? translate('task.addressExec') : taskInfo.address}</Text>
              </View>

              {myTask?
               <TouchableOpacity onPress={action} style={{backgroundColor: colors.greenPH, width: 170, height: 25, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 8,marginTop: 15}}

               >
                 <Text style={{textTransform: 'uppercase', color: colors.white, fontSize: 10, fontWeight: 'bold'}}>Посмотреть отклики</Text>
               </TouchableOpacity>
                :
                <TouchableOpacity onPress={action} style={{backgroundColor: colors.greenPH, width: 170, height: 25, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 8,marginTop: 15}}

                >
                  <Text style={{textTransform: 'uppercase', color: colors.white}}>опубликовать</Text>
                </TouchableOpacity>
            }


            </View>
    );
};

export default TaskCard;
