import React, {FC, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {leftIcon} from '../../../constants/images';
import styles from './styles';
import { colors } from '../../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';



type Props = {
    taskInfo: any;
    stylesCard?: any;
};
const TaskCardChat:FC<Props> = ({taskInfo, stylesCard}) => {

    return (
        <View style={[styles.cardTask, stylesCard]}>
        <View style={styles.cardTaskHeader}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: colors.black}}>{taskInfo.name}</Text>
            <Text style={{fontSize: 12, color: colors.black}}>Заявка №{taskInfo.id}</Text>
        </View>
    
    
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <FontAwesome style={{width: 20, textAlign: 'center'}} name="rub" size={20} color={colors.greenPH} />
            <Text style={{marginLeft: 10, fontSize: 14, color: colors.black}}>{taskInfo.price_from + '-' + taskInfo.price_to} ₽</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <AntDesign style={{width: 20, textAlign: 'center'}} name="calendar" size={20} color={colors.greenPH}  />
            <Text style={{marginLeft: 10, fontSize: 14, color: colors.black}}>{taskInfo.date_type == 'exact'? taskInfo.date : taskInfo.date_interval_to + '-' + taskInfo.date_interval_from}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo style={{width: 20, textAlign: 'center'}} name="location-pin" size={20} color={colors.greenPH} />
            <Text style={{marginLeft: 10, fontSize: 14, color: colors.black}}>{taskInfo.address}</Text>
        </View>
    </View>
    );
};

export default TaskCardChat;